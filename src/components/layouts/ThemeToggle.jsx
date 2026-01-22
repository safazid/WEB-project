import { useEffect, useState } from "react";

// ThemeToggle is a small UI control that switches the app
// between Light Mode and Dark Mode.
// It:
// - Reads the saved theme from localStorage on load
// - Updates the <html> class to apply the correct theme
// - Saves the selected theme back to localStorage
// - Toggles between 🌞 (light) and 🌙 (dark)
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