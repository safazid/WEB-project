/*export async function askAI(prompt) {
  const API_URL =
    import.meta.env.PROD
      ? "/api/ai"
      : "http://localhost:3001/api/ai";

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();
  return data.raw;
}

*/
export async function askAI(prompt) {
  const API_URL = import.meta.env.PROD
    ? "/api/ai"                    // في Vercel
    : "http://localhost:3001/api/ai"; // محليًا

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();
  return data.raw;
}


