import { useEffect, useState } from "react";

// FullScreenCountdown displays a full-screen overlay countdown (3 → 0)
// before starting an exercise. It decreases the number every second,
// and when it reaches 0, it calls onFinish to continue to the workout.
export default function FullScreenCountdown({ onFinish }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      onFinish();
      return;
    }

    const timer = setTimeout(() => {
      setCount((c) => c - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0, 0, 0, 0.45)", 
        }}
      />

      <div
        className="relative flex items-center justify-center rounded-full
                   w-28 h-28 md:w-32 md:h-32
                   shadow-xl border"
        style={{
          background: "var(--card-bg)",
          borderColor: "var(--primary)",
          color: "var(--text)",
        }}
      >
        <div className="text-center">
          {count === 3 && (
            <p className="text-xs mb-1 opacity-70">
              Get Ready
            </p>
          )}

          <span className="text-5xl font-extrabold">
            {count}
          </span>
        </div>
      </div>
    </div>
  );
}