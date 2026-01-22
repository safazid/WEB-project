// Estimate how many calories are burned for a single exercise,
// based on its name, intensity, and the user's weight.
export function estimateBurnedForExercise(ex, userWeight = 60) {
  const name = ex.name?.toLowerCase() || "";
  const intensity = ex.intensity || "low";

  // Base calories by intensity level
  let base =
    intensity === "medium" ? 18 :
    intensity === "high"   ? 25 :
                              12; // low

  // Adjust based on exercise type
  if (name.includes("squat")) base += 12;
  if (name.includes("plank")) base += 8;
  if (name.includes("jump") || name.includes("march")) base += 10;
  if (name.includes("bridge")) base += 6;
  if (name.includes("stretch") || name.includes("neck")) base -= 4;

    // Scale by user weight (60kg is the neutral baseline)
  const weightFactor = 1 + (userWeight - 60) / 120;

  const burned = Math.round(base * weightFactor);
  
  // Keep result in a realistic range
  return Math.max(10, Math.min(burned, 60));
}