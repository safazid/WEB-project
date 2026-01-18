import logo from "../../assets/YOUR_LOGO.png";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate(); // 👈 هذا السطر المهم
  return (
    <section
      id="home"
      className="pt-32 pb-20"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            <h2 className="text-5xl font-extrabold leading-tight">
              <span style={{ color: "var(--primary)" }}>Get Fitter.</span><br />
              <span style={{ color: "var(--secondary)" }}>
                Train Smarter.
              </span>
            </h2>

            <p
              className="mt-5 text-lg"
              style={{ color: "var(--text-sub)", maxWidth: "550px" }}
            >
              Join the smart fitness platform that gives you daily challenges,
              personalized plans, real progress tracking and motivation from our
              AI fitness coach.
            </p>

            <div className="mt-8 flex gap-4">
              <button
                className="px-6 py-3 rounded-lg font-bold "
                style={{ background: "var(--primary)", color: "black" }}
                onClick={() => {navigate("/login"); setOpen(false);}}             
              >
                Start Now
              </button>

              <button onClick={() => navigate("/demo")}
                className="px-6 py-3 rounded-lg border"
                style={{ borderColor: "var(--secondary)", color: "var(--secondary)" }}
              >
                Try Demo
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-end">
            <div
              className="p-6 rounded-xl"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--primary-soft)",
              }}
            >
              <img
                src={logo}
                alt="FitRise"
                className="w-72 md:w-80 lg:w-96"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
