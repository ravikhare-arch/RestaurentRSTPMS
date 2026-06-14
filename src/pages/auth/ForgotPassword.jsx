import { useState } from "react";

import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  const styles = {
    wrap: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fde8dc 0%, #f5c0a0 30%, #e89070 65%, #d4623a 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', sans-serif",
      position: "relative",
      overflow: "hidden",
      padding: "2rem",
    },
    card: {
      width: "100%",
      maxWidth: "380px",
      position: "relative",
      zIndex: 1,
      borderRadius: "26px",
      padding: "2.25rem 2rem",
      background: "linear-gradient(160deg, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.22) 100%)",
      border: "1.5px solid rgba(255,255,255,0.75)",
      boxShadow: `
        0 2px 0 0 rgba(255,255,255,0.9) inset,
        0 40px 80px rgba(140,45,10,0.30),
        0 16px 40px rgba(160,55,20,0.20),
        0 6px 16px rgba(180,70,30,0.16)
      `,
      backdropFilter: "blur(32px)",
      WebkitBackdropFilter: "blur(32px)",
      transform: "translateY(-4px)",
      boxSizing: "border-box",
    },
    shineTop: {
      position: "absolute",
      top: 0,
      left: "12%",
      right: "12%",
      height: "1.5px",
      background: "linear-gradient(to right, transparent, rgba(255,255,255,0.95), transparent)",
      borderRadius: "50%",
      pointerEvents: "none",
    },
    iconWrap: {
      width: "54px",
      height: "54px",
      background: "linear-gradient(145deg, rgba(255,255,255,0.7) 0%, rgba(255,235,215,0.45) 100%)",
      border: "1.5px solid rgba(255,255,255,0.85)",
      borderRadius: "15px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 0.9rem",
      boxShadow: "0 4px 18px rgba(160,60,20,0.18), inset 0 1.5px 0 rgba(255,255,255,0.95)",
    },
    label: {
      fontSize: "12px",
      fontWeight: 500,
      color: "rgba(80,30,10,0.72)",
      letterSpacing: "0.3px",
      display: "block",
      marginBottom: "6px",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      margin: "1.1rem 0",
    },
    dividerLine: { flex: 1, height: "0.5px", background: "rgba(160,70,30,0.22)" },
    dividerDot: { width: "4px", height: "4px", background: "rgba(160,70,30,0.4)", transform: "rotate(45deg)" },
    footer: {
      marginTop: "1.25rem",
      textAlign: "center",
      paddingTop: "1rem",
      borderTop: "1px solid rgba(160,70,30,0.12)",
    },
  };

  const inputStyle = (isFocused) => ({
    width: "100%",
    height: "44px",
    padding: "0 14px 0 40px",
    border: isFocused ? "1.5px solid rgba(192,98,58,0.8)" : "1.5px solid rgba(255,255,255,0.55)",
    borderRadius: "10px",
    background: isFocused ? "rgba(255,255,255,0.62)" : "rgba(255,255,255,0.38)",
    backdropFilter: "blur(12px)",
    fontSize: "13.5px",
    color: "#3d1208",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    boxSizing: "border-box",
    boxShadow: isFocused
      ? "0 0 0 3px rgba(192,98,58,0.15), inset 0 1px 3px rgba(0,0,0,0.04)"
      : "inset 0 1px 4px rgba(0,0,0,0.06)",
    transition: "all 0.2s ease",
  });

  const btnStyle = (hover) => ({
    width: "100%",
    height: "44px",
    background: loading
      ? "rgba(192,98,58,0.6)"
      : "linear-gradient(135deg, #e8926a 0%, #c0623a 55%, #a04828 100%)",
    border: "none",
    borderRadius: "10px",
    fontSize: "13.5px",
    fontWeight: 500,
    color: "#fff",
    letterSpacing: "0.4px",
    cursor: loading ? "not-allowed" : "pointer",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    boxShadow: hover && !loading
      ? "0 14px 32px rgba(160,60,20,0.5), inset 0 1.5px 0 rgba(255,255,255,0.25)"
      : "0 8px 24px rgba(160,60,20,0.4), inset 0 1.5px 0 rgba(255,255,255,0.25)",
    transform: hover && !loading ? "translateY(-2px)" : "translateY(0)",
    transition: "transform 0.15s, box-shadow 0.15s",
    marginTop: "1rem",
  });

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" rel="stylesheet" />

      <main style={styles.wrap}>
        {/* Background blobs */}
        <div style={{ position: "absolute", borderRadius: "50%", top: "-80px", left: "-80px", width: "300px", height: "300px", background: "rgba(255,255,255,0.12)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", borderRadius: "50%", bottom: "-100px", right: "-60px", width: "280px", height: "280px", background: "rgba(255,255,255,0.09)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", borderRadius: "50%", top: "40%", left: "5%", width: "120px", height: "120px", background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />

        <div style={styles.card}>
          <div style={styles.shineTop} />

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
            <div style={styles.iconWrap}>
              <i className="ti ti-lock-question" style={{ fontSize: "24px", color: "#7a3520" }} aria-hidden="true" />
            </div>
            <p style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(100,40,15,0.55)", margin: "0 0 3px" }}>
              Staff Portal
            </p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "21px", fontWeight: 600, color: "#2d1008", lineHeight: 1.2, margin: "0 0 3px" }}>
              Forgot <span style={{ color: "#a04020" }}>Password?</span>
            </h1>
            <p style={{ fontSize: "12px", color: "rgba(80,30,10,0.5)", fontWeight: 300, margin: 0 }}>
              Hotel Premier Inn · Restaurant Management
            </p>
          </div>

          {/* Divider */}
          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <div style={styles.dividerDot} />
            <div style={styles.dividerLine} />
          </div>

          {!sent ? (
            <>
              <p style={{ fontSize: "12.5px", color: "rgba(80,30,10,0.55)", marginBottom: "1.1rem", fontWeight: 300, lineHeight: 1.6 }}>
                Enter your registered work email and we'll send a 6-digit OTP to reset your password.
              </p>

              {/* Email Field */}
              <div style={{ marginBottom: "0.9rem" }}>
                <label htmlFor="fp-email" style={styles.label}>Work Email</label>
                <div style={{ position: "relative" }}>
                  <i className="ti ti-mail" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "15px", color: "rgba(150,70,40,0.6)", pointerEvents: "none" }} aria-hidden="true" />
                  <input
                    id="fp-email"
                    type="email"
                    placeholder="you@premierinn.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    style={inputStyle(focused)}
                  />
                </div>
              </div>

              <p style={{ fontSize: "11px", color: "rgba(80,30,10,0.45)", marginBottom: "0.5rem", lineHeight: 1.6 }}>
                Check your inbox and spam folder after submitting. The OTP expires in 10 minutes.
              </p>

              <button
                type="button"
                onClick={handleSend}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                style={btnStyle(btnHover)}
              >
                {loading ? (
                  <>
                    <i className="ti ti-loader-2" style={{ animation: "spin 1s linear infinite" }} aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="ti ti-send" aria-hidden="true" />
                    Send Reset Code
                  </>
                )}
              </button>
            </>
          ) : (
            /* Success State */
            <div style={{ textAlign: "center", padding: "0.5rem 0" }}>
              <div style={{
                width: "52px", height: "52px",
                background: "linear-gradient(145deg, rgba(100,200,120,0.3), rgba(80,180,100,0.2))",
                border: "1.5px solid rgba(100,200,120,0.5)",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 0.9rem",
              }}>
                <i className="ti ti-check" style={{ fontSize: "22px", color: "#2d8a4e" }} aria-hidden="true" />
              </div>
              <p style={{ fontSize: "14px", fontWeight: 500, color: "#2d1008", marginBottom: "6px" }}>Code Sent!</p>
              <p style={{ fontSize: "12px", color: "rgba(80,30,10,0.55)", fontWeight: 300, lineHeight: 1.6, marginBottom: "1.1rem" }}>
                A 6-digit OTP has been sent to <strong style={{ color: "#a04020" }}>{email}</strong>. Use it to reset your password.
              </p>
              <button
                type="button"
                onClick={() => navigate('/reset-password')}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                style={btnStyle(btnHover)}
              >
                <i className="ti ti-arrow-right" aria-hidden="true" />
                Enter OTP & Reset Password
              </button>
            </div>
          )}

          {/* Footer */}
          <div style={styles.footer}>
            <p style={{ fontSize: "11.5px", color: "rgba(100,45,20,0.5)", margin: 0 }}>
              Remembered it?{" "}
              <button
                type="button"
                onClick={() => navigate('/login')}
                style={{ background: "none", border: "none", color: "#b05030", fontSize: "11.5px", fontWeight: 500, cursor: "pointer", fontFamily: "'Inter', sans-serif", padding: 0 }}
              >
                Sign in instead
              </button>
            </p>
          </div>
        </div>
      </main>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </>
  );
};

export default ForgotPassword;