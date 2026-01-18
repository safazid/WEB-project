import { useEffect, useState } from "react";

export default function RestTimer({ seconds = 5, onFinish }) {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    if (time === 0) {
      onFinish();
      return;
    }

    const timer = setTimeout(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, onFinish]);

  const getMessage = () => {
    if (time === seconds) return "Great job! 💪";
    if (time > 2) return "Breathe and recover 🧘";
    return "Get ready for the next move 🔥";
  };

  return (
    <div
      className="max-w-lg mx-auto text-center p-8 rounded-2xl shadow-md"
      style={{
        background: "var(--card-bg)",
        border: "2px solid var(--primary-soft)",
      }}
    >
      <h2 className="text-3xl font-extrabold mb-3">
        Rest Time
      </h2>

      <p className="text-lg mb-6 text-[var(--secondary)]">
        {getMessage()}
      </p>

      <p className="text-7xl font-extrabold mb-4">
        {time}
      </p>

      <p className="text-base text-[var(--secondary)]">
        Next exercise is coming up…
      </p>
    </div>
  );
}
