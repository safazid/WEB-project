/*
  ChallengesTabs
  ---------------
  Tab switcher for the Challenges page.

  Responsibilities:
  - Display "Daily" and "Weekly" tabs
  - Highlight the active tab visually
  - Notify parent component when the user switches tabs

  Props:
  - activeTab: "daily" | "weekly"
  - setActiveTab: function to update the active tab
*/
export default function ChallengesTabs({ activeTab, setActiveTab }) {
  
  // Style for the currently active tab
  const activeStyle = {
    background: "#4EE4C2",
    color: "black",
  };

  // Style for inactive tabs
  const inactiveStyle = {
    background: "transparent",
    color: "inherit", 
  };

  return (
    <div
      className="flex w-80 mb-10 rounded-2xl overflow-hidden transition"
      style={{
        background: "var(--card-bg)",
        border: "1px solid rgba(11,138,140,0.35)",
      }}
    >
      {/* DAILY */}
      <button
        onClick={() => setActiveTab("daily")}
        className="flex-1 py-3 font-semibold transition-all"
        style={activeTab === "daily" ? activeStyle : inactiveStyle}
      >
        Daily
      </button>

      {/* WEEKLY */}
      <button
        onClick={() => setActiveTab("weekly")}
        className="flex-1 py-3 font-semibold transition-all"
        style={activeTab === "weekly" ? activeStyle : inactiveStyle}
      >
        Weekly
      </button>
    </div>
  );
}
