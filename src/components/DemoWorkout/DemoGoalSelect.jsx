// DemoGoalSelect lets the user choose their main fitness goal in the demo.
// It displays a small list of goals (weight, strength, active) and
// notifies the parent component when a goal is selected.
// The Back button allows returning to the previous demo step.
export default function DemoGoalSelect({ onSelect, onBack }) {
  const goals = [
    { id: "weight", label: "Lose Weight", icon: "🔥" },
    { id: "strength", label: "Build Strength", icon: "💪" },
    { id: "active", label: "Stay Active", icon: "🧘" },
  ];

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">
        What’s your goal?
      </h2>

      <div className="space-y-3 mb-6">
        {goals.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => onSelect(g.id)}
            className="w-full p-4 rounded-xl text-left hover:shadow transition"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--primary-soft)",
            }}
          >
            <span className="mr-2">{g.icon}</span>
            {g.label}
          </button>
        ))}
      </div>

      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="text-sm underline text-purple-500"
      >
        ← Back to demo start
      </button>
    </div>
  );
}