import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./login.css";

import { db } from "../../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; // ✅ تغيير ضروري فقط

const painOptions = [
  { label: "Back", value: "back" },
  { label: "Knee", value: "knee" },
  { label: "Shoulder", value: "shoulder" },
  { label: "Neck", value: "neck" },
  { label: "Hip", value: "hip" },
];

export default function FitnessSetup() {
  const [form, setForm] = useState({
    gender: "",
    height: "",
    weight: "",
    goal: "",
    activity: "",
    dob: "",
    pains: [], // ✅ مهم
  });

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ الـ UID جاي من Register
  const userId =
    location.state?.registerData?.uid ||
    localStorage.getItem("userId");

  useEffect(() => {
    if (location.state?.fitnessData) {
      setForm(location.state.fitnessData);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const required = ["gender", "height", "weight", "goal", "activity", "dob"];
    for (let f of required) {
      if (!form[f]) {
        alert("Please fill all required fields.");
        return;
      }
    }

    if (!userId) {
      alert("Missing user ID");
      return;
    }

    try {
      // ✅ إنشاء المستخدم + حفظ الفيتنس (بدون حذف أي شيء)
    await setDoc(doc(db, "users", userId), {
  name: location.state?.registerData?.name,
  email: location.state?.registerData?.email,
  createdAt: serverTimestamp(),

  fitness: {
    gender: form.gender,
    height: Number(form.height),
    weight: Number(form.weight),
    goal: form.goal,
    activity: form.activity,
    dob: form.dob,
    pains: form.pains,
  },

  totalWorkouts: 0,
  totalCalories: 0,
  totalPoints: 0,
  completedWeekly: 0,
});


      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", userId);

      alert("Profile saved successfully! ✅");
      navigate("/profile");
    } catch (error) {
      console.error("Fitness save error ❌", error);
      alert("Failed to save fitness data");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex flex-1 justify-center items-center pt-28 pb-16 px-6">
        <div className="w-full max-w-md bg-[var(--card-bg)] rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            Complete Your Fitness Profile
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Gender */}
            <div>
              <label className="block font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select your gender</option>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </div>

            {/* Height + Weight */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-1">
                  Height (cm)
                </label>
                <input
                  name="height"
                  type="number"
                  value={form.height}
                  onChange={handleChange}
                  className="form-select"
                  placeholder="e.g. 170"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Weight (kg)
                </label>
                <input
                  name="weight"
                  type="number"
                  value={form.weight}
                  onChange={handleChange}
                  className="form-select"
                  placeholder="e.g. 65"
                />
              </div>
            </div>

            {/* Goal */}
            <div>
              <label className="block font-medium mb-1">
                Fitness Goal
              </label>
              <select
                name="goal"
                value={form.goal}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select your goal</option>
                <option>Lose Weight</option>
                <option>Build Muscle</option>
                <option>Stay Fit</option>
              </select>
            </div>

            {/* Activity */}
            <div>
              <label className="block font-medium mb-1">
                Activity Level
              </label>
              <select
                name="activity"
                value={form.activity}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">How active are you?</option>
                <option>Sedentary (little or no exercise)</option>
                <option>Lightly active (1–3 days/week)</option>
                <option>Moderately active (3–5 days/week)</option>
                <option>Very active (6–7 days/week)</option>
              </select>
            </div>

            {/* Pain selector */}
            <div>
              <label className="block mb-2">Any pain or injury?</label>

              <div className="flex flex-wrap gap-2">
                {painOptions.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        pains: prev.pains.includes(p.value)
                          ? prev.pains.filter((x) => x !== p.value)
                          : [...prev.pains, p.value],
                      }))
                    }
                    className={`px-4 py-2 rounded-full border text-sm transition
                      ${
                        form.pains.includes(p.value)
                          ? "bg-[var(--secondary)] text-white"
                          : "border-gray-400 text-gray-400"
                      }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* DOB */}
            <div>
              <label className="block font-medium mb-1">
                Date of Birth
              </label>
              <input
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
                className="form-select"
              />
            </div>

            {/* Submit */}
            <button type="submit" className="auth-btn mt-6">
              Save and Continue
            </button>

            <p className="text-center text-sm mt-4">
              Want to change something?{" "}
              <span
                onClick={() =>
                  navigate("/login#register", {
                    state: {
                      registerData: location.state?.registerData,
                      fitnessData: form,
                    },
                  })
                }
                className="text-[var(--secondary)] cursor-pointer hover:underline"
              >
                Go back to Register
              </span>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
