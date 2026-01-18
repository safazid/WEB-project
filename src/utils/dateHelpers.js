export function getISOWeekKey(date = new Date()) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);

  // ISO week starts Monday
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));

  const firstThursday = new Date(d.getFullYear(), 0, 4);
  firstThursday.setDate(
    firstThursday.getDate() + 3 - ((firstThursday.getDay() + 6) % 7)
  );

  const week =
    1 +
    Math.round(
      (d - firstThursday) / (7 * 24 * 60 * 60 * 1000)
    );

  return `${d.getFullYear()}-W${week}`;
}
