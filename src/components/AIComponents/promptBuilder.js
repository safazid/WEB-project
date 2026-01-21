import { WORKOUT_LIBRARY } from "./workoutLibrary";

function calculateBMI(weight, heightCm) {
  if (!weight || !heightCm) return null;
  const h = heightCm / 100;
  return (weight / (h * h)).toFixed(1);
}

function mapActivity(activity = "") {
  if (activity.includes("Sedentary")) return "very low";
  if (activity.includes("Lightly")) return "low";
  if (activity.includes("Moderately")) return "medium";
  if (activity.includes("Very")) return "high";
  return "unknown";
}

function analyzeConsistency(completedWeekly = {}, totalWorkouts = 0) {
  const weeklyCount = Object.keys(completedWeekly || {}).length;

  if (weeklyCount >= 4) return "high";
  if (weeklyCount >= 2) return "medium";
  if (totalWorkouts >= 3) return "low";
  return "very low";
}

export function buildPrompt(user, feeling, muscle) {
  const {
    fitness = {},
    totalWorkouts = 0,
    completedWeekly = {},
    name = "User",
    lastExercises = [],
  } = user;

  const {
    goal,
    activity,
    height,
    weight,
    gender,
    pains = [],
  } = fitness;

  const painList = pains.length ? pains.join(", ") : "none";

  const libraryText = WORKOUT_LIBRARY.map(w => ({
    name: w.name,
    muscle: w.muscle,
    intensity: w.intensity,
    avoidFor: w.avoidFor,
    reps: w.reps,
    explanation: w.explanation,
    video: w.video
  }));

  return `
You are a professional personal fitness coach.

User profile:
- Name: ${name}
- Gender: ${gender || "unknown"}
- Goal: ${goal || "not specified"}
- Activity level: ${activity || "unknown"}
- Height: ${height || "?"} cm
- Weight: ${weight || "?"} kg
- Total workouts done: ${totalWorkouts}
- Pain areas: ${painList}

Today's context:
- Feeling today: ${feeling || "normal"}
- Target muscle group: ${muscle || "full"}

Previous exercises:
${lastExercises.length ? lastExercises.join(", ") : "none"}

You are given a fixed workout library below.
You MUST choose exercises ONLY from this list.
You are NOT allowed to invent new exercises.

Workout Library:
${JSON.stringify(libraryText, null, 2)}

Rules:
- Choose EXACTLY 4 exercises (no more, no less).
- Filter by target muscle:
  - If user chose "full" → you may choose from any muscle group.
  - Otherwise → choose only exercises that match the selected muscle.
- Adapt intensity:
  - tired → choose only "low" intensity exercises.
  - normal → choose "low" or "medium".
  - energetic → prefer "medium" and allow one "high" if available.
- NEVER include any exercise whose "avoidFor" intersects with the user's pain areas.
- Do NOT repeat any exercise from the previous list.
- If not enough exercises perfectly match all constraints, relax muscle matching slightly,
  but NEVER break pain safety.
- Always prioritize safety over variety or intensity.


Return ONLY valid JSON in this format:

{
  "message": "string",
  "levelDecision": "increase | keep | decrease",
  "workout": [
    {
      "name": "string",
      "reps": "string",
      "explanation": "string",
      "video": "string"
    }
  ],
  "nutritionTip": "string"
}

The response MUST be pure JSON only.
`;
}
