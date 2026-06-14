import { useState } from "react";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import SignUp from "./SignUp";
import ResetPassword from "./ResetPassword";
import Dashboard from "./Dashboard";

// ─── Simple in-memory router ───────────────────────────────────────────────
// pages: "login" | "forgot" | "signup" | "reset" | "dashboard"

const App = () => {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  const goto = (p) => setPage(p);

  // const handleLoginSuccess = (userData) => {
  //   setUser(userData);
  //   setPage("dashboard");
  // };

  const handleLogout = () => {
    setUser(null);
    setPage("login");
  };

  return (
    <>
      {page === "login" && (
        <Login
          onForgotPassword={() => goto("forgot")}
          onSignUp={() => goto("signup")}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {page === "forgot" && (
        <ForgotPassword
          onBackToLogin={() => goto("login")}
          onGoToReset={() => goto("reset")}
        />
      )}

      {page === "signup" && (
        <SignUp
          onBackToLogin={() => goto("login")}
        />
      )}

      {page === "reset" && (
        <ResetPassword
          onBackToLogin={() => goto("login")}
        />
      )}

      {page === "dashboard" && (
        <Dashboard
          user={user}
          onLogout={handleLogout}
        />
      )}
    </>
  );
};

export default App;