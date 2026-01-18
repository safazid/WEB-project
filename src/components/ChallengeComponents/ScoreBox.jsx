import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function ScoreBox() {
  const [points, setPoints] = useState(0);

 useEffect(() => {
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

  // 👂 نسمع للتحديث
  window.addEventListener("stats-updated", loadPoints);
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
