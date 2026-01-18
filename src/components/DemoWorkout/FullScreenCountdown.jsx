import { useEffect, useState } from "react";

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
      {/* 🖤 خلفية سوداء شفافة */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0, 0, 0, 0.45)", // شفافية مظبوطة
        }}
      />

      {/* 🔢 دائرة العدّاد */}
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