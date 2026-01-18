export default function DemoStartChoice({ onWorkout, onChat }) {
  return (
    <div className="p-6 text-center space-y-6">
      <h2 className="text-2xl font-bold">
        Welcome to FitRise Demo 💪
      </h2>

      <p className="text-[var(--secondary)]">
        What would you like to try?
      </p>

      <div className="flex  gap-8">
        <button
        
          type="button"          // ✅ مهم جدًا
          onClick={onWorkout}
          className="auth-input bg-purple-200 text-white"
        >
          🏋️ Start Workout Demo
        </button>

        <button
          type="button"          // ✅ مهم
          onClick={onChat}
          className="auth-input bg-[var(--card-bg)] border border-purple-500"
        >
          💬 Try AI Chatbot Demo
        </button>
      </div>
    </div>
  );
}
