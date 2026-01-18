import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [light, setLight] = useState(
  localStorage.getItem("theme")
    ? localStorage.getItem("theme") === "light"
    : !document.documentElement.classList.contains("dark")
);


  useEffect(() => {
    if (light) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    }
  }, [light]);

  return (
    <button
      onClick={() => setLight(!light)}
      className={`theme-switch-pill ${light ? "light" : ""}`}
      aria-label="Toggle theme"
    >
      <span className="theme-switch-knob">
        {light ? "🌞" : "🌙"}
      </span>
    </button>
  );
}
