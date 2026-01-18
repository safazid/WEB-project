import { useNavigate } from "react-router-dom";

export default function DemoComplete() {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto text-center p-6">
      <h2 className="text-2xl font-bold mb-4">
        Demo completed 🎉
      </h2>

      <p className="text-sm text-gray-600 mb-6">
        Create an account to unlock full workouts,
        progress tracking, and your AI coach.
      </p>

      <button
        onClick={() => navigate("/login#register")}
        className="auth-btn w-full py-3 rounded-xl font-semibold"
        style={{ background: "var(--primary)" }}
      >
        Create Account
      </button>

      <button
        onClick={() => navigate("/")}
        className="mt-4 text-sm underline text-gray-500"
      >
        Back to Home
      </button>
    </div>
  );
}
