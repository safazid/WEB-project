import { useEffect, useState } from "react";

/*
  WeeklyProgress
  --------------
  A dashboard component that visualizes the user's weekly workout progress
  toward a predefined goal.

  Props:
  - completedWeekly (number): The number of workouts completed in the current week.
    Defaults to 0 if not provided.

  Internal Logic:
  - weeklyGoal is fixed at 5 workouts per week.
  - The progress percentage is calculated as:
        (completedWeekly / weeklyGoal) * 100
    and clamped to a maximum of 100%.

  Behavior:
  - The progress bar animates smoothly whenever the percentage changes.
  - The bar resets to 0 and then grows to the new value for a visual effect.
  - The component listens for theme changes (dark/light mode)
    using a MutationObserver and adapts colors and shadows accordingly.

  UI Structure:
  - Title: "Weekly Progress"
  - Subtitle: Displays completed workouts out of the weekly goal.
  - Animated horizontal progress bar with gradient fill.
  - Percentage label below the bar.

  Visual Design:
  - Uses a purple gradient for the progress bar.
  - Rounded edges for a modern card appearance.
  - Soft glow and hover effects for interactivity.
  - Adaptive background and shadow based on the current theme.

  UX Benefits:
  - Gives users a clear sense of weekly commitment.
  - Encourages consistency by making progress visible.
  - Reinforces short-term goals (weekly) rather than only long-term totals.
  - Provides instant feedback after each completed workout.

  This component works alongside StatsCards, WeeklyChart, and MonthlyStats
  to give users a structured and motivating progress overview.
*/
export default function WeeklyProgress({ completedWeekly = 0 }) {
  const weeklyGoal = 5;

  const percent = Math.min(
    100,
    Math.round((completedWeekly / weeklyGoal) * 100)
  );

  const [animatedWidth, setAnimatedWidth] = useState(0);
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

  useEffect(() => {
    setAnimatedWidth(0);
    const timeout = setTimeout(() => {
      setAnimatedWidth(percent);
    }, 120);

    return () => clearTimeout(timeout);
  }, [percent]);

  return (
    <div
      className="
        p-8 mb-10
        transition-all duration-300 ease-out
        transform hover:-translate-y-2 hover:scale-[1.02]
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
    >
      <h2 className="text-2xl font-bold mb-3" style={{ color: "#A066FF" }}>
        Weekly Progress
      </h2>

      <p className="mb-4" style={{ color: "var(--text-sub)" }}>
        {completedWeekly} of {weeklyGoal} weekly workouts completed
      </p>

      {/* Progress Bar */}
      <div
        className="w-full rounded-full overflow-hidden"
        style={{
          height: "14px",
          background: isDark
            ? "rgba(255,255,255,0.12)"
            : "rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: animatedWidth + "%",
            background: "linear-gradient(90deg, #C46CFF, #8E3CA9)",
            boxShadow: "0 0 12px rgba(192,108,255,0.6)",
            transition: "width 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
            borderRadius: "999px",
          }}
        />
      </div>

      <p
        className="mt-3 text-sm font-medium"
        style={{ color: "var(--text-sub)" }}
      >
        {percent}% completed
      </p>
    </div>
  );
}