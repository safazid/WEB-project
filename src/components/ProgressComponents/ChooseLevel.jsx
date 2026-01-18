import { useNavigate } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

export default function ChooseLevel() {
  const navigate = useNavigate();

  function selectLevel(level) {
    localStorage.setItem("fitnessLevel", level);
    localStorage.setItem("hasChosenLevel", "true");
    navigate("/ai");
  }

  return (
    <>
      <Navbar />

      <main className="pt-32 pb-20 flex justify-center px-6">
        <div className="max-w-xl w-full text-center bg-[var(--card-bg)] p-8 rounded-2xl shadow-lg border border-[var(--primary-soft)]">
          <h1 className="text-3xl font-bold mb-4">
            Choose Your Fitness Level
          </h1>

          <p className="text-sm text-[var(--text-sub)] mb-8">
            This helps us personalize your workout experience.
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => selectLevel("Beginner")}
              className="auth-btn"
            >
              🟢 Beginner
              <br />
              <span className="text-xs">
                New to fitness or returning after a break
              </span>
            </button>

            <button
              onClick={() => selectLevel("Intermediate")}
              className="auth-btn"
            >
              🟡 Intermediate
              <br />
              <span className="text-xs">
                You train regularly and want to improve
              </span>
            </button>

            <button
              onClick={() => selectLevel("Advanced")}
              className="auth-btn"
            >
              🔴 Advanced
              <br />
              <span className="text-xs">
                High intensity and challenging workouts
              </span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
