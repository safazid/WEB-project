import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";

function getMonthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export default function MonthlyStats() {
  const [selectedMonth, setSelectedMonth] = useState(getMonthKey(new Date()));
  const [stats, setStats] = useState({ calories: 0, workouts: 0 });
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // مراقبة تغيير الثيم
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
    const fetchMonthly = async () => {
      const user = auth.currentUser;
      if (!user) return;

      setLoading(true);

      const snap = await getDoc(doc(db, "users", user.uid));
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
      <h2 className="text-2xl font-bold mb-4" style={{ color: "#A066FF" }}>
        Monthly Stats
      </h2>

      {/* Month Selector */}
      <input
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="mb-6 px-4 py-2 rounded-xl outline-none"
        style={{
          background: isDark
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.06)",
          color: "var(--text-main)",
        }}
      />

      {loading ? (
        <div style={{ color: "var(--text-sub)" }}>Loading...</div>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <div
              className="text-sm mb-1"
              style={{ color: "var(--text-sub)" }}
            >
              Workouts
            </div>
            <div className="text-3xl font-extrabold">
              {stats.workouts}
            </div>
          </div>

          <div className="text-right">
            <div
              className="text-sm mb-1"
              style={{ color: "var(--text-sub)" }}
            >
              Calories
            </div>
            <div
              className="text-2xl font-extrabold"
              style={{ color: "var(--primary)" }}
            >
              🔥 {stats.calories}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}