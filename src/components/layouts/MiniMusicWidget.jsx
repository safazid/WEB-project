import { useState, useRef } from "react";
/**
 * MiniMusicWidget
 * ----------------
 * A floating mini music player that allows users to:
 * - Search for audio tracks from the Internet Archive API.
 * - Display a small list of results.
 * - Play MP3 tracks directly inside the app.
 * - Toggle the visibility of search results while listening.
 *
 * This widget is designed to be lightweight, non-intrusive,
 * and always accessible during app usage.
 */
export default function MiniMusicWidget() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [showResults, setShowResults] = useState(true);

  const audioRef = useRef(null);
 /**
   * handleSearch
   * Sends a search request to the Internet Archive API
   * and retrieves up to 6 audio items by title.
   */
  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch(
        `https://archive.org/advancedsearch.php?q=title:("${encodeURIComponent(
          query
        )}")+AND+mediatype:(audio)&fl[]=identifier,title,creator&rows=6&page=1&output=json`
      );

      const data = await res.json();
      const docs = data.response?.docs || [];

      docs.length === 0 ? setError("No results 🎧") : setResults(docs);
      setShowResults(true);
    } catch {
      setError("Fetch failed ❌");
    }

    setLoading(false);
  }
  /**
   * playTrack
   * Fetches metadata for the selected item,
   * finds an MP3 file, builds its URL,
   * and starts playback in the audio player.
   */
  async function playTrack(item) {
    try {
      const metaRes = await fetch(`https://archive.org/metadata/${item.identifier}`);
      const meta = await metaRes.json();

      const mp3 = meta.files?.find(f => f.name?.toLowerCase().endsWith(".mp3"));
      if (!mp3) return alert("No MP3 ❌");

      const url = `https://archive.org/download/${item.identifier}/${mp3.name}`;

      setCurrent(url);
      setCurrentTitle(item.title || "Unknown");
      setShowResults(false);

      requestAnimationFrame(() => {
        audioRef.current?.load();
        audioRef.current?.play();
      });
    } catch {
      alert("Play failed ❌");
    }
  }

  return (
    <div
      className="fixed top-24 right-3 z-50 p-3 rounded-2xl shadow-xl 
                 w-[280px] max-w-[92vw] transition-all duration-300 ease-out"
      style={{
        background: "var(--card-bg)",
        color: "var(--text-sub)", // 👈 رمادي بدل أبيض
        border: "2px solid var(--primary)",
      }}
    >
      {/* SEARCH */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-2">
        <input
          className="flex-1 px-3 py-2 rounded text-xs outline-none"
          style={{ background: "var(--bg)", color: "var(--text-sub)" }}
          placeholder="Search music..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button className="auth-btn px-4 py-2 text-xs rounded-lg">
          Go
        </button>
      </form>

      {loading && <p className="text-xs opacity-60">Loading...</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}

      {/* RESULTS */}
      {showResults && (
        <div className="grid grid-cols-2 gap-2 max-h-32 overflow-auto mb-2 pr-1">
          {results.map(item => (
            <div
              key={item.identifier}
              className="p-2 rounded-lg transition hover:scale-[1.03]"
              style={{
                background: "color-mix(in srgb, var(--primary) 18%, transparent)",
                border: "1px solid var(--primary-soft)",
              }}
            >
              <p className="text-[11px] font-semibold line-clamp-2">
                {item.title}
              </p>

              <button
                onClick={() => playTrack(item)}
                className="text-[11px] mt-1 font-semibold"
                style={{ color: "var(--primary)" }}
              >
                ▶ Play
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🎧 MINI PLAYER */}
      {current && (
        <div
          className="mt-2 p-2 rounded-lg"
          style={{
            background: "color-mix(in srgb, var(--primary) 22%, transparent)",
            border: "1px solid var(--primary-soft)",
          }}
        >
          <p className="text-[11px] mb-1 truncate font-semibold">
            {currentTitle}
          </p>

<audio
  ref={audioRef}
  controls
  src={current}
  className="w-full h-8 rounded-lg transition-all"
  style={{
    filter: "var(--audio-filter)",
  }}
/>


          <button
            onClick={() => setShowResults(v => !v)}
            className="text-[11px] mt-1 font-semibold"
            style={{ color: "var(--primary)" }}
          >
            {showResults ? "Hide search" : "Show search"}
          </button>
        </div>
      )}
    </div>
  );
}
