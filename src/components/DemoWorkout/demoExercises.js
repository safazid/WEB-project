// demoExercises defines the demo workout plans for the FitRise demo flow.
// The exercises are grouped by goal (weight, strength, active)
// and by difficulty level (easy, medium, hard).
// Each exercise contains a name and a duration in seconds.
// This structure allows the demo to dynamically build a workout
// based on the user’s selected goal and level.
export const demoExercises = {
  weight: {
    easy: [
      { name: "March in place", duration: 20 },
      { name: "Bodyweight Squats", duration: 20 },
    ],
    medium: [
      { name: "Jumping Jacks", duration: 25 },
      { name: "Squats", duration: 25 },
    ],
    hard: [
      { name: "High Knees", duration: 30 },
      { name: "Jump Squats", duration: 30 },
    ],
  },

  strength: {
    easy: [
      { name: "Wall Push-ups", duration: 20 },
      { name: "Squats", duration: 20 },
    ],
    medium: [
      { name: "Push-ups", duration: 5 },
      { name: "Lunges", duration: 5 },
    ],
    hard: [
      { name: "Dumbbell Lunges", duration: 30 },
      { name: "Plank Hold", duration: 40 },
    ],
  },

  active: {
    easy: [
      { name: "Child’s Pose Stretch", duration: 20 },
      { name: "March in place", duration: 20 },
    ],
    medium: [
      { name: "Jumping Jacks", duration: 25 },
      { name: "bulgarian", duration: 25 },
    ],
    hard: [
      { name: "Burpees", duration: 30 },
      { name: "Mountain Climbers", duration: 30 },
    ],
  },
};