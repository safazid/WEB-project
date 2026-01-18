const MET_MAP = {
  low: 3,
  medium: 5,
  high: 8,
};

export function calculateCalories(workout = [], weight = 60) {
    
  let total = 0;

  workout.forEach(ex => {
    const met = MET_MAP[ex.intensity] || 4;
    const minutes = ex.duration || 5;
    total += met * weight * (minutes / 60);
  });

  return Math.round(total);
}
