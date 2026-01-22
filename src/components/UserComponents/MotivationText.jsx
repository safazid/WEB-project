import { useEffect, useState } from "react";

const messages = [
  "Transform your body. Upgrade your mind.",
  "Fitness made smarter — just for you.",
  "Stop guessing. Start progressing.",
  "Your goals deserve better — try FitRise.",
  "Motivation isn’t luck — it’s a system."
];

// Displays rotating motivational messages with a smooth fade animation
// to inspire users during authentication and onboarding.
export default function MotivationText() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setVisible(true);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <p
      id="motivationText"
      className={`
        mt-10
        mb-6
        text-center
        text-sm
        transition-opacity
        duration-500
        relative
        z-0
        pointer-events-none
        ${visible ? "opacity-100" : "opacity-0"}
      `}
    >
      {messages[index]}
    </p>
  );
}