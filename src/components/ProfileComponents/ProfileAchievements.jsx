import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

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

      const PRO_LEVEL_POINTS = 2000; // الهدف
      const percent = Math.min(
        Math.round((points / PRO_LEVEL_POINTS) * 100),
        100
      );

      setProgress(percent);
    };

    load();

    // نسمع لأي تحديث في الإحصائيات
    window.addEventListener("stats-updated", load);
    return () => window.removeEventListener("stats-updated", load);
  }, []);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-center mb-4">Achievements</h3>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-teal-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-center mt-2 text-gray-600">
        Pro Level – {progress}% completed
      </p>
    </div>
  );
}
