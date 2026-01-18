import { useEffect, useState } from "react";

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
