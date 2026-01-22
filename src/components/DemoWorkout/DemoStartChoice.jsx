// DemoStartChoice is the first screen of the demo flow.
// It lets the user choose between starting a workout demo
// or trying the AI chatbot demo.
// onWorkout starts the workout path.
// onChat opens the AI chat experience.
export default function DemoStartChoice({ onWorkout, onChat }) {
  return (
    <div
      className="
        min-h-[60vh]
        flex flex-col items-center justify-center
        px-6 text-center
        transition-colors duration-500
      "
    >
      <div className="max-w-xl w-full space-y-8">
        <div>
          <h2
            className="
              text-4xl md:text-5xl font-extrabold mb-3
              bg-gradient-to-r from-[var(--primary)] to-purple-500
              dark:from-teal-400 dark:to-fuchsia-500
              bg-clip-text text-transparent
            "
          >
            Welcome to FitRise
          </h2>

          <p className="text-lg opacity-80 dark:text-white">
            Experience a smart fitness journey powered by AI.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Workout Card */}
          <button
            type="button"
            onClick={onWorkout}
            className="
              group p-6 rounded-2xl text-left
              border border-[var(--primary-soft)]
              bg-white
              dark:bg-[#0b1220]
              dark:border-teal-700/40
              shadow-sm
              hover:shadow-xl
              transition-all duration-300
              hover:-translate-y-1
            "
          >
            <div className="text-3xl mb-3">🏋️</div>
            <h3 className="text-xl font-bold mb-1  dark:text-white">
              Workout Demo
            </h3>
            <p className="text-sm dark:text-white">
              Try a short guided workout based on your goal.
            </p>

            <div className="mt-4 text-sm font-semibold text-[var(--primary)] dark:text-white group-hover:underline">
              Start now →
            </div>
          </button>

          {/* AI Card */}
          <button
            type="button"
            onClick={onChat}
            className="
              group p-6 rounded-2xl text-left
              border border-purple-300
              bg-white
              dark:bg-[#0b1220]
              dark:border-fuchsia-700/40
              shadow-sm
              hover:shadow-xl
              transition-all duration-300
              hover:-translate-y-1
            "
          >
            <div className="text-3xl mb-3">💬</div>
            <h3 className="text-xl font-bold mb-1  dark:text-white">
              AI Coach Preview
            </h3>
            <p className="text-sm -600 dark:text-white">
              Chat with a smart fitness assistant.
            </p>

            <div className="mt-4 text-sm font-semibold text-purple-600 dark:text-white group-hover:underline">
              Talk to AI →
            </div>
          </button>
        </div>

        <p className="text-xs opacity-60  dark:text-white">
          No signup required · Takes less than 2 minutes
        </p>
      </div>
    </div>
  );
}