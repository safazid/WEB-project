import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { auth } from "../../firebase";

export default function WeeklyStats() {
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeekly = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      const data = snap.data() || {};

      const weeklyCalories = data.weeklyCalories || {};
      const weeklyWorkouts = data.weeklyWorkouts || {};

      const result = [];

      // نعرض أي أسبوع فيه تمارين (UX-friendly)
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

      // ترتيب الأسابيع تصاعدي
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
    return <div className="p-6">No workouts this month yet 💪</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Weekly Stats (This Month)</h2>

      {weeks.map((w, i) => (
        <div
          key={i}
          className="flex justify-between items-center bg-white p-4 rounded-xl shadow"
        >
          <div>
            <div className="font-semibold">{w.week}</div>
            <div className="text-sm text-gray-500">
              {w.workouts} workout(s)
            </div>
          </div>

          <div className="text-emerald-600 font-bold">
            🔥 {w.calories} kcal
          </div>
        </div>
      ))}
    </div>
  );
}
