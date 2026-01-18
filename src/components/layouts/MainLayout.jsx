import { Outlet } from "react-router-dom";
import Header from "./Navbar";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main
        style={{
          background: "var(--bg)",
          minHeight: "100vh",
          paddingTop: "90px", // for fixed header
        }}
      >
        <Outlet />
      </main>
    </>
  );
}
