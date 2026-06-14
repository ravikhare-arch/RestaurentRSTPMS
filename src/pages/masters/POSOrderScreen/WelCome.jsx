import { useState, useEffect } from "react";

const C = {
  pageBg: "#f2e8e1",
  pageBg2: "#ecddd4",
  glass: "rgba(255,255,255,0.55)",
  glassBorder: "rgba(255,255,255,0.75)",
  glassDark: "rgba(255,255,255,0.3)",
  blur: "blur(18px)",
  terra1: "#c96840",
  terra2: "#a8523a",
  terra3: "#7a3828",
  terraLight: "#f0d4c4",
  terraXLight: "#faf0ea",
  amber: "#e8960a",
  amberLight: "#fff3d6",
  teal: "#2a9d8f",
  tealLight: "#d4f0ec",
  rose: "#c94a6a",
  roseLight: "#fde0e8",
  sage: "#4a7c59",
  sageLight: "#d8f0e0",
  text: "#3a1a0a",
  textMid: "#7a4030",
  textLight: "#b07060",
  white: "#ffffff",
};

const glassCard = {
  background: C.glass,
  backdropFilter: C.blur,
  WebkitBackdropFilter: C.blur,
  border: `1px solid ${C.glassBorder}`,
  borderRadius: 20,
};

const sales = [
  { label: "All Sales", value: null, icon: "🍽️", accent: C.terra1, light: "rgba(201,104,64,0.12)", input: true },
  { label: "Total Dine-in Sales", value: "₹0.00", icon: "💵", accent: C.teal, light: "rgba(42,157,143,0.12)" },
  { label: "Total Room Service", value: "₹2,88,562", icon: "🗄️", accent: C.amber, light: "rgba(232,150,10,0.12)" },
  { label: "Total TakeAway Sales", value: "₹0.00", icon: "💬", accent: C.rose, light: "rgba(201,74,106,0.12)" },
];

const orderTabs = ["Dine In", "Take Away", "Room Service", "Pending Sales"];
const statusFilters = ["PLACED", "IN PROGRESS", "COMPLETED", "CANCELLED", "INFUTURE"];

const sampleOrders = [
  { id: "ORD-001", room: "101", date: "14 Jun 2024", time: "10:30", timer: "00:12:34", type: "Dine In", table: "Table A1", paid: "₹450.00", status: "COMPLETED" },
  { id: "ORD-002", room: "204", date: "14 Jun 2024", time: "11:05", timer: "00:05:10", type: "Room Service", table: "—", paid: "₹1,200.00", status: "IN PROGRESS" },
  { id: "ORD-003", room: "—", date: "14 Jun 2024", time: "11:45", timer: "00:02:55", type: "Take Away", table: "—", paid: "₹0.00", status: "PLACED" },
  { id: "ORD-004", room: "310", date: "14 Jun 2024", time: "09:15", timer: "01:20:00", type: "Room Service", table: "—", paid: "₹3,200.00", status: "COMPLETED" },
  { id: "ORD-005", room: "—", date: "14 Jun 2024", time: "12:00", timer: "00:00:00", type: "Dine In", table: "Table B3", paid: "₹0.00", status: "CANCELLED" },
];

const onlineOrders = [
  { id: "ONL-001", placed: "10:15 AM", delivery: "11:00 AM", channel: "Zomato", status: "DELIVERED" },
  { id: "ONL-002", placed: "11:30 AM", delivery: "12:15 PM", channel: "Swiggy", status: "IN PROGRESS" },
];

const statusStyle = {
  PLACED:       { bg: "rgba(42,157,143,0.12)",  color: "#2a9d8f", border: "rgba(42,157,143,0.35)" },
  "IN PROGRESS":{ bg: "rgba(232,150,10,0.12)",  color: "#c07800", border: "rgba(232,150,10,0.35)" },
  COMPLETED:    { bg: "rgba(74,124,89,0.12)",   color: "#3a6a44", border: "rgba(74,124,89,0.35)" },
  CANCELLED:    { bg: "rgba(201,74,106,0.12)",  color: "#c94a6a", border: "rgba(201,74,106,0.35)" },
  INFUTURE:     { bg: "rgba(120,80,160,0.12)",  color: "#7850a0", border: "rgba(120,80,160,0.35)" },
  DELIVERED:    { bg: "rgba(74,124,89,0.12)",   color: "#3a6a44", border: "rgba(74,124,89,0.35)" },
};

function AnimatedNumber({ value, accent }) {
  const [display, setDisplay] = useState("₹0.00");
  useEffect(() => {
    if (!value || value === "₹0.00") { setDisplay("₹0.00"); return; }
    const num = parseFloat(value.replace(/[₹,]/g, ""));
    let current = 0;
    const steps = 50;
    const inc = num / steps;
    let i = 0;
    const t = setInterval(() => {
      i++; current += inc;
      setDisplay("₹" + Math.min(current, num).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
      if (i >= steps) clearInterval(t);
    }, 18);
    return () => clearInterval(t);
  }, [value]);
  return <span style={{ color: accent }}>{display}</span>;
}

function SaleCard({ item, index }) {
  const [visible, setVisible] = useState(false);
  const [inp, setInp] = useState("");
  const [hovered, setHovered] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), index * 100 + 80); return () => clearTimeout(t); }, [index]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1, minWidth: 210,
        ...glassCard,
        background: hovered ? "rgba(255,255,255,0.72)" : C.glass,
        padding: "20px 20px 18px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
        transition: "opacity 0.55s cubic-bezier(.4,0,.2,1), transform 0.55s cubic-bezier(.4,0,.2,1), background 0.2s",
        cursor: "default",
        position: "relative", overflow: "hidden",
        boxShadow: hovered ? "0 8px 32px rgba(201,104,64,0.14)" : "0 2px 16px rgba(180,100,60,0.07)",
      }}
    >
      {/* tint blob */}
      <div style={{ position: "absolute", top: -18, right: -18, width: 72, height: 72, borderRadius: "50%", background: item.light, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -24, left: -10, width: 56, height: 56, borderRadius: "50%", background: item.light, pointerEvents: "none" }} />

      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: item.accent, letterSpacing: "0.07em", textTransform: "uppercase" }}>{item.label}</div>
          <span style={{ fontSize: 22, lineHeight: 1 }}>{item.icon}</span>
        </div>
        {item.input ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              value={inp}
              onChange={e => setInp(e.target.value)}
              placeholder="Search…"
              style={{ background: "rgba(255,255,255,0.6)", border: `1px solid rgba(201,104,64,0.3)`, borderRadius: 9, padding: "7px 11px", color: C.text, fontSize: 13, width: 110, outline: "none" }}
            />
            <button style={{ background: item.accent, color: "#fff", border: "none", borderRadius: 9, padding: "7px 14px", fontWeight: 700, fontSize: 13, cursor: "pointer", boxShadow: `0 2px 8px ${item.accent}44` }}>Enter</button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 22, fontWeight: 800 }}>
              <AnimatedNumber value={item.value} accent={item.accent} />
            </span>
            <span style={{ fontSize: 15, color: item.accent, opacity: 0.6 }}>👁</span>
          </div>
        )}
      </div>
    </div>
  );
}

function TabBar({ tabs, active, onChange }) {
  return (
    <div style={{ display: "flex", gap: 4, padding: "4px", background: "rgba(255,255,255,0.35)", borderRadius: 12, backdropFilter: C.blur, WebkitBackdropFilter: C.blur }}>
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          style={{
            background: active === tab ? C.terra1 : "transparent",
            border: "none", borderRadius: 9,
            padding: "8px 18px",
            fontSize: 13, fontWeight: 600,
            color: active === tab ? "#fff" : C.textMid,
            cursor: "pointer",
            transition: "all 0.22s ease",
            boxShadow: active === tab ? `0 2px 10px ${C.terra1}44` : "none",
            display: "flex", alignItems: "center", gap: 5,
          }}
        >
          🍴 {tab}
        </button>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dine In");
  const [orderSection, setOrderSection] = useState("Recent Orders");
  const [activeStatus, setActiveStatus] = useState(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  const filteredOrders = sampleOrders.filter(o => {
    const tabMatch = activeTab === "Pending Sales" || o.type === activeTab;
    return !activeStatus || o.status === activeStatus ? tabMatch : false;
  });

  const th = { padding: "11px 14px", fontSize: 11, fontWeight: 700, color: C.textLight, textAlign: "left", borderBottom: `1px solid rgba(201,104,64,0.15)`, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap", background: "rgba(255,255,255,0.4)" };
  const td = { padding: "12px 14px", fontSize: 13, color: C.text, borderBottom: `1px solid rgba(201,104,64,0.07)` };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.pageBg} 0%, #e8d5c8 40%, ${C.pageBg2} 100%)`, fontFamily: "'Inter', system-ui, sans-serif", color: C.text }}>

      {/* Decorative blobs */}
      <div style={{ position: "fixed", top: -120, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(201,104,64,0.12)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: -100, left: -60, width: 320, height: 320, borderRadius: "50%", background: "rgba(168,82,58,0.10)", filter: "blur(50px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", top: "40%", left: "30%", width: 240, height: 240, borderRadius: "50%", background: "rgba(232,150,10,0.07)", filter: "blur(40px)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{
          ...glassCard,
          borderRadius: 0,
          borderLeft: "none", borderRight: "none", borderTop: "none",
          padding: "14px 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(-14px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: C.terra1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: `0 4px 14px ${C.terra1}55` }}>🍽️</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>Welcome Back</div>
              <div style={{ fontSize: 12, color: C.textLight }}>Hotel Premier Inn · Restaurant Dashboard</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 12, color: C.textMid, background: "rgba(255,255,255,0.5)", border: `1px solid rgba(201,104,64,0.2)`, borderRadius: 9, padding: "6px 14px", backdropFilter: "blur(8px)" }}>
              📅 {new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
            </div>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.terra1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, cursor: "pointer", color: "#fff", boxShadow: `0 2px 8px ${C.terra1}44` }}>👤</div>
          </div>
        </div>

        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Sales Cards */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {sales.map((item, i) => <SaleCard key={item.label} item={item} index={i} />)}
          </div>

          {/* Order Tabs Panel */}
          <div style={{ ...glassCard, padding: "16px 20px", boxShadow: "0 4px 24px rgba(180,100,60,0.08)" }}>
            <TabBar tabs={orderTabs} active={activeTab} onChange={setActiveTab} />
            <div style={{ marginTop: 16, minHeight: 70, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ color: C.textLight, fontSize: 13, textAlign: "center" }}>
                {activeTab === "Dine In" && "Select a table to view active dine-in sessions"}
                {activeTab === "Take Away" && "No active takeaway orders at this moment"}
                {activeTab === "Room Service" && "Room service orders will appear here"}
                {activeTab === "Pending Sales" && "All pending sales across order types"}
              </div>
            </div>
          </div>

          {/* Recent Orders Panel */}
          <div style={{ ...glassCard, overflow: "hidden", boxShadow: "0 4px 24px rgba(180,100,60,0.08)" }}>
            {/* Section tabs */}
            <div style={{ padding: "16px 20px 0", borderBottom: `1px solid rgba(201,104,64,0.15)` }}>
              <TabBar tabs={["Recent Orders", "Online Recent Orders"]} active={orderSection} onChange={setOrderSection} />
            </div>

            {orderSection === "Recent Orders" ? (
              <>
                {/* Status pills */}
                <div style={{ display: "flex", gap: 8, padding: "14px 20px", flexWrap: "wrap" }}>
                  {statusFilters.map(s => {
                    const sc = statusStyle[s] || {};
                    const on = activeStatus === s;
                    return (
                      <button key={s} onClick={() => setActiveStatus(on ? null : s)} style={{
                        background: on ? sc.bg : "rgba(255,255,255,0.5)",
                        border: `1px solid ${on ? sc.border : "rgba(201,104,64,0.2)"}`,
                        borderRadius: 8, padding: "6px 16px",
                        fontSize: 11, fontWeight: 700,
                        color: on ? sc.color : C.textLight,
                        cursor: "pointer", letterSpacing: "0.05em",
                        transition: "all 0.2s ease",
                        backdropFilter: "blur(8px)",
                      }}>{s}</button>
                    );
                  })}
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        {["Order Id","Room No.","Date","Time","Running Timer","Order Type","Table Name","Total Paid","Payment Status","Go to Menu","Close Order"].map(h => (
                          <th key={h} style={th}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.length === 0 ? (
                        <tr><td colSpan={11} style={{ ...td, textAlign: "center", padding: 36, color: C.textLight }}>No orders found for this selection.</td></tr>
                      ) : filteredOrders.map((o, i) => {
                        const sc = statusStyle[o.status] || {};
                        return (
                          <tr key={o.id} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.28)", transition: "background 0.15s" }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.5)"}
                            onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.28)"}
                          >
                            <td style={{ ...td, fontWeight: 700, color: C.terra1 }}>{o.id}</td>
                            <td style={td}>{o.room}</td>
                            <td style={td}>{o.date}</td>
                            <td style={td}>{o.time}</td>
                            <td style={{ ...td, fontFamily: "monospace", color: C.amber, fontWeight: 600 }}>{o.timer}</td>
                            <td style={td}>{o.type}</td>
                            <td style={td}>{o.table}</td>
                            <td style={{ ...td, fontWeight: 700 }}>{o.paid}</td>
                            <td style={td}>
                              <span style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{o.status}</span>
                            </td>
                            <td style={td}>
                              <button style={{ background: "rgba(42,157,143,0.1)", color: C.teal, border: "1px solid rgba(42,157,143,0.3)", borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Menu →</button>
                            </td>
                            <td style={td}>
                              <button style={{ background: "rgba(201,74,106,0.1)", color: C.rose, border: "1px solid rgba(201,74,106,0.3)", borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Close</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Order Id","Placed At","Delivery Time","Channel Name","Order Status","Action"].map(h => (
                        <th key={h} style={th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {onlineOrders.map((o, i) => {
                      const sc = statusStyle[o.status] || {};
                      return (
                        <tr key={o.id} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.28)" }}
                          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.5)"}
                          onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.28)"}
                        >
                          <td style={{ ...td, fontWeight: 700, color: C.terra1 }}>{o.id}</td>
                          <td style={td}>{o.placed}</td>
                          <td style={td}>{o.delivery}</td>
                          <td style={{ ...td, fontWeight: 600 }}>{o.channel}</td>
                          <td style={td}>
                            <span style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{o.status}</span>
                          </td>
                          <td style={td}>
                            <button style={{ background: "rgba(201,104,64,0.1)", color: C.terra1, border: "1px solid rgba(201,104,64,0.3)", borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View →</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}