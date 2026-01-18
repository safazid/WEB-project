import { useEffect, useState } from "react";

export default function ChallengesHeader() {
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
    <div className="mb-10">
      <h1
        className="text-4xl font-extrabold mb-2"
        style={{
          color: isDark ? "#A066FF" : "#8E3CA9",
        }}
      >
        Challenges
      </h1>

      <p
        className="text-lg"
        style={{
          color: "var(--text-sub)",
        }}
      >
        Complete challenges to earn points and track progress
      </p>
    </div>
  );
}
