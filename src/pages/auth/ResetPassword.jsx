import { useState, useRef } from "react";

import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [focused, setFocused] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [done, setDone] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const otpRefs = useRef([]);

  const handleOtp = (val, idx) => {
    const clean = val.replace(/\D/, "").slice(-1);
    const next = [...otp];
    next[idx] = clean;
    setOtp(next);
    if (clean && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKey = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && idx > 0) otpRefs.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      otpRefs.current[5]?.focus();
      e.preventDefault();
    }
  };

  const handleResend = () => {
    setResendCooldown(30);
    const t = setInterval(() => {
      setResendCooldown((c) => {
        if (c <= 1) { clearInterval(t); return 0; }
        return c - 1;
      });
    }, 1000);
  };

  const strength = (v) => {
    let s = 0;
    if (v.length >= 8) s++;
    if (/[A-Z]/.test(v)) s++;
    if (/[0-9]/.test(v)) s++;
    if (/[^A-Za-z0-9]/.test(v)) s++;
    return s;
  };

  const strengthColor = ["#e0c5b5", "#e87a50", "#e8b450", "#7bc67e", "#4caf50"];
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const s = strength(newPass);
  const otpComplete = otp.every((d) => d !== "");
  const canSubmit = otpComplete && newPass.length >= 8 && newPass === confirmPass;

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
      marginBottom: "5px",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      margin: "1rem 0",
    },
    dividerLine: { flex: 1, height: "0.5px", background: "rgba(160,70,30,0.22)" },
    dividerDot: { width: "4px", height: "4px", background: "rgba(160,70,30,0.4)", transform: "rotate(45deg)" },
    footer: {
      marginTop: "1.1rem",
      textAlign: "center",
      paddingTop: "1rem",
      borderTop: "1px solid rgba(160,70,30,0.12)",
    },
  };

  const inputStyle = (key) => ({
    width: "100%",
    height: "44px",
    padding: "0 38px 0 40px",
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

  const btnStyle = (hover, disabled) => ({
    width: "100%",
    height: "44px",
    background: disabled
      ? "rgba(192,98,58,0.4)"
      : "linear-gradient(135deg, #e8926a 0%, #c0623a 55%, #a04828 100%)",
    border: "none",
    borderRadius: "10px",
    fontSize: "13.5px",
    fontWeight: 500,
    color: "#fff",
    letterSpacing: "0.4px",
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    boxShadow: hover && !disabled
      ? "0 14px 32px rgba(160,60,20,0.5), inset 0 1.5px 0 rgba(255,255,255,0.25)"
      : "0 8px 24px rgba(160,60,20,0.35), inset 0 1.5px 0 rgba(255,255,255,0.25)",
    transform: hover && !disabled ? "translateY(-2px)" : "translateY(0)",
    transition: "transform 0.15s, box-shadow 0.15s",
    marginTop: "1rem",
  });

  const iconPos = { position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "15px", color: "rgba(150,70,40,0.6)", pointerEvents: "none" };

  if (done) {
    return (
      <>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" rel="stylesheet" />
        <main style={styles.wrap}>
          <div style={{ position: "absolute", borderRadius: "50%", top: "-80px", left: "-80px", width: "300px", height: "300px", background: "rgba(255,255,255,0.12)", pointerEvents: "none" }} />
          <div style={styles.card}>
            <div style={styles.shineTop} />
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <div style={{ width: "60px", height: "60px", background: "linear-gradient(145deg, rgba(100,200,120,0.3), rgba(80,180,100,0.2))", border: "1.5px solid rgba(100,200,120,0.5)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                <i className="ti ti-check" style={{ fontSize: "26px", color: "#2d8a4e" }} aria-hidden="true" />
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "21px", fontWeight: 600, color: "#2d1008", margin: "0 0 6px" }}>
                Password <span style={{ color: "#a04020" }}>Reset!</span>
              </h1>
              <p style={{ fontSize: "12.5px", color: "rgba(80,30,10,0.55)", fontWeight: 300, lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Your password has been updated successfully. You can now sign in with your new password.
              </p>
              <button
                type="button"
                onClick={() => navigate('/login')}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                style={btnStyle(btnHover, false)}
              >
                <i className="ti ti-arrow-left" aria-hidden="true" />
                Back to Sign In
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" rel="stylesheet" />

      <main style={styles.wrap}>
        <div style={{ position: "absolute", borderRadius: "50%", top: "-80px", left: "-80px", width: "300px", height: "300px", background: "rgba(255,255,255,0.12)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", borderRadius: "50%", bottom: "-100px", right: "-60px", width: "280px", height: "280px", background: "rgba(255,255,255,0.09)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", borderRadius: "50%", top: "45%", left: "3%", width: "90px", height: "90px", background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />

        <div style={styles.card}>
          <div style={styles.shineTop} />

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <div style={styles.iconWrap}>
              <i className="ti ti-lock-open" style={{ fontSize: "24px", color: "#7a3520" }} aria-hidden="true" />
            </div>
            <p style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(100,40,15,0.55)", margin: "0 0 3px" }}>
              Staff Portal
            </p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "21px", fontWeight: 600, color: "#2d1008", lineHeight: 1.2, margin: "0 0 3px" }}>
              Reset <span style={{ color: "#a04020" }}>Password</span>
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

          {/* OTP Section */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ ...styles.label, marginBottom: "8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span>Verification Code</span>
              <button
                type="button"
                onClick={handleResend}
                disabled={resendCooldown > 0}
                style={{
                  background: "none", border: "none",
                  color: resendCooldown > 0 ? "rgba(80,30,10,0.35)" : "#b05030",
                  fontSize: "11px", fontWeight: 500, cursor: resendCooldown > 0 ? "default" : "pointer",
                  fontFamily: "'Inter', sans-serif", padding: 0,
                }}
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
              </button>
            </label>

            {/* OTP Boxes */}
            <div style={{ display: "flex", gap: "8px" }} onPaste={handleOtpPaste}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (otpRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtp(e.target.value, idx)}
                  onKeyDown={(e) => handleOtpKey(e, idx)}
                  onFocus={() => setFocused(`otp${idx}`)}
                  onBlur={() => setFocused(null)}
                  style={{
                    flex: 1,
                    height: "48px",
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#3d1208",
                    fontFamily: "'Inter', sans-serif",
                    border: focused === `otp${idx}` ? "1.5px solid rgba(192,98,58,0.8)" : digit ? "1.5px solid rgba(160,70,30,0.5)" : "1.5px solid rgba(255,255,255,0.55)",
                    borderRadius: "10px",
                    background: digit ? "rgba(255,255,255,0.62)" : focused === `otp${idx}` ? "rgba(255,255,255,0.62)" : "rgba(255,255,255,0.35)",
                    outline: "none",
                    boxShadow: focused === `otp${idx}` ? "0 0 0 3px rgba(192,98,58,0.15)" : digit ? "inset 0 1px 3px rgba(0,0,0,0.05)" : "none",
                    transition: "all 0.15s ease",
                    caretColor: "#c0623a",
                  }}
                />
              ))}
            </div>
            <p style={{ fontSize: "11px", color: "rgba(80,30,10,0.45)", marginTop: "6px" }}>
              Enter the 6-digit code sent to your email. Expires in 10 minutes.
            </p>
          </div>

          {/* New Password */}
          <div style={{ marginBottom: "0.8rem" }}>
            <label htmlFor="rp-pass" style={styles.label}>New Password</label>
            <div style={{ position: "relative" }}>
              <i className="ti ti-lock" style={iconPos} aria-hidden="true" />
              <input
                id="rp-pass"
                type={showPass ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                onFocus={() => setFocused("newPass")}
                onBlur={() => setFocused(null)}
                style={inputStyle("newPass")}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(150,70,40,0.6)", fontSize: "15px", padding: 0 }}
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                <i className={showPass ? "ti ti-eye-off" : "ti ti-eye"} />
              </button>
            </div>
            {newPass.length > 0 && (
              <div style={{ marginTop: "5px" }}>
                <div style={{ height: "3px", background: "rgba(255,255,255,0.3)", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(s / 4) * 100}%`, background: strengthColor[s], borderRadius: "2px", transition: "all 0.3s" }} />
                </div>
                <p style={{ fontSize: "10.5px", color: strengthColor[s], marginTop: "3px", fontWeight: 500 }}>{strengthLabel[s]}</p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: "0.5rem" }}>
            <label htmlFor="rp-cpass" style={styles.label}>Confirm New Password</label>
            <div style={{ position: "relative" }}>
              <i className="ti ti-lock-check" style={iconPos} aria-hidden="true" />
              <input
                id="rp-cpass"
                type={showCPass ? "text" : "password"}
                placeholder="Repeat new password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                onFocus={() => setFocused("confirmPass")}
                onBlur={() => setFocused(null)}
                style={{
                  ...inputStyle("confirmPass"),
                  borderColor: confirmPass && newPass !== confirmPass
                    ? "rgba(200,60,40,0.7)"
                    : focused === "confirmPass" ? "rgba(192,98,58,0.8)" : "rgba(255,255,255,0.55)",
                }}
              />
              <button
                type="button"
                onClick={() => setShowCPass(!showCPass)}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(150,70,40,0.6)", fontSize: "15px", padding: 0 }}
                aria-label={showCPass ? "Hide password" : "Show password"}
              >
                <i className={showCPass ? "ti ti-eye-off" : "ti ti-eye"} />
              </button>
            </div>
            {confirmPass && newPass !== confirmPass && (
              <p style={{ fontSize: "10.5px", color: "#c03030", marginTop: "3px" }}>Passwords do not match</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={() => setDone(true)}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            disabled={!canSubmit}
            style={btnStyle(btnHover, !canSubmit)}
          >
            <i className="ti ti-check" aria-hidden="true" />
            Reset Password
          </button>

          {/* Footer */}
          <div style={styles.footer}>
            <p style={{ fontSize: "11.5px", color: "rgba(100,45,20,0.5)", margin: 0 }}>
              Back to{" "}
              <button
                type="button"
                onClick={() => navigate('/login')}
                style={{ background: "none", border: "none", color: "#b05030", fontSize: "11.5px", fontWeight: 500, cursor: "pointer", fontFamily: "'Inter', sans-serif", padding: 0 }}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default ResetPassword;