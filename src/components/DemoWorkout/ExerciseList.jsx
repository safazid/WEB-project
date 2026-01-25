// ExerciseList shows a preview of the demo workout.
// It lists all exercises with their durations,
// lets the user change the difficulty level,
// and allows starting the workout when ready.
export default function ExerciseList({ exercises, onStart, goToLevel }) {
  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-2">
        Your Demo Workout
      </h2>

      <p className="text-sm text-gray-600 mb-6">
        This short demo includes the following exercises:
      </p>

      <ul className="space-y-2 mb-6">
        {exercises.map((ex, i) => (
          <li
            key={i}
            className="p-3 rounded-lg text-left"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--primary-soft)",
            }}
          >
            • {ex.name} ({ex.duration}s)
          </li>
        ))}
      </ul>

      
      <button
        onClick={goToLevel}
        className="mt-4 text-sm underline text-gray-500"
      >
        ← Change level
      </button>

      <p className="text-sm mb-4 text-gray-600">
        Ready to start this workout?
      </p>

      <button
        onClick={onStart}
        className="auth-btn w-full py-3 rounded-xl font-semibold"
        style={{ background: "var(--primary)" }}
      >
        Start Workout
      </button>

      <p className="text-xs mt-3 text-gray-500">
        Demo only · Limited exercises
      </p>
    </div>
  );
}