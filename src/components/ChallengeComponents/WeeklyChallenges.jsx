import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db, auth } from "../../firebase";
import ChallengeCard from "./ChallengeCard";
import ChallengeCompletedAlert from "./ChallengeCompletedAlert";
import { getISOWeekKey } from "../../utils/dateHelpers";

/* ===== Weekly challenge definitions ===== */
const weeklyChallenges = [
  {
    id: "weekly_5_workouts",
    icon: "🏆",
    title: "Complete 5 Workouts",
    desc: "Train on 5 different days this week",
    target: 5,
    points: 200,
    type: "workouts",
  },
  {
    id: "weekly_2000_cal",
    icon: "🔥",
    title: "Burn 2000 Calories",
    desc: "Burn 2000 calories this week",
    target: 2000,
    points: 250,
    type: "calories",
  },
];
/*
  WeeklyChallenges
  ----------------
  Displays and manages the user's weekly challenges.

  Features:
  - Loads weekly workout and calorie stats from Firestore.
  - Tracks which weekly challenges were already collected.
  - Shows a progress bar for each challenge.
  - Automatically triggers an alert when a challenge target is reached
    but not yet collected.
  - Allows the user to collect points once the target is met.
  - Listens to the global "stats-updated" event to stay in sync
    with workouts and challenges completed elsewhere in the app.
*/
export default function WeeklyChallenges() {
  const [weeklyWorkouts, setWeeklyWorkouts] = useState({});
  const [weeklyCalories, setWeeklyCalories] = useState({});
  const [completed, setCompleted] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  // Unique key for the current ISO week (e.g. "2026-W3")
  const weekKey = getISOWeekKey();

   /* Load weekly stats from Firestore */
  useEffect(() => {
    const load = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const snap = await getDoc(doc(db, "users", user.uid));
      const data = snap.data() || {};

      setWeeklyWorkouts(data.weeklyWorkouts || {});
      setWeeklyCalories(data.weeklyCalories || {});
      setCompleted(data.completedWeekly || {});
      setLoading(false);
    };

    load();
    // Keep data fresh when other parts of the app update stats
    window.addEventListener("stats-updated", load);
    return () =>
      window.removeEventListener("stats-updated", load);
  }, [weekKey]);

  /* 🔔 Auto alert when a weekly challenge reaches its target */
  useEffect(() => {
    weeklyChallenges.forEach((c) => {
      const value =
        c.type === "workouts"
          ? weeklyWorkouts[weekKey] || 0
          : weeklyCalories[weekKey] || 0;

      const key = `${c.id}_${weekKey}`;
      const reachedTarget = value >= c.target;
      const isCollected = completed[key] === true;

      if (reachedTarget && !isCollected) {
        setShowAlert(true);
      }
    });
  }, [weeklyWorkouts, weeklyCalories, completed, weekKey]);

  if (loading) {
    return <div className="p-6 text-center">Loading weekly challenges…</div>;
  }

  return (
    <div className="space-y-6">
      <ChallengeCompletedAlert
        open={showAlert}
        onClose={() => setShowAlert(false)}
      />

      {weeklyChallenges.map((c) => {
        const value =
          c.type === "workouts"
            ? weeklyWorkouts[weekKey] || 0
            : weeklyCalories[weekKey] || 0;

        const key = `${c.id}_${weekKey}`;
        const isCollected = completed[key] === true;

        return (
          <ChallengeCard
            key={c.id}
            {...c}
            value={value}
            progress={Math.min((value / c.target) * 100, 100)}
            completed={isCollected}
            canCollect={value >= c.target && !isCollected}
            onCollect={async () => {
              if (!auth.currentUser || isCollected) return;

              await updateDoc(
                doc(db, "users", auth.currentUser.uid),
                {
                  totalPoints: increment(c.points),
                  [`completedWeekly.${key}`]: true,
                }
              );

              setCompleted((prev) => ({ ...prev, [key]: true }));
              window.dispatchEvent(new Event("stats-updated"));
            }}
          />
        );
      })}
    </div>
  );
}