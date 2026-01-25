import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import StatsCards from "./StatsCards";
import WeeklyProgress from "./WeeklyProgress";
import LastWorkout from "./LastWorkout";
import Footer from "../layouts/Footer";
import ChatBubble from "../layouts/ChatBubble";
import WeeklyStats from "../DashboardComponents/WeeklyStats";
import MonthlyStats from "../DashboardComponents/MonthlyStats";
import WeeklyChart from "../DashboardComponents/WeeklyChart";
import MonthlyPieChart from "../DashboardComponents/MonthlyPieChart";
import { calculateWeeklyStreak } from "../../utils/streakUtils";



// ===== Helper: generate a year-week key (e.g., 2026-W3) =====
/*function getWeekKey(d) {
  const firstJan = new Date(d.getFullYear(), 0, 1);
  const days = Math.floor((d - firstJan) / 86400000);
  const week = Math.ceil((days + firstJan.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${week}`;
}*/
function getISOWeekKey(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${weekNo}`;
}


/*
  DashboardPage
  -------------
  This page represents the user's main fitness dashboard.

  Purpose:
  - Display all important progress metrics in one place.
  - Help the user understand their performance over time.
  - Provide visual feedback (charts & stats) for motivation.
  - Allow exporting a full progress report as a PDF.

  Features:
  - Loads user stats from Firestore.
  - Calculates weekly and monthly summaries.
  - Displays:
      • Total workouts, calories, and points
      • Weekly goal progress
      • Weekly and monthly charts
      • Last workout info
  - Generates a detailed PDF report including:
      • Monthly summary
      • Weekly breakdown
      • Last 7 days activity
      • Engagement metrics

  Data Sources:
  - Firestore document: users/{uid}
  - Fields used:
      • totalWorkouts
      • totalCalories
      • totalPoints
      • weeklyWorkouts
      • weeklyCalories
      • monthlyWorkouts
      • monthlyCalories
      • dailyStats
*/
export default function DashboardPage() {
    
  // High-level summary stats
  const [stats, setStats] = useState({
  totalWorkouts: 0,
  totalCalories: 0,
  totalPoints: 0,
  completedWeekly: 0,
  currentStreak: 0,     
});

  // Chart data
const [weeklyData, setWeeklyData] = useState([]);
const [monthlyData, setMonthlyData] = useState([]);

  /*
    Load user data from Firestore:
    - Build summary stats
    - Prepare weekly chart data
    - Prepare monthly chart data
  */
  useEffect(() => {
  const loadStats = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) return;

    const data = snap.data();
    const now = new Date();
    //const currentWeekKey = getWeekKey(now);
    const currentWeekKey = getISOWeekKey(now);


   // Basic stats for top cards

console.log("Daily Stats from Firestore:", data.dailyStats);

setStats({
  totalWorkouts: data.totalWorkouts || 0,
  totalCalories: data.totalCalories || 0,
  totalPoints: data.totalPoints || 0,
  completedWeekly: data.weeklyWorkouts?.[currentWeekKey] || 0,
  currentStreak: calculateWeeklyStreak(data.dailyStats || {}),
});


    // Prepare weekly chart data
    const weeklyCalories = data.weeklyCalories || {};
    const weeklyWorkouts = data.weeklyWorkouts || {};
    const result = [];

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

    result.sort((a, b) => {
      const wa = Number(a.week.replace("Week ", ""));
      const wb = Number(b.week.replace("Week ", ""));
      return wa - wb;
    });

    setWeeklyData(result);
    
    // Prepare monthly chart data
    const monthlyWorkouts = data.monthlyWorkouts || {};
    const monthsArr = Object.keys(monthlyWorkouts).map((key) => ({
  month: key,
  workouts: monthlyWorkouts[key],
}));

setMonthlyData(monthsArr);

  };

  loadStats();
  
}, []);

/*
  handleExportReportPDF
  ---------------------
  Generates a full workout progress report as a PDF file.

  The report includes:
  1. Monthly summary:
     - Total workouts per month
     - Total calories per month

  2. Weekly breakdown (current year):
     - Workouts per week
     - Calories per week

  3. Daily activity (last 7 days):
     - Date
     - Exercises completed
     - Calories burned

  4. Engagement metrics:
     - Number of active weeks
     - Average workouts per week
     - Average calories per week
     - Most active week

  Data source:
  - Firestore document: users/{uid}
  - Fields used:
      • monthlyWorkouts
      • monthlyCalories
      • weeklyWorkouts
      • weeklyCalories
      • dailyStats

  Flow:
  - Create a new jsPDF instance.
  - Add titles and table headers.
  - Fetch user data from Firestore.
  - Build tables dynamically from stored stats.
  - Append engagement analytics.
  - Export and download "Workout_Report.pdf".

  This feature allows the user to keep a permanent,
  shareable record of their fitness progress.
*/
  async function handleExportReportPDF() {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF();

  // ===== Title =====
  pdf.setFontSize(18);
  pdf.text("Workout Progress Report", 14, 20);

  pdf.setFontSize(11);
  pdf.text("Monthly Summary", 14, 30);

  // ===== Table Header =====
  let startY = 40;

  pdf.setFontSize(10);
  pdf.text("Month", 14, startY);
  pdf.text("Total Workouts", 60, startY);
  pdf.text("Total Calories", 120, startY);

  startY += 6;
  pdf.line(14, startY, 190, startY); // underline

  // ===== Get data from Firestore (same logic as MonthlyStats) =====
  const user = auth.currentUser;
  if (!user) {
    alert("User not logged in");
    return;
  }

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  const data = snap.data() || {};

  const monthlyWorkouts = data.monthlyWorkouts || {};
  const monthlyCalories = data.monthlyCalories || {};

  let y = startY + 6;

  Object.keys(monthlyWorkouts).forEach((month) => {
    const workouts = monthlyWorkouts[month] || 0;
    const calories = monthlyCalories[month] || 0;

    pdf.text(month, 14, y);
    pdf.text(String(workouts), 70, y);
    pdf.text(`${calories} kcal`, 120, y);

    y += 8;
  });

    // ===== Weekly Details for Current Month =====
  const now = new Date();
  const currentMonthKey = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;

  const weeklyWorkouts = data.weeklyWorkouts || {};
  const weeklyCalories = data.weeklyCalories || {};

  y += 10;
  pdf.setFontSize(11);
  pdf.text("Weekly Breakdown (Current Month)", 14, y);

  y += 10;
  pdf.setFontSize(10);

  pdf.text("Week", 14, y);
  pdf.text("Workouts", 60, y);
  pdf.text("Calories Burned", 120, y);

  y += 6;
  pdf.line(14, y, 190, y);

  y += 6;

  Object.keys(weeklyWorkouts).forEach((weekKey) => {

    if (!weekKey.startsWith(currentMonthKey.slice(0, 4))) return;

    const workouts = weeklyWorkouts[weekKey];
    const calories = weeklyCalories[weekKey] || 0;

    pdf.text(weekKey, 14, y);
    pdf.text(String(workouts), 70, y);
    pdf.text(`${calories} kcal`, 120, y);

    y += 8;
  });


    // ===== Last 7 Days (Daily Table) =====
  y += 12;
  pdf.setFontSize(11);
  pdf.text("Last 7 Days (Daily)", 14, y);

  const dailyStats = data.dailyStats || {};

  y += 10;
  pdf.setFontSize(10);

  pdf.text("Date", 14, y);
  pdf.text("Exercises", 70, y);
  pdf.text("Calories", 120, y);

  y += 6;
  pdf.line(14, y, 190, y);
  y += 6;

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);

    const day = dailyStats[key] || {};
    const exercises = day.exercises || 0;
    const calories = day.calories || 0;

    pdf.text(key, 14, y);
    pdf.text(String(exercises), 80, y);
    pdf.text(`${calories} kcal`, 120, y);

    y += 8;

    if (y > 270) {
      pdf.addPage();
      y = 20;
    }
  }

    // ===== Engagement Metrics =====
  y += 10;
  pdf.setFontSize(11);
  pdf.text("Engagement Metrics", 14, y);

  const weeks = Object.keys(weeklyWorkouts);
  const activeWeeks = weeks.length;

  let totalWorkoutsAll = 0;
  let totalCaloriesAll = 0;
  let mostActiveWeek = "-";
  let maxWorkouts = 0;

  weeks.forEach((week) => {
    const w = weeklyWorkouts[week] || 0;
    const c = weeklyCalories[week] || 0;

    totalWorkoutsAll += w;
    totalCaloriesAll += c;

    if (w > maxWorkouts) {
      maxWorkouts = w;
      mostActiveWeek = week;
    }
  });

  const avgWorkouts =
    activeWeeks > 0 ? (totalWorkoutsAll / activeWeeks).toFixed(1) : 0;

  const avgCalories =
    activeWeeks > 0 ? Math.round(totalCaloriesAll / activeWeeks) : 0;

  y += 10;
  pdf.setFontSize(10);

  pdf.text("Active Weeks:", 14, y);
  pdf.text(String(activeWeeks), 70, y);

  y += 8;
  pdf.text("Avg Workouts / Week:", 14, y);
  pdf.text(String(avgWorkouts), 70, y);

  y += 8;
  pdf.text("Avg Calories / Week:", 14, y);
  pdf.text(`${avgCalories} kcal`, 70, y);

  y += 8;
  pdf.text("Most Active Week:", 14, y);
  pdf.text(mostActiveWeek, 70, y);


  // ===== Save PDF =====
  pdf.save("Workout_Report.pdf");
}



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


      <div className="mb-8">
        <button
          onClick={handleExportReportPDF}
          className="px-6 py-3 rounded-xl font-semibold transition"
          style={{
            background: "var(--secondary)",
            color: "white",
          }}
        >
            Export Report (PDF)
        </button>

      </div>

        <div id="dashboard-summary" className="pdf-export">
        {/* Top cards */}
        <StatsCards stats={stats} />

        {/* Weekly goal */}
        <WeeklyProgress completedWeekly={stats.completedWeekly} />

        {/* Weekly stats */}
        <WeeklyStats weeks={weeklyData} />


       <WeeklyChart weeks={weeklyData} />

       <MonthlyPieChart months={monthlyData} />


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