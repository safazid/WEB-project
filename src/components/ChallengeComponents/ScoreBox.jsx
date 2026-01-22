import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

/*
  ScoreBox
  --------
  Displays the user's total score (points) from Firestore.

  Behavior:
  - On mount, it loads the current user's `totalPoints` from Firestore.
  - Listens for a global "stats-updated" event.
    Whenever this event is fired, the component reloads the points.
  - Safely handles missing or invalid values by falling back to 0.

  Purpose:
  - Provide a live, always-updated view of the user's score.
  - Used in the Challenges page and other gamified areas.
*/
export default function ScoreBox() {
  const [points, setPoints] = useState(0);

 useEffect(() => {
  // Load points from Firestore
  const loadPoints = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const ref = doc(db, "users", userId);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const value = Number(snap.data().totalPoints);
      setPoints(Number.isFinite(value) ? value : 0);
    }
  };

  loadPoints();

  // Listen for global updates (e.g., after workouts or challenges)
  window.addEventListener("stats-updated", loadPoints);
  
  // Cleanup on unmount
  return () =>
    window.removeEventListener("stats-updated", loadPoints);
}, []);


  return (
    <div
      className="
        w-full mb-8
        p-5 rounded-xl
        bg-[var(--card-bg)]
        border border-[var(--primary-soft)]
        flex items-center justify-between
      "
    >
      <span className="text-lg font-semibold">
        ⭐ Your Score
      </span>

      <span className="text-2xl font-bold text-[var(--primary)]">
        {points}
      </span>
    </div>
  );
}
