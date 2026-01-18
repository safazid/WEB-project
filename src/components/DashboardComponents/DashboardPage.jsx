// src/components/DashboardComponents/DashboardPage.jsx
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";

import { getISOWeekKey } from "../../utils/dateHelpers";

import StatsCards from "./StatsCards";
import WeeklyProgress from "./WeeklyProgress";
import LastWorkout from "./LastWorkout";
import Footer from "../layouts/Footer";
import ChatBubble from "../layouts/ChatBubble";
import WeeklyStats from "../DashboardComponents/WeeklyStats";
import MonthlyStats from "../DashboardComponents/MonthlyStats";

function calculateStreak(dailyStats = {}) {
  const dates = Object.keys(dailyStats)
    .filter(d => dailyStats[d]?.exercises > 0)
    .sort()
    .reverse(); // من الأحدث للأقدم

  let streak = 0;
  let current = new Date(dates[0]);

  for (let d of dates) {
    const date = new Date(d);

    if (
      current.toISOString().slice(0, 10) ===
      date.toISOString().slice(0, 10)
    ) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}


/* =================== */

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalCalories: 0,
    totalPoints: 0,
    completedWeekly: 0,
    currentStreak: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (!snap.exists()) return;

      const data = snap.data() || {};
      const now = new Date();

      // ✅ ISO week key (نفس اللي بنحفظ فيه بالـ AITrainer)
      const currentWeekKey = getISOWeekKey(now);

      const streak = calculateStreak(data.dailyStats || {});

      setStats({
        totalWorkouts: data.totalWorkouts || 0,
        totalCalories: data.totalCalories || 0,
        totalPoints: data.totalPoints || 0,

        // ✅ رقم الأسبوع الحالي
        completedWeekly: data.weeklyWorkouts?.[currentWeekKey] || 0,

        // ✅ الستريك من dailyStats
        currentStreak: streak,
      });
    };

    loadStats();
  }, []);

  return (
    <>
      <section
        className="max-w-7xl mx-auto px-6 py-32 fade-in"
        style={{
          background: "var(--bg)",
          color: "var(--text-main)",
        }}
      >
        <h1
          className="text-4xl font-extrabold mb-2"
          style={{ color: "var(--secondary)" }}
        >
          Your Progress Dashboard
        </h1>

        <p className="mb-12" style={{ color: "var(--text-sub)" }}>
          Track your daily stats, progress, and weekly achievements
        </p>

        <div id="dashboard-summary" className="pdf-export">
          {/* ✅ Top cards */}
          <StatsCards stats={stats} />

          {/* ✅ Weekly Progress */}
          <WeeklyProgress completedWeekly={stats.completedWeekly} />

          {/* Weekly stats */}
          <WeeklyStats />

          {/* Monthly stats */}
          <MonthlyStats />

          {/* Last workout */}
          <LastWorkout />
        </div>

        <ChatBubble />
      </section>

      <Footer />
    </>
  );
}