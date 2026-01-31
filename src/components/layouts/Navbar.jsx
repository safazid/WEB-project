import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ThemeToggle from "../layouts/ThemeToggle";
import logo from "../../assets/YOUR_LOGO.png";
import { Bell } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import MiniMusicWidget from "../layouts/MiniMusicWidget";
import OnlineStatus from "../layouts/OnlineStatus";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // ==============================
  // UI STATES
  // ==============================
  const [open, setOpen] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // ==============================
  // USER STATES
  // ==============================
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("userId")
  );

  const [dailyStats, setDailyStats] = useState({});
  const [currentStreak, setCurrentStreak] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [hasNotification, setHasNotification] = useState(false);

  const isProfilePage = location.pathname === "/profile";

  // ==============================
  // INIT DAILY STATS
  // ==============================
  useEffect(() => {
    const stats = JSON.parse(localStorage.getItem("dailyStats")) || {};
    setDailyStats(stats);
  }, []);

  // ==============================
  // LOGIN STATE TRACKING
  // ==============================
  useEffect(() => {
    const updateLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("userId"));
    };

    updateLogin();
    window.addEventListener("storage", updateLogin);

    return () => window.removeEventListener("storage", updateLogin);
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("userId"));
  }, [location.pathname]);

  // ==============================
  // LOGOUT
  // ==============================
  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("lastWorkoutDate");

    setIsLoggedIn(false);
    setShowMusic(false);
    setShowNotifications(false);
    setOpen(false);

    navigate("/", { replace: true });
  };

  // ==============================
  // NAV TO SECTION
  // ==============================
  const goToSection = (id) => {
    setOpen(false);
    navigate("/");

    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  // ==============================
  // FIRESTORE FETCH USER DATA
  // ==============================
  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      const data = snap.data() || {};

      setDailyStats(data.dailyStats || {});
      setCurrentStreak(data.currentStreak || 0);
    };

    fetchUser();
  }, [location.pathname]);

  // ==============================
  // DAILY NOTIFICATION CHECK
  // ==============================
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setNotifications([]);
      setHasNotification(false);
      return;
    }

    const lastWorkout = localStorage.getItem(`lastWorkoutDate_${userId}`);

    if (!lastWorkout || lastWorkout !== today) {
      setNotifications([
        { id: 1, text: "You haven't completed today's workout yet 💪" },
      ]);
      setHasNotification(true);
    } else {
      setNotifications([]);
      setHasNotification(false);
    }
  }, [location.pathname, isLoggedIn]);

  useEffect(() => {
  const socket = new WebSocket("ws://localhost:8080");

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "NOTIFICATION") {
      setNotifications((prev) => [...prev, data.payload]);
      setHasNotification(true);
    }
  };

  return () => socket.close();
}, []);

  // ==============================
  // JSX RENDER
  // ==============================
  return (
    <>
      {/* ===================== NAVBAR ===================== */}
      <nav
        className="fixed top-0 left-0 w-full z-50 border-b"
        style={{ background: "var(--bg)", borderColor: "var(--primary-soft)" }}
      >
        <div className="w-full px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => goToSection("home")}
          >
            <img src={logo} className="w-10 h-10 rounded-full" />
            <span className="logo-text text-2xl font-bold text-[var(--primary)]">
              FitRise
            </span>
          </div>

          {/* ===================== GUEST NAV ===================== */}
          {!isLoggedIn && (
            <div className="hidden md:flex gap-10 font-medium text-[var(--primary)]">
              <button onClick={() => goToSection("home")} className="nav-link">Home</button>
              <button onClick={() => goToSection("features")} className="nav-link">Features</button>
              <button onClick={() => goToSection("about")} className="nav-link">About</button>
              <button onClick={() => goToSection("reviews")} className="nav-link">Reviews</button>
              <button onClick={() => goToSection("coach")} className="nav-link">AI Coach</button>
            </div>
          )}

          {/* ===================== RIGHT SIDE ===================== */}
          <div className="hidden md:flex gap-4 items-center">
          <OnlineStatus />
            <ThemeToggle />

            {/* NOTIFICATIONS */}
            {isLoggedIn && (
              <div className="relative">
                <button onClick={() => setShowNotifications((v) => !v)}>
                  <Bell
                    size={22}
                    className={`transition ${
                      hasNotification
                        ? "text-yellow-400 animate-pulse"
                        : "text-gray-400"
                    }`}
                  />
                  {hasNotification && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
                  )}
                </button>

                {showNotifications && (
                  <div
                    className="absolute right-0 mt-3 w-80 shadow-xl rounded-xl p-4 z-50"
                    style={{
                      background: "var(--card-bg)",
                      border: "1px solid var(--primary-soft)",
                    }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-sm">Notifications</h4>
                      <button onClick={() => setShowNotifications(false)}>✕</button>
                    </div>

                    {notifications.length === 0 ? (
                      <p className="text-sm text-gray-400">
                        No new notifications 🎉
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {notifications.map((n) => (
                          <li
                            key={n.id}
                            className="text-sm p-2 rounded-lg"
                            style={{ background: "var(--primary-soft)" }}
                          >
                            {n.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ===================== MUSIC ===================== */}
            {isLoggedIn && (
              <div className="relative">
                <button
                  onClick={() => setShowMusic((v) => !v)}
                  className="login-link text-[var(--primary)] flex gap-1"
                >
                  🎧 Music
                </button>

                {showMusic && (
                  <div className="absolute right-0 mt-3 z-50">
                    <MiniMusicWidget />
                  </div>
                )}
              </div>
            )}

            {/* ===================== PROFILE ===================== */}
            {isLoggedIn && !isProfilePage && (
              <button
                onClick={() => navigate("/profile")}
                className="login-link text-[var(--primary)]"
              >
                Profile
              </button>
            )}

            {/* ===================== AUTH ===================== */}
            {isLoggedIn ? (
              <button onClick={logout} className="register-btn">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="login-link">Login</Link>
                <Link to="/login#register" className="register-btn">Register</Link>
              </>
            )}
          </div>

          {/* ===================== MOBILE MENU BUTTON ===================== */}
          <button className="md:hidden text-2xl" onClick={() => setOpen(true)}>
            ☰
          </button>
        </div>
      </nav>

      {/* ===================== MOBILE DRAWER ===================== */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)}>
          <div
            className="absolute top-0 right-0 h-full w-[85%] max-w-sm
                       flex flex-col px-6 py-6 shadow-2xl"
            style={{ background: "var(--bg)", color: "var(--primary)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="flex justify-between mb-8">
              <span className="text-xl font-bold">FitRise</span>
              <button onClick={() => setOpen(false)} className="text-2xl">✕</button>
            </div>

            <div className="mb-6 flex justify-center">
              <ThemeToggle />
            </div>

            {/* GUEST LINKS */}
            {!isLoggedIn && (
              <div className="flex flex-col gap-5 font-semibold">
                <button onClick={() => goToSection("home")}>Home</button>
                <button onClick={() => goToSection("features")}>Features</button>
                <button onClick={() => goToSection("about")}>About</button>
                <button onClick={() => goToSection("reviews")}>Reviews</button>
                <button onClick={() => goToSection("coach")}>AI Coach</button>
              </div>
            )}

            <hr className="my-6 border-[var(--primary-soft)]" />

            {/* LOGGED IN */}
            {isLoggedIn ? (
              <div className="flex flex-col gap-4 font-semibold">

                {/* MUSIC */}
                {!isProfilePage && (
                  <div className="flex items-center ">
<button
  onClick={() => setShowMusic((v) => !v)}
  className="flex items-center justify-center gap-2 text-[var(--primary)] font-semibold hover:opacity-80 transition w-full text-center"
>
🎧 Music
</button>


                    {showMusic && (
                      <div className="mt-3">
                        <MiniMusicWidget />
                      </div>
                    )}
                  </div>
                )}

                {/* PROFILE */}
                {!isProfilePage && (
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setOpen(false);
                    }}
                  >
                      Profile
                  </button>
                )}

                {/* LOGOUT */}
                <button onClick={logout} className="register-btn mt-auto">
                  Logout
                </button>

              </div>
            ) : (
              <div className="flex flex-col gap-4 font-semibold text-center">
                <Link to="/login" onClick={() => setOpen(false)}>
                  Login
                </Link>
                <Link to="/login#register" onClick={() => setOpen(false)} className="register-btn">
                  Register
                </Link>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
