export default function DemoIntro({ onNext }) {
  return (
    <div className="max-w-md text-center">
      <h1 className="text-3xl font-bold mb-4">
        Try FitRise Demo
      </h1>

      <p className="text-sm mb-6 text-gray-600">
        Experience a short, guided preview of FitRise.
        This demo includes limited workouts and features
        and takes only a few minutes.
      </p>

      <button
        onClick={onNext}
        className="w-full py-3 rounded-xl font-semibold"
        style={{ background: "var(--primary)", color: "black" }}
      >
        Start Demo
      </button>

      <p className="text-xs mt-4 text-gray-500">
        No signup required · No data saved
      </p>
    </div>
  );
}
