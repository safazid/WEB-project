import { useEffect, useState } from "react";

export default function Countdown({ seconds, onComplete }) {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    if (time === 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, onComplete]);

  return (
    <div className="mt-6 flex justify-center">
      <div
        className="flex items-center gap-4
                   px-8 py-4
                   rounded-full
                   shadow-md
                   transition-all duration-300"
        style={{
          background: "var(--card-bg)",
          border: "2px solid var(--primary)",
          color: "var(--text)",
        }}
      >
        {/* أيقونة */}
        <span className="text-xl opacity-80">⏱</span>

        {/* النص */}
        <div className="text-center leading-tight">
          <p className="text-xs tracking-wide uppercase opacity-60">
            Time Left
          </p>
          <p className="text-3xl font-bold">
            {time}s
          </p>
        </div>
      </div>
    </div>
  );
}
