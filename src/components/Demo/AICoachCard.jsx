export default function AICoachCard() {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col justify-between"
      style={{
        background: "linear-gradient(135deg, #e6f7f4, #ffffff)",
        border: "1px solid var(--primary-soft)",
      }}
    >
      <div>
        <h3 className="text-xl font-bold mb-2">
          AI Fitness Coach
        </h3>

        <p className="text-sm italic mb-3">
          “Your coach analyzes your activity and keeps you motivated.”
        </p>

        <p className="text-sm" style={{ color: "var(--text-sub)" }}>
          Get smart recommendations, reminders and feedback powered by AI.
        </p>
      </div>

      <button
        className="mt-4 py-2 rounded-lg font-semibold opacity-70 cursor-not-allowed"
        style={{
          border: "1px solid var(--primary)",
          color: "var(--primary)",
        }}
      >
        Available after signup
      </button>
    </div>
  );
}
