import { useState } from "react";
import AIChatBox from "../AIComponents/AIChatBox";

// ChatBubble renders a floating AI chat button on the screen.
// Clicking the bubble toggles a small chat window with the AI assistant.
// It stays fixed in the corner and can be opened or closed at any time.
export default function ChatBubble({ context }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Bubble Button */}
      <div
  onClick={() => setOpen((o) => !o)}
  className="fixed bottom-6 right-6 z-50 cursor-pointer
             px-5 py-3 rounded-full text-black
             shadow-xl flex items-center gap-2
             transition-all btn-animate"
  style={{
    background: "var(--primary)",
    boxShadow: "0 0 18px var(--primary-soft)",
  }}
  onMouseEnter={(e) =>
    (e.currentTarget.style.filter = "brightness(0.95)")
  }
  onMouseLeave={(e) =>
    (e.currentTarget.style.filter = "brightness(1)")
  }
>
  <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
  💬 Chat with AI
</div>


      {/* Floating Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-[360px] max-h-[520px] z-50">
          <AIChatBox context={context} />
        </div>
      )}
    </>
  );
}
