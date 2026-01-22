import { useEffect, useState } from "react";

// FitnessTipCard is a reusable UI component that displays
// a small fitness tip with an icon, title, and description.
// It:
// - Adapts its shadow style based on the current theme (light/dark)
// - Listens for theme changes using a MutationObserver
// - Shows a clean, card-style layout for tips or advice
// - Is fully customizable via props (icon, title, desc)
export default function FitnessTipCard({ icon, title, desc }) {
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
      className="rounded-3xl shadow-lg p-8 transition"
      style={{
        background: "var(--card-bg)",
        border: "1px solid #4EE4C2",
        color: "var(--text-main)",
         boxShadow: isDark
  ? "0 0 0 1px rgba(11,138,140,0.25), 0 0 18px rgba(11,138,140,0.18)"
  : "0 0 0 1px rgba(11,138,140,0.15), 0 0 12px rgba(11,138,140,0.12)",
      }}
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="opacity-70 text-sm">{desc}</p>
    </div>
  );
}