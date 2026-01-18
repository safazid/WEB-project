import { useEffect, useState } from "react";

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

  // حركة الشريط
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
        {completedWeekly} of {weeklyGoal} weekly challenges completed
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

      {/* Percentage */}
      <p className="mt-3 text-sm font-medium" style={{ color: "var(--text-sub)" }}>
        {percent}% completed
      </p>
    </div>
  );
}
