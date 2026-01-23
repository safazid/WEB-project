/*
  WorkoutPreferences
  -------------------
  This component collects the user's current state before
  generating an AI workout:
  - How the user feels today (energy level)
  - Which muscle group they want to train

  The selected values are controlled by the parent component
  via props (feeling, setFeeling, muscle, setMuscle).
*/
export default function WorkoutPreferences({
  feeling,
  setFeeling,
  muscle,
  setMuscle,
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 my-10 space-y-8">
      <h2 className="text-xl font-bold text-center">
        Before we start 🌸
      </h2>

      {/* Feeling */}
      <div>
        <p className="font-semibold mb-3">How are you feeling today?</p>
        <div className="flex gap-3 flex-wrap">
          {[
            { key: "tired", label: "😴 Tired" },
            { key: "normal", label: "🙂 Normal" },
            { key: "energetic", label: "⚡ Energetic" },
          ].map((f) => (
            <button
  key={f.key}
  onClick={() => setFeeling(f.key)}
  className={`px-4 py-2 rounded-lg border transition ${
    feeling === f.key
      ? "text-black"
      : "bg-gray-100 dark:bg-gray-800"
  }`}
  style={
    feeling === f.key
      ? {
          background: "var(--secondary)",
          borderColor: "var(--primary-soft)",
          color: "white",
          boxShadow: "0 0 10px var(--primary-soft)",
        }
      : {}
  }
>

              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Muscle */}
      <div>
        <p className="font-semibold mb-3">
          Which muscles do you want to train?
        </p>
        <select
          value={muscle}
          onChange={(e) => setMuscle(e.target.value)}
          className="w-full p-3 border rounded-lg"
        >
          <option value="">Select muscle group</option>
          <option value="full body">Full Body</option>
          <option value="legs">Legs</option>
          <option value="arms">Arms</option>
          <option value="back">Back</option>
          <option value="core">Core</option>
          <option value="glutes">Glutes</option>
        </select>
      </div>
    </div>
  );
}
