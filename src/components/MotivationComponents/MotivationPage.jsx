import QuoteBox from "./QuoteBox";
import FitnessTips from "./FitnessTips";
import { useEffect, useState } from "react";
import ChatBubble from "../layouts/ChatBubble"; 

export default function MotivationPage() {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // 👇 هذا السطر هو المفتاح
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
    <section
      className="min-h-screen transition-all"
      style={{
        background: "var(--bg)",
        color: "var(--text-main)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-32">

        <h1
          className="text-4xl font-extrabold mb-2 flex items-center gap-2"
          style={{
            color: isDark ? "#A066FF" : "#8E3CA9",
          }}
        >
          Stay Motivated ✨
        </h1>

        <p
          className="mb-12"
          style={{
            color: "var(--text-sub)",
          }}
        >
          Get inspired and learn tips to improve your fitness journey.
        </p>

        <QuoteBox />
        <FitnessTips />
           {/* 👇 Chat Bubble */}
        <ChatBubble />
      </div>
    </section>
  );
}
