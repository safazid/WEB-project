import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";

/*
  WeeklyStats
  -----------
  A dashboard component that displays a historical summary of the user's
  weekly workout and calorie data.

  Data Source:
  - Fetches user data from Firestore using the authenticated user ID.
  - Reads:
      - weeklyWorkouts: { [weekKey]: number }
      - weeklyCalories: { [weekKey]: number }

  State:
  - weeks: An array of formatted weekly objects:
      {
        week: "Week X",
        workouts: number,
        calories: number
      }
  - loading: Controls the loading state.
  - isDark: Tracks whether the UI is in dark mode.

  Processing Logic:
  - Iterates over all weekly workout entries.
  - Skips weeks with 0 workouts.
  - Extracts the week number from keys like "2026-W3".
  - Builds a clean array of week objects.
  - Sorts weeks in ascending order (Week 1 → Week N).

  Behavior:
  - Shows a loading message while fetching data.
  - Shows a friendly empty state if no workouts exist.
  - Observes theme changes using a MutationObserver to adapt styling.

  UI Structure:
  - Card container titled "Weekly Stats".
  - A vertical list of week rows.
  - Each row displays:
      - Left: Week label and number of workouts.
      - Right: Total calories burned in that week.

  Visual Design:
  - Rounded card with soft glow and hover animation.
  - Adaptive background based on dark/light mode.
  - Clear visual separation between weekly entries.
  - Emoji cues (🏋️, 🔥) for quick readability.

  UX Benefits:
  - Helps users reflect on long-term consistency.
  - Makes weekly patterns visible at a glance.
  - Encourages sustained engagement over time.
  - Complements WeeklyProgress and WeeklyChart components.

  This component forms the historical backbone of the dashboard,
  turning raw Firestore data into an easy-to-read progress timeline.
*/
export default function WeeklyStats() {
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchWeekly = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      const snap = await getDoc(doc(db, "users", user.uid));
      const data = snap.data() || {};

      const weeklyCalories = data.weeklyCalories || {};
      const weeklyWorkouts = data.weeklyWorkouts || {};

      const result = [];

      Object.keys(weeklyWorkouts).forEach((weekKey) => {
        const workouts = weeklyWorkouts[weekKey] || 0;
        const calories = weeklyCalories[weekKey] || 0;
        if (workouts === 0) return;

        const weekNumber = weekKey.split("-W")[1];

        result.push({
          week: `Week ${weekNumber}`,
          workouts,
          calories,
        });
      });

      result.sort((a, b) => {
        const wa = Number(a.week.replace("Week ", ""));
        const wb = Number(b.week.replace("Week ", ""));
        return wa - wb;
      });

      setWeeks(result);
      setLoading(false);
    };

    fetchWeekly();
  }, []);

  if (loading) {
    return <div className="p-6">Loading weekly stats...</div>;
  }

  if (weeks.length === 0) {
    return <div className="p-6">No workouts yet 💪</div>;
  }

  return (
    <div
      className="p-8 mb-10 transition-all duration-300 ease-out transform hover:-translate-y-2 hover:scale-[1.02]"
      style={{
        background: "var(--card-bg)",
        borderRadius: "24px",
        border: "1px solid #0B8A8C",
        boxShadow: isDark
          ? "0 0 0 1px rgba(11,138,140,0.25), 0 0 22px rgba(11,138,140,0.18)"
          : "0 0 0 1px rgba(11,138,140,0.15), 0 0 14px rgba(11,138,140,0.12)",
      }}
    >
      <h2 className="text-2xl font-bold mb-6" style={{ color: "#A066FF" }}>
        Weekly Stats
      </h2>

      <div className="space-y-4">
        {weeks.map((w, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-5 rounded-2xl"
            style={{
              background: isDark
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.04)",
            }}
          >
            {/* LEFT – Week + workouts */}
            <div>
              <div className="font-semibold text-lg">
                {w.week}
              </div>
              <div
                className="text-sm mt-1"
                style={{ color: "var(--text-sub)" }}
              >
                🏋️ {w.workouts} workout{w.workouts !== 1 && "s"}
              </div>
            </div>

            {/* RIGHT – Calories */}
            <div className="text-right">
              <div
                className="text-sm"
                style={{ color: "var(--text-sub)" }}
              >
                Calories
              </div>
              <div
                className="text-2xl font-extrabold"
                style={{ color: "var(--primary)" }}
              >
                🔥 {w.calories}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}