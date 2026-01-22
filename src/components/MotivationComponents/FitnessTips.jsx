import FitnessTipCard from "./FitnessTipCard";
import { useEffect, useState } from "react";

// FitnessTips renders a full section of helpful fitness tips.
// It:
// - Displays a themed section title that adapts to light/dark mode
// - Uses multiple FitnessTipCard components to show tips
// - Listens to theme changes using a MutationObserver
// - Organizes all tips in a responsive grid layout
export default function FitnessTips() {
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
    <>
      <h2
        className="text-2xl font-bold mb-10 flex items-center gap-2"
        style={{
          color: isDark ? "#A066FF" : "#8E3CA9",
        }}
      >
        💡 Fitness Tips
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <FitnessTipCard
          icon="💧"
          title="Stay Hydrated"
          desc="Drink at least 8 glasses of water daily."
        />
        <FitnessTipCard
          icon="🔥"
          title="Warm Up Properly"
          desc="Always warm up before exercise."
        />
        <FitnessTipCard
          icon="😴"
          title="Rest Days Matter"
          desc="Let your muscles recover well."
        />
        <FitnessTipCard
          icon="🌙"
          title="Consistent Sleep"
          desc="Aim for 7–9 hours of quality sleep."
        />
        <FitnessTipCard
          icon="🥗"
          title="Balanced Nutrition"
          desc="Eat proteins, carbs, and healthy fats daily."
        />
        <FitnessTipCard
          icon="📊"
          title="Track Progress"
          desc="Monitor your improvements regularly."
        />
      </div>
    </>
  );
}