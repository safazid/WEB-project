// api/ai.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const API_KEY = process.env.OPENROUTER_API_KEY;

  try {
    const { prompt } = req.body;

    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "X-Title": "FitRise AI Coach",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "system",
            content: `
You are a professional fitness coach.
You MUST reply in pure JSON ONLY with this structure:

{
  "message": "string",
  "workout": [
    { "title": "string", "exercises": ["string"] }
  ],
  "nutritionTip": "string",
  "levelDecision": "increase | decrease | stay"
}

JSON ONLY. No text outside JSON.
            `,
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await r.json();

    if (!data.choices || !data.choices.length) {
      return res.status(500).json({
        raw: JSON.stringify({
          message: "AI is temporarily unavailable. Please try again later.",
          workout: [],
          nutritionTip: "Stay hydrated and keep meals balanced.",
          levelDecision: "stay",
        }),
      });
    }

    const text = data.choices[0].message.content.trim();
    res.json({ raw: text });
  } catch (e) {
    console.error("Server AI Error:", e);
    res.status(500).json({
      raw: JSON.stringify({
        message: "AI connection failed. Try again shortly.",
        workout: [],
        nutritionTip: "Drink water and keep your meals light today.",
        levelDecision: "stay",
      }),
    });
  }
}
