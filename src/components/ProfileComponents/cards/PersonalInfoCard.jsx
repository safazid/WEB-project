export default function PersonalInfoCard({ form, setForm }) {
    // Handles basic personal details (name & email)
  return (
    <div className="bg-white rounded-2xl p-6 shadow border">
      <h3 className="text-[var(--teal)] font-bold mb-4">
        Personal Information
      </h3>

      <label className="block mb-2 font-medium">Full Name</label>
      <input
        className="auth-input mb-4"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <label className="block mb-2 font-medium">Email</label>
      <input
        className="auth-input bg-gray-100 cursor-not-allowed"
        value={form.email}
        disabled
      />
    </div>
  );
}