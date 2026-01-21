import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MonthlyPieChart({ months }) {
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
    labels: months.map(m => m.month),
    datasets: [
      {
        data: months.map(m => m.workouts),
        backgroundColor: [
          "#A066FF",
          "#6EE7B7",
          "#60A5FA",
          "#FBBF24",
          "#F87171",
          "#34D399",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: isLight ? "#1A1A1A" : "#FFFFFF",
        },
      },
    },
  };

  return (
    <div
      className="p-8 mb-10"
      style={{
        background: "var(--card-bg)",
        borderRadius: "24px",
        border: "1px solid #0B8A8C",
      }}
    >
      <h2 className="text-2xl font-bold mb-4" style={{ color: "#A066FF" }}>
        Monthly Workouts Distribution
      </h2>
<p className="text-sm mb-4" style={{ color: "var(--text-sub)" }}>
  Overview of your workout distribution by month
</p>

      <div style={{ maxWidth: 320, margin: "0 auto" }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
