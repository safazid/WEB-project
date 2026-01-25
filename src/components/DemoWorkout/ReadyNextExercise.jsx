// ReadyNextExercise shows a simple confirmation screen between exercises.
// It informs the user that the next exercise will start with a countdown
// and waits for them to press the button to continue.
export default function ReadyNextExercise({ onStart }) {
  return (
    <div className="max-w-md mx-auto text-center p-6">
      <h2 className="text-2xl font-bold mb-4">
        Ready for the next exercise?
      </h2>
      
      <p className="text-sm text-gray-600 mb-6">
        The next exercise will start with a countdown.
      </p>

      <button
        onClick={onStart}
        className="w-full py-3 rounded-xl font-semibold"
        style={{ background: "var(--primary)", color: "black" }}
      >
        Start Next Exercise
      </button>
    </div>
  );
}

