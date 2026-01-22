import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
/*
  WeeklyChart
  -----------
  A visual analytics component that renders a bar chart representing
  the user's weekly workout activity.

  Props:
  - weeks (array): An array of weekly summary objects.
    Each object is expected to contain:
      • week (string)    → e.g., "Week 3"
      • workouts (number) → Number of workouts in that week
      • calories (number) → (Optional) Calories burned in that week

  Purpose:
  - Provide a clear visual overview of workout consistency over time.
  - Help users identify trends in their weekly training habits.
  - Reinforce motivation by showing progress week by week.

  Chart Behavior:
  - Uses Chart.js (Bar chart) via react-chartjs-2.
  - Automatically skips rendering when no weekly data exists.
  - Displays each week as a separate bar.
  - Bar height represents the number of workouts for that week.

  Visual Design:
  - Uses a vertical gradient fill for bars (purple tones).
  - Rounded bar corners for a modern look.
  - Smooth animation on load for better user experience.
  - Tooltips with dark theme and soft rounded corners.
  - Minimal grid for a clean, dashboard-style appearance.

  UX Benefits:
  - Makes progress tangible and easy to understand.
  - Encourages consistency by visually rewarding active weeks.
  - Helps users detect drops or peaks in activity.
  - Complements numeric stats with an intuitive visual layer.

  Performance Notes:
  - The chart is fully responsive.
  - Rendering is skipped if `weeks` is empty to avoid empty UI blocks.
  - Gradient is computed dynamically based on the chart area.

  This component is a core part of the Dashboard analytics layer
  and works in conjunction with StatsCards, WeeklyStats, and MonthlyStats
  to provide a complete progress overview.
*/
export default function WeeklyChart({ weeks = [] }) {
  if (!weeks.length) return null;

  const data = {
    labels: weeks.map((w) => w.week),
    datasets: [
      {
        label: "Workouts",
        data: weeks.map((w) => w.workouts),
        backgroundColor: (ctx) => {
          const { chart } = ctx;
          const { ctx: c, chartArea } = chart;
          if (!chartArea) return "#8E3CA9";

          const gradient = c.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "#C46CFF");
          gradient.addColorStop(1, "#8E3CA9");
          return gradient;
        },
        borderRadius: 14,
        barThickness: 42,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(20,20,30,0.95)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderWidth: 0,
        cornerRadius: 12,
        padding: 12,
      },
    },
    animation: {
      duration: 900,
      easing: "easeOutQuart",
    },
    scales: {
      x: {
        ticks: {
          color: "var(--text-sub)",
          font: { weight: "500" },
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "var(--text-sub)",
        },
        grid: {
          color: "rgba(255,255,255,0.08)",
        },
      },
    },
  };

  return (
    <div
      className="p-8 mb-10 transition-all duration-300 ease-out transform hover:-translate-y-2 hover:scale-[1.02]"
      style={{
        background: "var(--card-bg)",
        borderRadius: "24px",
        border: "1px solid #0B8A8C",
      }}
    >
      <h2 className="text-2xl font-bold mb-6" style={{ color: "#A066FF" }}>
        Weekly Workout Chart
      </h2>

      <div style={{ width: "100%", height: 260 }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}