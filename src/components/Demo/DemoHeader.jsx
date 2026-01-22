export default function DemoHeader() {
  return (
    <div
      className="rounded-xl px-6 py-4 text-sm font-semibold"
      style={{
        background: "rgba(255,255,255,0.7)",
        border: "1px solid var(--primary-soft)",
        color: "var(--text-sub)",
      }}
    >
     {/* Short intro message shown at the top of the demo dashboard */}
      {/* Explains that this is a preview of the full AI-powered experience */}
A quick preview of your fitness journey with AI-powered guidance
    </div>
  );
}