import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login as authLogin } from "../../services/authService";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [focused, setFocused] = useState(null);
  const [btnHover, setBtnHover] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await authLogin(username, password);
      login({ user: res.data.user, token: res.data.token });
      toast.success(`Welcome, ${res.data.user.name}!`);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  const wrap = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fde8dc 0%, #f5c0a0 30%, #e89070 65%, #d4623a 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
    position: "relative",
    overflow: "hidden",
    padding: "1rem",
  };

  const card = {
    width: "100%",
    maxWidth: "370px",
    position: "relative",
    zIndex: 1,
    borderRadius: "24px",
    padding: "2rem 1.75rem",
    background: "linear-gradient(160deg, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.22) 100%)",
    border: "1.5px solid rgba(255,255,255,0.75)",
    boxShadow: "0 2px 0 0 rgba(255,255,255,0.9) inset, 0 40px 80px rgba(140,45,10,0.30), 0 16px 40px rgba(160,55,20,0.20)",
    backdropFilter: "blur(32px)",
    WebkitBackdropFilter: "blur(32px)",
    boxSizing: "border-box",
  };

  const inputStyle = (key) => ({
    width: "100%",
    height: "44px",
    padding: "0 14px 0 40px",
    border: focused === key ? "1.5px solid rgba(192,98,58,0.8)" : "1.5px solid rgba(255,255,255,0.55)",
    borderRadius: "10px",
    background: focused === key ? "rgba(255,255,255,0.62)" : "rgba(255,255,255,0.38)",
    backdropFilter: "blur(12px)",
    fontSize: "13.5px",
    color: "#3d1208",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    boxSizing: "border-box",
    boxShadow: focused === key
      ? "0 0 0 3px rgba(192,98,58,0.15), inset 0 1px 3px rgba(0,0,0,0.04)"
      : "inset 0 1px 4px rgba(0,0,0,0.06)",
    transition: "all 0.2s ease",
  });

  const iconPos = {
    position: "absolute", left: "12px", top: "50%",
    transform: "translateY(-50%)", fontSize: "15px",
    color: "rgba(150,70,40,0.6)", pointerEvents: "none",
  };

  return (
    <main style={wrap}>
      {/* blobs */}
      {[
        { top: "-80px", left: "-80px", size: "300px", op: 0.12 },
        { bottom: "-90px", right: "-60px", size: "260px", op: 0.09 },
        { top: "38%", right: "5%", size: "120px", op: 0.08 },
        { bottom: "12%", left: "4%", size: "90px", op: 0.10 },
      ].map((b, i) => (
        <div key={i} style={{ position: "absolute", borderRadius: "50%", pointerEvents: "none", background: `rgba(255,255,255,${b.op})`, width: b.size, height: b.size, top: b.top, left: b.left, bottom: b.bottom, right: b.right }} />
      ))}

      <div style={card}>
        {/* shine */}
        <div style={{ position: "absolute", top: 0, left: "12%", right: "12%", height: "1.5px", background: "linear-gradient(to right,transparent,rgba(255,255,255,0.95),transparent)", borderRadius: "50%", pointerEvents: "none" }} />

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "1.4rem" }}>
          <div style={{ width: "52px", height: "52px", background: "linear-gradient(145deg, rgba(255,255,255,0.7), rgba(255,235,215,0.45))", border: "1.5px solid rgba(255,255,255,0.85)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.8rem", boxShadow: "0 4px 18px rgba(160,60,20,0.18), inset 0 1.5px 0 rgba(255,255,255,0.95)" }}>
            <i className="ti ti-building" style={{ fontSize: "24px", color: "#7a3520" }} aria-hidden="true" />
          </div>
          <p style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(100,40,15,0.55)", margin: "0 0 3px" }}>Staff Portal</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "21px", fontWeight: 600, color: "#2d1008", lineHeight: 1.2, margin: "0 0 3px" }}>
            Hotel <span style={{ color: "#a04020" }}>Premier Inn</span>
          </h1>
          <p style={{ fontSize: "11.5px", color: "rgba(80,30,10,0.5)", fontWeight: 300, margin: 0 }}>Restaurant Management Portal</p>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.2rem" }}>
          <div style={{ flex: 1, height: "0.5px", background: "rgba(160,70,30,0.22)" }} />
          <div style={{ width: "4px", height: "4px", background: "rgba(160,70,30,0.4)", transform: "rotate(45deg)" }} />
          <div style={{ flex: 1, height: "0.5px", background: "rgba(160,70,30,0.22)" }} />
        </div>

        <p style={{ fontSize: "12.5px", color: "rgba(80,30,10,0.5)", margin: "0 0 1rem", fontWeight: 300 }}>Sign in to continue</p>

        {/* Error */}
        {error && (
          <div style={{ background: "rgba(200,50,30,0.1)", border: "1px solid rgba(200,50,30,0.25)", borderRadius: "9px", padding: "8px 12px", marginBottom: "0.9rem", display: "flex", alignItems: "center", gap: "7px" }}>
            <i className="ti ti-alert-circle" style={{ fontSize: "14px", color: "#c03020", flexShrink: 0 }} aria-hidden="true" />
            <span style={{ fontSize: "12px", color: "#8a2010" }}>{error}</span>
          </div>
        )}

        {/* Username */}
        <div style={{ marginBottom: "0.8rem" }}>
          <label htmlFor="lg-user" style={{ fontSize: "11.5px", fontWeight: 500, color: "rgba(80,30,10,0.72)", letterSpacing: "0.3px", display: "block", marginBottom: "5px" }}>Username</label>
          <div style={{ position: "relative" }}>
            <i className="ti ti-user" style={iconPos} aria-hidden="true" />
            <input id="lg-user" type="text" placeholder="Enter username" value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setFocused("user")} onBlur={() => setFocused(null)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={inputStyle("user")} />
          </div>
        </div>

        {/* Password */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="lg-pass" style={{ fontSize: "11.5px", fontWeight: 500, color: "rgba(80,30,10,0.72)", letterSpacing: "0.3px", display: "block", marginBottom: "5px" }}>Password</label>
          <div style={{ position: "relative" }}>
            <i className="ti ti-lock" style={iconPos} aria-hidden="true" />
            <input id="lg-pass" type="password" placeholder="Enter password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocused("pass")} onBlur={() => setFocused(null)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={inputStyle("pass")} />
          </div>
        </div>

        {/* Remember + Forgot */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "7px", cursor: "pointer" }}>
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}
              style={{ accentColor: "#c0623a", width: "13px", height: "13px", cursor: "pointer" }} />
            <span style={{ fontSize: "11.5px", color: "rgba(80,30,10,0.6)" }}>Remember me</span>
          </label>
          <button type="button" onClick={() => navigate("/forgot-password")}
            style={{ background: "none", border: "none", color: "#b05030", fontSize: "11.5px", fontWeight: 500, cursor: "pointer", fontFamily: "'Inter', sans-serif", padding: 0 }}>
            Forgot password?
          </button>
        </div>

        {/* Sign In Button */}
        <button type="button" onClick={handleLogin}
          onMouseEnter={() => setBtnHover(true)} onMouseLeave={() => setBtnHover(false)}
          disabled={loading}
          style={{
            width: "100%", height: "44px",
            background: loading ? "rgba(192,98,58,0.6)" : "linear-gradient(135deg, #e8926a 0%, #c0623a 55%, #a04828 100%)",
            border: "none", borderRadius: "10px", fontSize: "13.5px", fontWeight: 500,
            color: "#fff", letterSpacing: "0.4px", cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center",
            justifyContent: "center", gap: "7px",
            boxShadow: btnHover && !loading ? "0 14px 32px rgba(160,60,20,0.5), inset 0 1.5px 0 rgba(255,255,255,0.25)" : "0 8px 24px rgba(160,60,20,0.4), inset 0 1.5px 0 rgba(255,255,255,0.25)",
            transform: btnHover && !loading ? "translateY(-2px)" : "translateY(0)",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}>
          {loading
            ? <><i className="ti ti-loader-2" style={{ animation: "spin 1s linear infinite" }} aria-hidden="true" /> Signing in...</>
            : <><i className="ti ti-arrow-right" aria-hidden="true" /> Sign In</>
          }
        </button>

        {/* Footer */}
        <div style={{ marginTop: "1.1rem", textAlign: "center", paddingTop: "1rem", borderTop: "1px solid rgba(160,70,30,0.12)" }}>
          <p style={{ fontSize: "11px", color: "rgba(100,45,20,0.45)", margin: "0 0 5px" }}>
            New staff member?{" "}
            <button type="button" onClick={() => navigate("/signup")}
              style={{ background: "none", border: "none", color: "#b05030", fontSize: "11px", fontWeight: 500, cursor: "pointer", fontFamily: "'Inter', sans-serif", padding: 0 }}>
              Create account
            </button>
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "10.5px", color: "rgba(100,45,20,0.38)" }}>
            <i className="ti ti-lock" style={{ fontSize: "12px", color: "#b05030" }} aria-hidden="true" />
            SSL encrypted &amp; secure · © 2026 Hotel Premier Inn
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </main>
  );
};

export default Login;
