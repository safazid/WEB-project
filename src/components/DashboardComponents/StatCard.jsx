import { useEffect, useState } from "react";

/*
  StatCard
  --------
  A reusable UI component for displaying a single statistic
  inside the dashboard (e.g., total workouts, calories, points, streak).

  Props:
  - label (string): Short description of the metric (e.g., "Total Workouts").
  - value (string | number): The main value to display.
  - color (string): Tailwind color class for the value (e.g., "text-purple-500").
  - note (string): Small helper text shown under the value.

  Purpose:
  - Present key user metrics in a clear, visually appealing way.
  - Keep the dashboard modular and consistent.
  - Allow easy reuse for different statistics.

  Behavior:
  - Listens for theme changes (dark / light) using a MutationObserver.
  - Dynamically updates shadows and visual style based on the active theme.
  - Adds hover animations for better user experience:
      • Slight lift (translateY)
      • Scale up
      • Glow effect

  UI Features:
  - Card-style layout with rounded corners.
  - Theme-aware shadow and border styling.
  - Centered text layout for quick readability.
  - Animated hover feedback for interactivity.

  UX Benefits:
  - Makes key statistics immediately noticeable.
  - Encourages engagement through subtle animations.
  - Keeps the dashboard clean, modern, and consistent.
*/
export default function StatCard({ label, value, color, note }) {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

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

  return (
    <div
      className="
        p-8 text-center
        transition-all duration-300 ease-out
        transform hover:-translate-y-2 hover:scale-[1.03]
        cursor-pointer
      "
      style={{
        background: "var(--card-bg)",
        borderRadius: "24px",
        border: "1px solid #0B8A8C",
        boxShadow: isDark
          ? "0 0 0 1px rgba(11,138,140,0.25), 0 0 22px rgba(11,138,140,0.18)"
          : "0 0 0 1px rgba(11,138,140,0.15), 0 0 14px rgba(11,138,140,0.12)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = isDark
          ? "0 0 0 1px rgba(11,138,140,0.4), 0 0 36px rgba(11,138,140,0.45)"
          : "0 0 0 1px rgba(11,138,140,0.3), 0 0 28px rgba(11,138,140,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = isDark
          ? "0 0 0 1px rgba(11,138,140,0.25), 0 0 22px rgba(11,138,140,0.18)"
          : "0 0 0 1px rgba(11,138,140,0.15), 0 0 14px rgba(11,138,140,0.12)";
      }}
    >
      <p className="mb-2" style={{ color: "var(--text-sub)" }}>
        {label}
      </p>

      <p className={`text-4xl font-extrabold ${color}`}>
        {value}
      </p>

      <p className="text-sm mt-1" style={{ color: "var(--text-sub)" }}>
        {note}
      </p>
    </div>
  );
}
