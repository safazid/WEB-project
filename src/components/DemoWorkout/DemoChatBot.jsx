import { useState } from "react";
import { useNavigate } from "react-router-dom";

// DemoChatBot simulates a simple AI assistant inside the demo.
// The user can choose between Motivation, Workout, or Fitness Tips.
// A fake “thinking” delay is used to mimic real AI behavior.
// Each choice shows a short response and a call-to-action to register.
// If "Workout" is chosen, the user can jump directly into the demo workout.
const RESPONSES = {
  motivation: {
    title: "🔥 Motivation",
    text: "Motivation helps you start, but discipline keeps you going.",
    explain:
      "Even small steps matter. Staying consistent is the real secret behind long-term success.",
    cta: "Want more motivation? Join FitRise 💜",
  },
  workout: {
    title: "🏋️ Workout",
    text: "Click on ‘▶ Start your Demo workout now’ to start your demo workout and experience FitRise in action 💪",
    explain:
      "A balanced workout includes strength, mobility, and rest. Start light and progress gradually.",
    cta: "Want more Workout? Join FitRise 💜",
  },
  tips: {
    title: "🧠 Fitness Tips",
    text: "Fitness is more than just training.",
    explain:
      "Good sleep, hydration, and recovery are essential parts of a healthy lifestyle.",
    cta: "Want more Fitness Tips? Join FitRise 💜",
  },
};

const MORE_LABELS = {
  motivation: "🔥 More Motivation",
  workout: "🏋️ More Workouts",
  tips: "🧠 More Fitness Tips",
};

export default function DemoChatBot({ onBack, onStartWorkout }) {
  const [choice, setChoice] = useState(null);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();

const register = () => {
  navigate("/login#register");
};

  const handleChoice = (c) => {
    setLoading(true);
    setChoice(null);

    setTimeout(() => {
      setChoice(c);
      setLoading(false);
    }, 1000); // Fake AI thinking
  };

  const current = choice ? RESPONSES[choice] : null;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold">AI Fitness Assistant 🤖</h2>

      {/* السؤال الأساسي */}
      {!choice && !loading && (
        <>
          <p className="text-[var(--secondary)]">
            What can I help you with today?
          </p>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => handleChoice("motivation")}
              className="auth-input"
            >
              🔥 Motivation
            </button>

            <button
              type="button"
              onClick={() => handleChoice("workout")}
              className="auth-input"
            >
              🏋️ Workout
            </button>

            <button
              type="button"
              onClick={() => handleChoice("tips")}
              className="auth-input"
            >
              🧠 Fitness Tips
            </button>
          </div>
        </>
      )}

      {/* Fake typing */}
      {loading && (
        <p className="italic text-[var(--secondary)]">
          AI is thinking...
        </p>
      )}

      {/* جواب البوت */}
      {current && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[var(--card-bg)] border border-purple-500">
            <h3 className="font-semibold">{current.title}</h3>
            <p className="mt-2">{current.text}</p>
            <p className="mt-2 text-sm text-[var(--secondary)]">
              {current.explain}
            </p>
          </div>

          {/* CTA حسب الاختيار */}
          <button
  type="button"
  onClick={register}
  className="auth-input bg-purple-600 text-white"
>
  💜 {current.cta}
</button>


          {/* ربط مباشر بالـ Workout */}
          {choice === "workout" && (
            <button
              type="button"
              onClick={onStartWorkout}
              className="auth-input border border-purple-500"
            >
              ▶ Start your Demo workout now
            </button>
          )}

          {/* خيارات متابعة ذكية */}
          <div className="flex flex-col gap-2">
           

            {choice !== "workout" && (
              <button
                type="button"
                onClick={() => handleChoice("workout")}
                className="auth-input"
              >
                🏋️ Workout
              </button>
            )}

            {choice !== "tips" && (
              <button
                type="button"
                onClick={() => handleChoice("tips")}
                className="auth-input"
              >
                🧠 Fitness Tips
              </button>
            )}

            {choice !== "motivation" && (
              <button
                type="button"
                onClick={() => handleChoice("motivation")}
                className="auth-input"
              >
                🔥 Motivation
              </button>
            )}
          </div>
        </div>
      )}

      {/* رجوع */}
      <button
        type="button"
        onClick={() => {
          setChoice(null);
          onBack();
        }}
        className="text-sm underline text-purple-500"
      >
        ← Back to demo start
      </button>
    </div>
  );
}
