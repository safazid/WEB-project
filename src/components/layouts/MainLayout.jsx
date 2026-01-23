import { Outlet } from "react-router-dom";
import Header from "./Navbar";
// MainLayout wraps all pages with a shared structure.
// It renders the fixed Header and a main container where
// each routed page appears using <Outlet />.
// This keeps the layout consistent across the entire app.
export default function MainLayout() {
  const isLoggedIn = !!localStorage.getItem("userId");

  return (
    <>
      <Header />

      <main
        style={{
          background: "var(--bg)",
          minHeight: "100vh",
          paddingTop: "90px",
        }}
      >
        <Outlet />
      </main>

    </>
  );
}
