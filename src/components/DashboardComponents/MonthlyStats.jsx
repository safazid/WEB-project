import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { auth } from "../../firebase";

function getMonthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export default function MonthlyStats() {
  const [selectedMonth, setSelectedMonth] = useState(getMonthKey(new Date()));
  const [stats, setStats] = useState({ calories: 0, workouts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthly = async () => {
      const user = auth.currentUser;
      if (!user) return;

      setLoading(true);

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      const data = snap.data() || {};

      const monthlyCalories = data.monthlyCalories || {};
      const monthlyWorkouts = data.monthlyWorkouts || {};

      setStats({
        calories: monthlyCalories[selectedMonth] || 0,
        workouts: monthlyWorkouts[selectedMonth] || 0,
      });

      setLoading(false);
    };

    fetchMonthly();
  }, [selectedMonth]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Monthly Stats</h2>

      {/* Month Selector */}
      <input
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="border rounded-lg px-3 py-2"
      />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow flex justify-between">
          <div>
            <div className="text-sm text-gray-500">Workouts</div>
            <div className="text-2xl font-bold">{stats.workouts}</div>
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-500">Calories</div>
            <div className="text-2xl font-bold text-emerald-600">
              🔥 {stats.calories} kcal
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
