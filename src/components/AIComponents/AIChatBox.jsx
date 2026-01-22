import { useState } from "react";
import { askAI } from "../../services/aiService";

/*
  AIChatBox
  -----------
  A simple chat interface that allows the user to talk with an AI fitness coach.
  It keeps a conversation history and sends user questions to the AI service.
*/
export default function AIChatBox({ context }) {
  // Stores all chat messages (user + assistant)
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm your AI Coach. Ask me anything 💪" },
  ]);

    // Current input value
  const [input, setInput] = useState("");

    // Indicates whether a request is in progress
  const [loading, setLoading] = useState(false);

   /*
    Sends the user's message to the AI service.
    - Prevents sending empty messages
    - Adds the user message to the chat
    - Builds a prompt for the AI
    - Handles and cleans the AI response
  */
  const send = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

   // Build the AI prompt with clear rules and context
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
     // Call the AI service
      const raw = await askAI(prompt);

      // Remove code block markers if they exist
      let clean = raw.replace(/```/g, "").trim();

      // If the response looks like JSON, try to extract "message"
      if (clean.startsWith("{") && clean.endsWith("}")) {
        try {
          const obj = JSON.parse(clean);
          if (obj.message) {
            clean = obj.message;
          }
        } catch (e) {}
      }

      // Add assistant reply to the chat
      setMessages((m) => [...m, { role: "assistant", text: clean }]);
    } catch (e) {
     // Fallback message on error
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