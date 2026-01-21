import { useState, useEffect } from "react";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import "./AIFitness.css";
import WorkoutPreferences from "../AIComponents/WorkoutPreferences";

import { useNavigate } from "react-router-dom";


/* =========================
   USER FITNESS LEVEL
========================= */
//const fitnessLevel = localStorage.getItem("fitnessLevel") || "Beginner";


const levelMap = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

const exerciseRules = {
  Beginner: {
    squat: 10,
    pushup: 8,
    plank: 20,
    wallSit: 30,
  },
  Intermediate: {
    squat: 20,
    pushup: 15,
    plank: 40,
    wallSit: 45,
  },
  Advanced: {
    squat: 30,
    pushup: 25,
    plank: 60,
    wallSit: 60,
  },
};

//const rules = exerciseRules[fitnessLevel];
//const userLevel = levelMap[fitnessLevel] || 1;

const PLAN_MET_MAP = {
  Cardio: 6,
  Legs: 5,
  Chest: 5,
  Abs: 4.5,
  Arms: 4,
  Glutes: 4.5,
  Mobility: 2.5,
};

/* =========================
   PLANS DATA (STATIC)
========================= */
const plansData = [
  {
    id: 1,
    level: 1,
    name: "Easy Fat Burn Walk",
    target: "Cardio",
    duration: 12,
    goal: "Weight Loss",
    image: "https://images.pexels.com/photos/3757375/pexels-photo-3757375.jpeg",
    purpose: "Light cardio to burn calories safely.",
    exercises: [
      "6 min brisk walk",
      "2 × 30s slow jumping jacks",
      "2 min cool-down walk",
    ],
  },
  {
    id: 2,
    level: 2,
    name: "Beginner Jog Session",
    target: "Cardio",
    duration: 15,
    goal: "Endurance",
    image: "https://images.pexels.com/photos/1199590/pexels-photo-1199590.jpeg",
    purpose: "Improve breathing and stamina gradually.",
    exercises: [
      "2 min fast walk",
      "6 min slow jog",
      "3 × 30s high knees (slow)",
      "2 min cooldown",
    ],
  },
  {
    id: 3,
    level: 1,
    name: "Push-Up Starter",
    target: "Chest",
    duration: 10,
    goal: "Strength",
    image: "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg",
    purpose: "Build chest strength safely.",
    exercises: [],
  },
  {
    id: 4,
    level: 2,
    name: "Chest Builder",
    target: "Chest",
    duration: 14,
    goal: "Muscle Gain",
    image: "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg",
    purpose: "Increase chest activation.",
    exercises: [],
  },
  {
    id: 5,
    level: 1,
    name: "Leg & Thigh Tone",
    target: "Legs",
    duration: 12,
    goal: "Toning",
    image: "https://images.pexels.com/photos/4498291/pexels-photo-4498291.jpeg",
    purpose: "Activate thighs without pressure.",
    exercises: [],
  },
  {
    id: 6,
    level: 2,
    name: "Strong Legs Builder",
    target: "Legs",
    duration: 16,
    goal: "Strength",
    image: "https://images.pexels.com/photos/4761665/pexels-photo-4761665.jpeg",
    purpose: "Strengthen quads & hamstrings.",
    exercises: [],
  },
  {
    id: 7,
    level: 1,
    name: "Glute Lift Starter",
    target: "Glutes",
    duration: 10,
    goal: "Shaping",
    image: "https://images.pexels.com/photos/6454082/pexels-photo-6454082.jpeg",
    purpose: "Activate and lift glutes.",
    exercises: [
      "2 × 15 glute bridges",
      "2 × 12 kickbacks",
      "1 × 30s hip hold",
    ],
  },
  {
    id: 8,
    level: 2,
    name: "Booty Shape Up",
    target: "Glutes",
    duration: 14,
    goal: "Shaping",
    image: "https://images.pexels.com/photos/6551078/pexels-photo-6551078.jpeg",
    purpose: "More tension for better results.",
    exercises: [
      "3 × 15 glute bridges",
      "3 × 12 sumo squats",
      "2 × 15 kickbacks each leg",
    ],
  },
  {
    id: 9,
    level: 1,
    name: "Flat Core Beginner",
    target: "Abs",
    duration: 9,
    goal: "Core",
    image: "https://images.pexels.com/photos/4498578/pexels-photo-4498578.jpeg",
    purpose: "Tighten stomach gently.",
    exercises: [],
  },
  {
    id: 10,
    level: 2,
    name: "Core Burner",
    target: "Abs",
    duration: 14,
    goal: "Core",
    image: "https://images.pexels.com/photos/6454084/pexels-photo-6454084.jpeg",
    purpose: "Increase difficulty slowly.",
    exercises: [],
  },
  {
    id: 11,
    level: 1,
    name: "Arm & Shoulder Tone",
    target: "Arms",
    duration: 10,
    goal: "Toning",
    image: "https://images.pexels.com/photos/3838389/pexels-photo-3838389.jpeg",
    purpose: "Tone arms without equipment.",
    exercises: [
      "2 × 15 arm circles",
      "2 × 12 dips",
      "2 × 12 curls",
    ],
  },
  {
    id: 12,
    level: 2,
    name: "Upper Body Strength",
    target: "Arms",
    duration: 14,
    goal: "Strength",
    image: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg",
    purpose: "More muscle activation.",
    exercises: [
      "3 × 12 dips",
      "3 × 15 curls",
      "2 × 25s shoulder taps",
    ],
  },
  {
    id: 13,
    level: 1,
    name: "Full-Body Stretch",
    target: "Mobility",
    duration: 8,
    goal: "Flexibility",
    image: "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg",
    purpose: "Reduce stiffness.",
    exercises: [
      "30s hamstring stretch",
      "30s hip stretch",
      "45s child pose",
    ],
  },
  {
    id: 14,
    level: 2,
    name: "Deep Mobility Flow",
    target: "Mobility",
    duration: 12,
    goal: "Flexibility",
    image: "https://images.pexels.com/photos/4324024/pexels-photo-4324024.jpeg",
    purpose: "Improve range of motion.",
    exercises: [
      "45s hamstrings",
      "45s hips",
      "45s back stretch",
      "45s breathing",
    ],
  },
];

function getExercisesForPlan(plan) {
  
  const level = localStorage.getItem("fitnessLevel") || "Beginner";
  const rules = exerciseRules[level];

  if (!rules) return plan.exercises;

  switch (plan.target) {

    case "Legs":
      return [
        `${rules.squat} Squats`,
        `${Math.floor(rules.squat / 2)} Lunges each leg`,
        `${rules.wallSit}s Wall Sit`,
      ];

    case "Chest":
      return [
        `${rules.pushup} Push-ups`,
        `${rules.plank}s Plank`,
      ];

    case "Abs":
      return [
        `${Math.floor(rules.squat / 2)} Crunches`,
        `${rules.plank}s Plank`,
      ];

    case "Arms":
      return [
        `${rules.pushup} Arm dips`,
        `${Math.floor(rules.pushup / 2)} Shoulder raises`,
      ];

    case "Glutes":
      return [
        `${rules.squat} Glute bridges`,
        `${Math.floor(rules.squat / 2)} Kickbacks each leg`,
      ];

    case "Cardio":
      return [
        `${level === "Beginner" ? "5" : level === "Intermediate" ? "10" : "15"} min Jog`,
        `${rules.squat} Jumping Jacks`,
      ];

    default:
      return plan.exercises;
  }
}


/* =========================
   COMPONENT
========================= */
export default function AIFitnessBot() {
  const navigate = useNavigate();

  // ✅ هون المكان الصح
  const [feeling, setFeeling] = useState("");
  const [muscle, setMuscle] = useState("");

  const [level, setLevel] = useState(
    localStorage.getItem("fitnessLevel") || "Beginner"
  );

  const [selectedPlan, setSelectedPlan] = useState(null);

  const rules = exerciseRules[level];
  const userLevel = levelMap[level] || 1;

  const filteredPlans = plansData.filter(
    (plan) => plan.level <= userLevel
  );

  useEffect(() => {
    const storedLevel = localStorage.getItem("fitnessLevel") || "Beginner";
    setLevel(storedLevel);
  }, []);


  return (
    <>
      <Navbar />

      <div
        className="min-h-screen flex flex-col"
        style={{ background: "var(--bg)", color: "var(--text-main)" }}
      >
        <main className="pt-28 px-6 pb-16 max-w-6xl mx-auto space-y-12">
  {/* ===== AI FIRST ===== */}
  <div className="bg-[var(--card-bg)] border border-[var(--primary-soft)] rounded-2xl p-8 shadow-lg">
    <h2 className="text-3xl font-bold mb-2 text-[var(--primary)]">
      🤖 Your AI Trainer
    </h2>

    <p className="text-sm mb-6 text-[var(--text-sub)]">
      Tell me how you feel today and what you want to train – I’ll build the perfect workout for you.
    </p>

    <WorkoutPreferences
      feeling={feeling}
      setFeeling={setFeeling}
      muscle={muscle}
      setMuscle={setMuscle}
    />

    <button
      onClick={() => {
        if (!feeling || !muscle) {
          alert("Choose how you feel today, and the type of exercise 💪");
          return;
        }
        navigate(`/ai-trainer?feeling=${feeling}&muscle=${muscle}`);
      }}
      className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow hover:scale-105 transition"
    >
      Generate My AI Workout 🤖
    </button>
  </div>

  {/* ===== EXTRA PLANS ===== */}
  <div>
    <h3 className="text-2xl font-bold mb-4 text-[var(--secondary)]">
      Prefer ready-made plans? (Optional)
    </h3>

    <p className="text-sm mb-6 text-[var(--text-sub)]">
      You can also choose from these pre-built workouts.
    </p>

    <div className="grid md:grid-cols-3 gap-6">
      {filteredPlans.map((p) => (
        <div
          key={p.id}
          className="plan-card bg-[var(--card-bg)] border border-[var(--primary-soft)] rounded-xl p-6 shadow-lg hover:scale-[1.02] transition"
        >
          <img
            src={p.image}
            className="w-full h-40 object-cover rounded-lg mb-3"
          />

          <h3
            className="text-xl font-bold mb-1"
            style={{ color: "var(--secondary)" }}
          >
            {p.name}
          </h3>

          <p className="text-[var(--text-sub)] text-sm mb-2">
            Goal: <b>{p.goal}</b> • Duration: <b>{p.duration} min</b>
          </p>

          <p className="text-[var(--text-sub)] text-sm mb-4">
            {p.purpose}
          </p>

          <button
            className="auth-btn w-full text-sm"
            onClick={() => setSelectedPlan(p)}
          >
            Choose Plan
          </button>
        </div>
      ))}
    </div>
  </div>
</main>

      </div>

      {selectedPlan && (
  <div className="modal-bg">
    <div className="modal-content">
      <h3 className="text-2xl font-bold mb-2">
        {selectedPlan.name}
      </h3>

      <img
        src={selectedPlan.image}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      <p className="text-[var(--text-sub)] mb-4 text-sm">
        Goal: {selectedPlan.goal} — Duration:{" "}
        {selectedPlan.duration} min
        <br />
        <br />
        {selectedPlan.purpose}
      </p>

      {/* ✅ الشدّة حسب المستوى */}
      <p className="text-sm mb-3 text-[var(--primary)] font-semibold">
        Intensity adjusted for {level} level
      </p>

      <ul className="list-disc ml-6 mb-6">
  {getExercisesForPlan(selectedPlan).map((ex, i) => (
    <li key={i}>{ex}</li>
  ))}
</ul>


      <div className="flex justify-end gap-4">
        <button
          onClick={() => setSelectedPlan(null)}
          className="px-5 py-2 rounded-lg bg-gray-600 text-white"
        >
          Cancel
        </button>

        <button
          className="px-5 py-2 rounded-lg bg-[var(--primary)] text-black font-semibold"
          onClick={() => {
  const exList = getExercisesForPlan(selectedPlan)
    .map((s) => s.replaceAll("|", "/"))
    .join("|");

  //const estimatedCalories = selectedPlan.duration * 15; // تقدير بسيط
 const weight = Number(localStorage.getItem("weight")) || 60; // وزن المستخدم أو افتراضي
const met = PLAN_MET_MAP[selectedPlan.target] || 4;

const estimatedCalories = Math.round(
  met * weight * (selectedPlan.duration / 60)
);

  window.location.href =
    `/workout?duration=${selectedPlan.duration}` +
    `&name=${encodeURIComponent(selectedPlan.name)}` +
    `&ex=${encodeURIComponent(exList)}` +
    `&cal=${estimatedCalories}` +
    `&music=1`;
}}

        >
          Start Now
        </button>
      </div>
    </div>
  </div>
)}
      <Footer />
    </>
  );
}