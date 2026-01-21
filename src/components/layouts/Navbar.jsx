import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ThemeToggle from "../layouts/ThemeToggle";
import logo from "../../assets/YOUR_LOGO.png";
import { Bell } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const [dailyStats, setDailyStats] = useState({});
  const [currentStreak, setCurrentStreak] = useState(0);
  const [hasNotification, setHasNotification] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("userId")
  );

  const isProfilePage = location.pathname === "/profile";

  useEffect(() => {
    const stats = JSON.parse(localStorage.getItem("dailyStats")) || {};
    setDailyStats(stats);
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("userId"));
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("lastWorkoutDate");

    setIsLoggedIn(false);
    navigate("/");
    setOpen(false);
  };

  const goToSection = (id) => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("lastWorkoutDate");

    setIsLoggedIn(false);
    setOpen(false);
    navigate("/");

    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const todayKey = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const fetchNotificationsData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      const data = snap.data() || {};

      setDailyStats(data.dailyStats || {});
      setCurrentStreak(data.currentStreak || 0);
    };

    fetchNotificationsData();
  }, [location.pathname]);

  useEffect(() => {
  const today = new Date().toISOString().split("T")[0];
  const userId = localStorage.getItem("userId");
  if (!userId) return;

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


  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 border-b"
        style={{ background: "var(--bg)", borderColor: "var(--primary-soft)" }}
      >
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => goToSection("home")}
          >
            <img src={logo} className="w-10 h-10 rounded-full" />
            <span className="logo-text text-2xl font-bold">FitRise</span>
          </div>

          {!isLoggedIn && (
            <div className="hidden md:flex gap-10 font-medium">
              <button onClick={() => goToSection("home")} className="nav-link">Home</button>
              <button onClick={() => goToSection("features")} className="nav-link">Features</button>
              <button onClick={() => goToSection("about")} className="nav-link">About</button>
              <button onClick={() => goToSection("reviews")} className="nav-link">Reviews</button>
              <button onClick={() => goToSection("coach")} className="nav-link">AI Coach</button>
            </div>
          )}

          <div className="hidden md:flex gap-4 items-center">
            <ThemeToggle />

            {isLoggedIn && (
              <div className="relative">
                <button
                  className="relative"
                  onClick={() => setShowNotifications((v) => !v)}
                >
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
                  <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-xl p-4 z-50">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-sm">Notifications</h4>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>

                    {notifications.length === 0 ? (
                      <p className="text-sm text-gray-400">No new notifications 🎉</p>
                    ) : (
                      <ul className="space-y-2">
                        {notifications.map((n) => (
                          <li key={n.id} className="text-sm p-2 rounded-lg bg-gray-50">
                            {n.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}

            {isLoggedIn ? (
              <>
                {!isProfilePage && (
                  <button
                    onClick={() => navigate("/profile")}
                    className="login-link text-[var(--primary)]"
                  >
                    Profile
                  </button>
                )}

                <button onClick={logout} className="register-btn mt-auto">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="login-link">Login</Link>
                <Link to="/login#register" className="register-btn">Register</Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute top-0 right-0 h-full w-[85%] max-w-sm
                       flex flex-col px-6 py-6 shadow-2xl
                       text-[var(--primary)]"
            style={{ background: "var(--bg)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-10">
              <span className="text-xl font-bold">FitRise</span>
              <button onClick={() => setOpen(false)} className="text-2xl">✕</button>
            </div>

            <div className="mb-8 flex justify-center">
              <ThemeToggle />
            </div>

            {!isLoggedIn && (
              <div className="flex flex-col gap-6 font-semibold">
                <button onClick={() => goToSection("home")}>Home</button>
                <button onClick={() => goToSection("features")}>Features</button>
                <button onClick={() => goToSection("about")}>About</button>
                <button onClick={() => goToSection("reviews")}>Reviews</button>
                <button onClick={() => goToSection("coach")}>AI Coach</button>
              </div>
            )}

            <hr className="my-8 border-[var(--primary-soft)]" />

            {isLoggedIn ? (
              <div className="flex flex-col gap-4 font-semibold">
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

                <button onClick={logout} className="register-btn mt-auto">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 font-semibold text-center">
                <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
                <Link
                  to="/login#register"
                  onClick={() => setOpen(false)}
                  className="register-btn mt-auto"
                >
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