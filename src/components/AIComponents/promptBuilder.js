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
    pains = {},
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
  } = fitness;

  const bmi = calculateBMI(weight, height);
  const activityLevel = mapActivity(activity);
  const consistency = analyzeConsistency(completedWeekly, totalWorkouts);

  const painList = Object.keys(pains || {})
    .filter(k => pains[k])
    .join(", ") || "none";

  return `
You are a professional personal fitness coach.

User profile:
- Name: ${name}
- Gender: ${gender || "unknown"}
- Goal: ${goal || "not specified"}
- Activity level: ${activityLevel}
- Height: ${height || "?"} cm
- Weight: ${weight || "?"} kg
- BMI: ${bmi || "unknown"}
- Total workouts done: ${totalWorkouts}
- Weekly consistency: ${consistency}
- Pain areas: ${painList}

Today's context:
- Feeling today: ${feeling || "normal"}
- Target muscle group: ${muscle || "full body"}

Previous exercises given to this user:
${lastExercises.length ? lastExercises.join(", ") : "none"}

IMPORTANT:
- Do NOT repeat any exercise from the previous list.
- Always choose different movements than last time.
- Vary exercises between sessions.
- Adapt difficulty to activity level and feeling.
- If tired → light recovery workout.
- If energetic → more dynamic workout.
- Avoid any exercise that may worsen pain areas.

Return ONLY valid JSON in this format:

{
  "message": "string",
  "levelDecision": "increase | keep | decrease",
  "workout": [
    {
      "name": "string",
      "reps": "string",
      "explanation": "string",
      "video": "https://www.youtube.com/embed/VIDEO_ID"
    }
  ],
  "nutritionTip": "string"
}

The response MUST be pure JSON only.
`;
}
