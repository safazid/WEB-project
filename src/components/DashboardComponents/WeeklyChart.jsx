import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function WeeklyChart({ weeks = [] }) {
  if (!weeks.length) return null;

  // ✅ Track light/dark mode dynamically
  const [isLight, setIsLight] = useState(
    document.documentElement.classList.contains("light-mode")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains("light-mode"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

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
        backgroundColor: isLight
          ? "rgba(255,255,255,0.95)"
          : "rgba(20,20,30,0.95)",
        titleColor: isLight ? "#111" : "#fff",
        bodyColor: isLight ? "#111" : "#fff",
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
          color: isLight ? "#111111" : "#FFFFFF",
          font: { weight: "600" },
        },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: isLight ? "#111111" : "#FFFFFF",
        },
        grid: {
          color: isLight
            ? "rgba(0,0,0,0.08)"
            : "rgba(255,255,255,0.15)",
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
      <h2
        className="text-2xl font-bold mb-6"
        style={{
          color: isLight ? "#6B21A8" : "#C46CFF",
        }}
      >
        Weekly Workout Chart
      </h2>

      <div style={{ width: "100%", height: 260 }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
