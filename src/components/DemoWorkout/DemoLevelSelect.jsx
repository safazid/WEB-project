// DemoLevelSelect allows the user to choose the workout difficulty level.
// It presents three options: Easy, Medium, and Hard.
// When a level is selected, it calls onSelect(level) to move to the next step.
// The Back button lets the user return to the goal selection screen.
export default function DemoLevelSelect({ onSelect, onBack }) {
  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-6">
        Choose your level
      </h2>

      <div className="space-y-3 ">
        <button
            type="button"
            className="w-full p-4 rounded-xl text-left hover:shadow transition"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--primary-soft)",
            }} onClick={() => onSelect("easy")}>Easy</button>
        <button type="button"
            className="w-full p-4 rounded-xl text-left hover:shadow transition"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--primary-soft)",
            }} onClick={() => onSelect("medium")}>Medium</button>
        <button type="button"
            className="w-full p-4 rounded-xl text-left hover:shadow transition"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--primary-soft)",
            }} onClick={() => onSelect("hard")}>Hard</button>
      </div>

      {/* 🔙 Back */}
      <button
        onClick={onBack}
        className="mt-6 text-sm underline text-gray-500"
      >
        ← change Goal
      </button>
    </div>
  );
}
