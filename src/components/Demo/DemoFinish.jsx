export default function DemoFinish() {
  return (
    <div className="max-w-md text-center">
      <h2 className="text-3xl font-bold mb-4">
        Great start! 🎉
      </h2>

      <p className="text-sm mb-6 text-gray-600">
        You completed your demo workout.
        Create an account to unlock personalized plans,
        progress tracking and your AI fitness coach.
      </p>

      <button
        className="w-full py-3 rounded-xl font-semibold mb-3"
        style={{ background: "black", color: "white" }}
      >
        Create Account
      </button>

      <p className="text-xs text-gray-500">
        Takes less than a minute
      </p>
    </div>
  );
}
