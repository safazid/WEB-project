import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

// This component shows the user's real achievement progress.
// It loads the user's totalPoints from Firestore,
// converts them into a percentage toward "Pro Level" (2000 points),
// and updates automatically when stats change.
// The bar is fully dynamic and theme-aware (dark/light mode).
export default function ProfileAchievements() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const load = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const snap = await getDoc(doc(db, "users", userId));
      if (!snap.exists()) return;

      const data = snap.data() || {};
      const points = Number(data.totalPoints || 0);

      const PRO_LEVEL_POINTS = 2000; 
      const percent = Math.min(
        Math.round((points / PRO_LEVEL_POINTS) * 100),
        100
      );

      setProgress(percent);
    };

    load();

    window.addEventListener("stats-updated", load);
    return () => window.removeEventListener("stats-updated", load);
  }, []);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-center mb-4">Achievements</h3>

      <div className="w-full rounded-full h-3 overflow-hidden" style={{ background: "var(--card-bg)" }}>
  <div
    className="h-3 rounded-full transition-all duration-500"
    style={{
      width: `${progress}%`,
      background: "var(--primary)",
    }}
  />
</div>

<p className="text-center mt-2" style={{ color: "var(--text-sub)" }}>

        Pro Level – {progress}% completed
      </p>
    </div>
  );
}