// This component is shown after the rest period.
// It lets the user decide whether to continue to the next exercise
// or stop the demo and return to the beginning.
export default function ContinueAfterRest({ onContinue, onBack }) {
  return (
    <div className="max-w-md mx-auto text-center p-6">
      <h2 className="text-2xl font-bold mb-4">
        Continue workout?
      </h2>

      <p className="text-sm text-gray-600 mb-6">
        You’ve completed the exercise.
        Would you like to continue to the next one?
      </p>

      <div className="flex gap-3">
        <button
          onClick={onContinue}
          className="auth-btn flex-1 py-3 rounded-xl font-semibold"
          style={{ background: "var(--primary)" }}
        >
          Continue
        </button>

        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-xl font-semibold border"
        >
          Stop Demo
        </button>
      </div>
    </div>
  );
}
