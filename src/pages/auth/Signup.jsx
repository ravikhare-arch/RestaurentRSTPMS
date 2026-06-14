import { useState } from "react";

import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1);
  const [focused, setFocused] = useState(null);
  const [btnHover, setBtnHover] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);
  const [agree, setAgree] = useState(false);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", role: "",
    username: "", password: "", confirmPassword: "",
  });

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

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
  const s = strength(form.password);

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
      maxWidth: "400px",
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

  const halfInputStyle = (key) => ({
    ...inputStyle(key),
    padding: "0 10px 0 36px",
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
    marginTop: "0.9rem",
  });

  const iconPos = { position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "15px", color: "rgba(150,70,40,0.6)", pointerEvents: "none" };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" rel="stylesheet" />

      <main style={styles.wrap}>
        <div style={{ position: "absolute", borderRadius: "50%", top: "-80px", left: "-80px", width: "300px", height: "300px", background: "rgba(255,255,255,0.12)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", borderRadius: "50%", bottom: "-100px", right: "-60px", width: "280px", height: "280px", background: "rgba(255,255,255,0.09)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", borderRadius: "50%", top: "40%", right: "5%", width: "100px", height: "100px", background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />

        <div style={styles.card}>
          <div style={styles.shineTop} />

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <div style={styles.iconWrap}>
              <i className="ti ti-user-plus" style={{ fontSize: "24px", color: "#7a3520" }} aria-hidden="true" />
            </div>
            <p style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(100,40,15,0.55)", margin: "0 0 3px" }}>
              Staff Portal
            </p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "21px", fontWeight: 600, color: "#2d1008", lineHeight: 1.2, margin: "0 0 3px" }}>
              Create <span style={{ color: "#a04020" }}>Account</span>
            </h1>
            <p style={{ fontSize: "12px", color: "rgba(80,30,10,0.5)", fontWeight: 300, margin: 0 }}>
              Hotel Premier Inn · Restaurant Management
            </p>
          </div>

          {/* Step Indicator */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "0.9rem" }}>
            {[1, 2].map((n) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "26px", height: "26px", borderRadius: "50%",
                  background: step >= n ? "linear-gradient(135deg, #e8926a, #c0623a)" : "rgba(255,255,255,0.35)",
                  border: step >= n ? "none" : "1.5px solid rgba(160,70,30,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "11px", fontWeight: 500,
                  color: step >= n ? "#fff" : "rgba(80,30,10,0.45)",
                  boxShadow: step >= n ? "0 4px 12px rgba(160,60,20,0.3)" : "none",
                  transition: "all 0.3s",
                }}>
                  {step > n ? <i className="ti ti-check" style={{ fontSize: "12px" }} aria-hidden="true" /> : n}
                </div>
                <span style={{ fontSize: "11px", color: step >= n ? "#a04020" : "rgba(80,30,10,0.4)", fontWeight: step >= n ? 500 : 400 }}>
                  {n === 1 ? "Personal Info" : "Credentials"}
                </span>
                {n < 2 && <div style={{ width: "24px", height: "1px", background: step > n ? "rgba(160,70,30,0.5)" : "rgba(160,70,30,0.2)" }} />}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <div style={styles.dividerDot} />
            <div style={styles.dividerLine} />
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              {/* Name Row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "0.8rem" }}>
                <div>
                  <label style={styles.label}>First Name</label>
                  <div style={{ position: "relative" }}>
                    <i className="ti ti-user" style={{ ...iconPos, fontSize: "14px" }} aria-hidden="true" />
                    <input
                      type="text"
                      placeholder="John"
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      onFocus={() => setFocused("firstName")}
                      onBlur={() => setFocused(null)}
                      style={halfInputStyle("firstName")}
                    />
                  </div>
                </div>
                <div>
                  <label style={styles.label}>Last Name</label>
                  <div style={{ position: "relative" }}>
                    <i className="ti ti-user" style={{ ...iconPos, fontSize: "14px" }} aria-hidden="true" />
                    <input
                      type="text"
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      onFocus={() => setFocused("lastName")}
                      onBlur={() => setFocused(null)}
                      style={halfInputStyle("lastName")}
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: "0.8rem" }}>
                <label htmlFor="su-email" style={styles.label}>Work Email</label>
                <div style={{ position: "relative" }}>
                  <i className="ti ti-mail" style={iconPos} aria-hidden="true" />
                  <input
                    id="su-email"
                    type="email"
                    placeholder="you@premierinn.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    style={inputStyle("email")}
                  />
                </div>
              </div>

              {/* Role */}
              <div style={{ marginBottom: "0.5rem" }}>
                <label htmlFor="su-role" style={styles.label}>Role / Department</label>
                <div style={{ position: "relative" }}>
                  <i className="ti ti-briefcase" style={iconPos} aria-hidden="true" />
                  <input
                    id="su-role"
                    type="text"
                    placeholder="e.g. Front Desk, Kitchen, Manager"
                    value={form.role}
                    onChange={(e) => update("role", e.target.value)}
                    onFocus={() => setFocused("role")}
                    onBlur={() => setFocused(null)}
                    style={inputStyle("role")}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                disabled={!form.firstName || !form.email}
                style={btnStyle(btnHover, !form.firstName || !form.email)}
              >
                <i className="ti ti-arrow-right" aria-hidden="true" />
                Continue
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              {/* Username */}
              <div style={{ marginBottom: "0.8rem" }}>
                <label htmlFor="su-user" style={styles.label}>Choose Username</label>
                <div style={{ position: "relative" }}>
                  <i className="ti ti-at" style={iconPos} aria-hidden="true" />
                  <input
                    id="su-user"
                    type="text"
                    placeholder="john.doe"
                    value={form.username}
                    onChange={(e) => update("username", e.target.value)}
                    onFocus={() => setFocused("username")}
                    onBlur={() => setFocused(null)}
                    style={inputStyle("username")}
                  />
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom: "0.8rem" }}>
                <label htmlFor="su-pass" style={styles.label}>Password</label>
                <div style={{ position: "relative" }}>
                  <i className="ti ti-lock" style={iconPos} aria-hidden="true" />
                  <input
                    id="su-pass"
                    type={showPass ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused(null)}
                    style={{ ...inputStyle("password"), paddingRight: "38px" }}
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
                {/* Strength Bar */}
                {form.password.length > 0 && (
                  <div style={{ marginTop: "5px" }}>
                    <div style={{ height: "3px", background: "rgba(255,255,255,0.3)", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(s / 4) * 100}%`, background: strengthColor[s], borderRadius: "2px", transition: "all 0.3s" }} />
                    </div>
                    <p style={{ fontSize: "10.5px", color: strengthColor[s], marginTop: "3px", fontWeight: 500 }}>{strengthLabel[s]}</p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div style={{ marginBottom: "0.8rem" }}>
                <label htmlFor="su-cpass" style={styles.label}>Confirm Password</label>
                <div style={{ position: "relative" }}>
                  <i className="ti ti-lock-check" style={iconPos} aria-hidden="true" />
                  <input
                    id="su-cpass"
                    type={showCPass ? "text" : "password"}
                    placeholder="Repeat password"
                    value={form.confirmPassword}
                    onChange={(e) => update("confirmPassword", e.target.value)}
                    onFocus={() => setFocused("confirmPassword")}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...inputStyle("confirmPassword"),
                      paddingRight: "38px",
                      borderColor: form.confirmPassword && form.password !== form.confirmPassword
                        ? "rgba(200,60,40,0.7)"
                        : focused === "confirmPassword" ? "rgba(192,98,58,0.8)" : "rgba(255,255,255,0.55)",
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
                {form.confirmPassword && form.password !== form.confirmPassword && (
                  <p style={{ fontSize: "10.5px", color: "#c03030", marginTop: "3px" }}>Passwords do not match</p>
                )}
              </div>

              {/* Terms */}
              <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", cursor: "pointer", marginBottom: "0.5rem" }}>
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  style={{ accentColor: "#c0623a", width: "14px", height: "14px", cursor: "pointer", marginTop: "2px", flexShrink: 0 }}
                />
                <span style={{ fontSize: "11.5px", color: "rgba(80,30,10,0.6)", lineHeight: 1.5 }}>
                  I agree to the <span style={{ color: "#b05030", fontWeight: 500 }}>Terms of Service</span> and <span style={{ color: "#b05030", fontWeight: 500 }}>Privacy Policy</span>
                </span>
              </label>

              <button
                type="button"
                onClick={() => alert(`Welcome, ${form.firstName}! Account created.`)}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                disabled={!agree || !form.username || !form.password || form.password !== form.confirmPassword}
                style={btnStyle(btnHover, !agree || !form.username || !form.password || form.password !== form.confirmPassword)}
              >
                <i className="ti ti-check" aria-hidden="true" />
                Create Account
              </button>

              <div style={{ textAlign: "center", marginTop: "0.75rem" }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{ background: "none", border: "none", color: "#b05030", fontSize: "12px", fontWeight: 500, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
                >
                  ← Back to step 1
                </button>
              </div>
            </>
          )}

          {/* Footer */}
          <div style={styles.footer}>
            <p style={{ fontSize: "11.5px", color: "rgba(100,45,20,0.5)", margin: 0 }}>
              Already have an account?{" "}
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

export default SignUp;