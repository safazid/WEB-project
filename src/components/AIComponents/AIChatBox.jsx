import { useState } from "react";
import { askAI } from "../../services/aiService";

export default function AIChatBox({ context }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm your AI Coach. Ask me anything 💪" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    const prompt = `
You are a friendly and professional AI fitness coach.

User context:
${context}

The user asks:
"${input}"

Rules:
- Answer in natural human language.
- Be concise, supportive, and clear.
- You MAY use emojis when helpful (💪🔥🥗).
- If it helps, you may include:
  - A YouTube link for an exercise demo
  - An image URL for food or posture
- Do NOT return JSON.
- Do NOT generate a full workout unless explicitly asked.
- Never give dangerous or medical advice.
- Keep answers readable and friendly.
`;

    try {
      const raw = await askAI(prompt);
      let clean = raw.replace(/```/g, "").trim();

      // لو الرد JSON – استخرج message فقط
      if (clean.startsWith("{") && clean.endsWith("}")) {
        try {
          const obj = JSON.parse(clean);
          if (obj.message) {
            clean = obj.message;
          }
        } catch (e) {}
      }

      setMessages((m) => [...m, { role: "assistant", text: clean }]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "Sorry, I had a problem answering that." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="rounded-2xl shadow p-4 space-y-3 ai-chat-box">
      <h3 className="font-bold text-lg">AI Coach Chat</h3>

      <div className="h-64 overflow-y-auto space-y-2 border rounded-lg p-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg text-sm ${
              m.role === "user"
                ? "bg-emerald-100 text-right"
                : "bg-gray-100 text-left"
            }`}
          >
            {m.text.split("\n").map((line, j) => (
              <div key={j}>
                {line.match(/https?:\/\/\S+/) ? (
                  <a
                    href={line}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 underline"
                  >
                    {line}
                  </a>
                ) : (
                  line
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
          placeholder="Ask your AI coach..."
        />
        <button
          onClick={send}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-emerald-500 text-white"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}