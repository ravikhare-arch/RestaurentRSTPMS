import { useState } from "react";

export const C = {
  pageBg: "linear-gradient(135deg, #f2e8e1 0%, #e8d5c8 40%, #ecddd4 100%)",
  glass: "rgba(255,255,255,0.58)",
  glassBorder: "rgba(255,255,255,0.78)",
  blur: "blur(18px)",
  terra: "#c96840",
  terraDark: "#a8523a",
  terraXLight: "#fdf6f2",
  terraLight: "rgba(201,104,64,0.10)",
  amber: "#e8960a",
  teal: "#2a9d8f",
  rose: "#c94a6a",
  sage: "#4a7c59",
  text: "#3a1a0a",
  textMid: "#7a4030",
  textLight: "#b07060",
  white: "#ffffff",
  border: "rgba(201,104,64,0.22)",
  inputBg: "rgba(255,255,255,0.65)",
  inputFocus: "rgba(201,104,64,0.18)",
  danger: "#c94a6a",
  success: "#4a7c59",
};

export const glassCard = {
  background: C.glass,
  backdropFilter: C.blur,
  WebkitBackdropFilter: C.blur,
  border: `1px solid ${C.glassBorder}`,
  borderRadius: 20,
  boxShadow: "0 4px 32px rgba(180,100,60,0.09)",
};

export const inputStyle = (focused) => ({
  background: focused ? "rgba(255,255,255,0.85)" : C.inputBg,
  border: `1px solid ${focused ? C.terra : C.border}`,
  borderRadius: 10,
  padding: "9px 13px",
  fontSize: 13,
  color: C.text,
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  transition: "all 0.2s ease",
  boxShadow: focused ? `0 0 0 3px rgba(201,104,64,0.12)` : "none",
});

export const COUNTRY_STATE_MAP = {
  India: ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat"],
  USA: ["California", "New York", "Texas", "Florida"],
  France: ["Île-de-France", "Provence", "Normandy"],
};

// Shared Input & Field Subcomponents
export function Field({ label, required, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: C.textMid, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        {label}{required && <span style={{ color: C.terra, marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

export function Input({ value, onChange, placeholder, type = "text" }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={inputStyle(focused)}
    />
  );
}

export function Select({ value, onChange, options, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{ ...inputStyle(focused), cursor: "pointer" }}
    >
      <option value="">{placeholder || "Select…"}</option>
      {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
    </select>
  );
}