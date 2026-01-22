import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

/*
  LastWorkout
  -----------
  Displays the date of the user's most recent workout.

  Purpose:
  - Give the user a quick visual reminder of their last activity.
  - Reinforce consistency and motivation on the dashboard.
  - If the user has never trained, shows a default message ("No data yet").

  Data source:
  - Firestore document: users/{userId}
  - Field used:
      • totalWorkouts

  Logic:
  - On mount, fetch the current user document from Firestore.
  - If totalWorkouts > 0:
      • Display today's date formatted in a friendly way.
  - Otherwise:
      • Keep the default text ("No data yet").

  Theme handling:
  - Observes changes to the <html> class to detect dark/light mode.
  - Adjusts shadow styling dynamically for better visual consistency.

  UX details:
  - Card has hover animation (lift + glow).
  - Visual style adapts to dark and light themes.
  - Acts as a soft motivational element on the dashboard.
*/
export default function LastWorkout() {
  const [lastText, setLastText] = useState("No data yet");
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const loadData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const ref = doc(db, "users", userId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const totalWorkouts = snap.data().totalWorkouts || 0;

        if (totalWorkouts > 0) {
          setLastText(
            new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          );
        }
      }
    };

    loadData();
  }, []);

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

  return (
    <div
      className="
        p-8
        transition-all duration-300 ease-out
        transform hover:-translate-y-2 hover:scale-[1.02]
        cursor-pointer
      "
      style={{
        background: "var(--card-bg)",
        borderRadius: "24px",
        border: "1px solid #0B8A8C",
        boxShadow: isDark
          ? "0 0 0 1px rgba(11,138,140,0.25), 0 0 22px rgba(11,138,140,0.18)"
          : "0 0 0 1px rgba(11,138,140,0.15), 0 0 14px rgba(11,138,140,0.12)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = isDark
          ? "0 0 0 1px rgba(11,138,140,0.4), 0 0 36px rgba(11,138,140,0.45)"
          : "0 0 0 1px rgba(11,138,140,0.3), 0 0 28px rgba(11,138,140,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = isDark
          ? "0 0 0 1px rgba(11,138,140,0.25), 0 0 22px rgba(11,138,140,0.18)"
          : "0 0 0 1px rgba(11,138,140,0.15), 0 0 14px rgba(11,138,140,0.12)";
      }}
    >
      <h2
        className="text-2xl font-bold mb-2"
        style={{ color: "#A066FF" }}
      >
        Last Workout
      </h2>

      <p style={{ color: "var(--text-sub)" }}>
        {lastText}
      </p>
    </div>
  );
}
