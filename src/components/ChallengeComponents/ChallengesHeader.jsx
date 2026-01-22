import { useEffect, useState } from "react";

/*
  ChallengesHeader
  ----------------
  Displays the header section for the Challenges page.

  Features:
  - Shows the page title and subtitle
  - Adapts the title color based on the current theme (light / dark)
  - Listens to theme changes using a MutationObserver

  This component is purely presentational and has no business logic.
*/
export default function ChallengesHeader() {

    // Track whether the current theme is dark
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
        // Observe changes to the <html> class to detect theme switches
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
