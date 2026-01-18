import express from "express";
import cors from "cors";
import fetch from "node-fetch";

import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.OPENROUTER_API_KEY;

const app = express();
app.use(cors());
app.use(express.json());

//const API_KEY = "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";

app.post("/api/ai", async (req, res) => {
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

    // حماية كاملة من أي رد غير متوقع
    if (!data.choices || !data.choices.length) {
      console.error("AI Error Response:", data);
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
});

app.listen(3001, () => {
  console.log("AI Server running on http://localhost:3001");
});
