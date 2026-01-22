// Sends a prompt to the AI backend and returns the raw response.
// Uses a relative API path in production (Vercel) and a local server in development.

export async function askAI(prompt) {
  const API_URL = import.meta.env.PROD
    ? "/api/ai"                    // Production (Vercel)
    : "http://localhost:3001/api/ai"; // Local development

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();
  return data.raw;
}