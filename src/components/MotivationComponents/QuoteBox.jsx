import { useEffect, useState } from "react";

// QuoteBox displays a motivational quote card.
// It:
// - Stores a list of predefined fitness quotes
// - Shows one random quote at a time
// - Allows the user to generate a new quote with a button
// - Adapts its styling to light/dark mode using a MutationObserver
// - Uses smooth card styling and shadow effects for a premium feel
const quotes = [
  "Your body can stand almost anything. It's your mind you have to convince.",
  "Push yourself, because no one else will do it for you.",
  "Small progress is still progress.",
  "Don’t stop when you’re tired. Stop when you're done.",
];

export default function QuoteBox() {
  const [quote, setQuote] = useState(quotes[0]);
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

  const newQuote = () => {
    const random = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[random]);
  };

  return (
    <div
  className="rounded-3xl px-10 py-14 text-center mb-20 transition-all"
  style={{
    background: "var(--card-bg)",
    border: "1px solid #4EE4C2",
    color: "var(--text-main)",
    boxShadow: isDark
      ? "0 0 0 1px rgba(11,138,140,0.25), 0 0 18px rgba(11,138,140,0.18)"
      : "0 0 0 1px rgba(11,138,140,0.15), 0 0 12px rgba(11,138,140,0.12)",
  }}
>

      <p className="text-3xl font-semibold mb-6">
        “{quote}”
      </p>

      <p className="opacity-70 mb-8">— Anonymous</p>

      <button
        onClick={newQuote}
        className="px-6 py-3 rounded-xl font-semibold transition"
        style={{
          background: "#4EE4C2",
          color: "black",
         boxShadow: isDark
  ? "0 0 0 1px rgba(11,138,140,0.25), 0 0 18px rgba(11,138,140,0.18)"
  : "0 0 0 1px rgba(11,138,140,0.15), 0 0 12px rgba(11,138,140,0.12)",

        }}
      >
        ⟳ New Quote
      </button>
    </div>
  );
}