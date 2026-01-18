export default function PasswordCard({ newPassword, setNewPassword }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow border">
      <h3 className="text-[var(--purple)] font-bold mb-4">
        Change Password
      </h3>

      <input
        type="password"
        placeholder="Enter new password"
        className="auth-input"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
    </div>
  );
}
