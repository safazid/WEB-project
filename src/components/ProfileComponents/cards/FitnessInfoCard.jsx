export default function FitnessInfoCard({ form, setForm }) {
    // Card for editing fitness-related user data (height, weight, goal, activity, DOB)
  return (
    <div className="bg-white rounded-2xl p-6 shadow border">
      <h3 className="text-[var(--teal)] font-bold mb-4">
        Fitness Details
      </h3>
      
      {/* Height & Weight */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Height (cm)"
          className="auth-input"
          value={form.height}
          onChange={(e) => setForm({ ...form, height: e.target.value })}
        />

        <input
          type="number"
          placeholder="Weight (kg)"
          className="auth-input"
          value={form.weight}
          onChange={(e) => setForm({ ...form, weight: e.target.value })}
        />
      </div>

      {/* Fitness goal */}
      <select
        className="auth-input mt-4"
        value={form.goal}
        onChange={(e) => setForm({ ...form, goal: e.target.value })}
      >
        <option value="">Fitness Goal</option>
        <option>Lose Weight</option>
        <option>Build Muscle</option>
        <option>Stay Fit</option>
      </select>

      {/* Activity level */}
      <select
        className="auth-input mt-4"
        value={form.activity}
        onChange={(e) => setForm({ ...form, activity: e.target.value })}
      >
        <option value="">Activity Level</option>
        <option>Sedentary</option>
        <option>Lightly Active</option>
        <option>Moderately Active</option>
        <option>Very Active</option>
      </select>

      {/* Date of birth */}
      <input
        type="date"
        className="auth-input mt-4"
        value={form.dob}
        onChange={(e) => setForm({ ...form, dob: e.target.value })}
      />
    </div>
  );
}