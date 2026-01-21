export function estimateBurnedForExercise(ex, userWeight = 60) {
  const name = ex.name?.toLowerCase() || "";
  const intensity = ex.intensity || "low";

  // قيم أساس حسب الشدة
  let base =
    intensity === "medium" ? 18 :
    intensity === "high"   ? 25 :
                              12; // low

  // تعزيز حسب نوع التمرين
  if (name.includes("squat")) base += 12;
  if (name.includes("plank")) base += 8;
  if (name.includes("jump") || name.includes("march")) base += 10;
  if (name.includes("bridge")) base += 6;
  if (name.includes("stretch") || name.includes("neck")) base -= 4;

  // تأثير الوزن (كل 10 كغ ≈ +8%)
  const weightFactor = 1 + (userWeight - 60) / 120;

  const burned = Math.round(base * weightFactor);

  // حد أدنى وحد أعلى منطقي
  return Math.max(10, Math.min(burned, 60));
}
