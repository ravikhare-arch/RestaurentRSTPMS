import { useState, useEffect, useRef } from "react";

const MENU = {
  "Beverages": [
    { id: 1, name: "Tea", price: 60 },
    { id: 2, name: "Coffee", price: 75 },
    { id: 3, name: "Choice of Preserved Juices", price: 90 },
    { id: 4, name: "Cold Coffee", price: 135 },
    { id: 5, name: "Chass (Plain/Masala)", price: 125 },
    { id: 6, name: "Lassi (Sweet/Salt)", price: 125 },
    { id: 7, name: "Ice Cube", price: 40 },
    { id: 8, name: "Mineral Water", price: 35 },
    { id: 9, name: "Soda", price: 50 },
    { id: 10, name: "All Papad", price: 30 },
    { id: 11, name: "Peanut Masala", price: 45 },
    { id: 12, name: "Plain Peanut", price: 35 },
  ],
  "North Indian": [
    { id: 13, name: "Dal Makhani", price: 180 },
    { id: 14, name: "Paneer Butter Masala", price: 220 },
    { id: 15, name: "Shahi Paneer", price: 230 },
    { id: 16, name: "Butter Chicken", price: 250 },
    { id: 17, name: "Chicken Tikka Masala", price: 270 },
    { id: 18, name: "Naan", price: 40 },
    { id: 19, name: "Tandoori Roti", price: 25 },
    { id: 20, name: "Jeera Rice", price: 120 },
    { id: 21, name: "Biryani Rice", price: 160 },
  ],
  "Veg Soup": [
    { id: 22, name: "Tomato Soup", price: 90 },
    { id: 23, name: "Sweet Corn Soup", price: 95 },
    { id: 24, name: "Mixed Veg Soup", price: 100 },
    { id: 25, name: "Manchow Soup", price: 110 },
  ],
  "Non-Veg Soup": [
    { id: 26, name: "Chicken Clear Soup", price: 120 },
    { id: 27, name: "Chicken Manchow", price: 130 },
    { id: 28, name: "Mutton Soup", price: 140 },
  ],
  "Veg Starters": [
    { id: 29, name: "Veg Manchurian", price: 150 },
    { id: 30, name: "Paneer Tikka", price: 200 },
    { id: 31, name: "Hara Bhara Kabab", price: 160 },
    { id: 32, name: "Spring Rolls", price: 140 },
  ],
  "Non Veg Starters": [
    { id: 33, name: "Chicken Tikka", price: 220 },
    { id: 34, name: "Seekh Kabab", price: 240 },
    { id: 35, name: "Fish Fry", price: 260 },
    { id: 36, name: "Chicken Lollipop", price: 250 },
  ],
  "Main Course": [
    { id: 37, name: "Veg Thali", price: 220 },
    { id: 38, name: "Non-Veg Thali", price: 280 },
    { id: 39, name: "Fish Curry", price: 300 },
    { id: 40, name: "Mutton Curry", price: 320 },
  ],
  "Desserts": [
    { id: 41, name: "Gulab Jamun", price: 80 },
    { id: 42, name: "Rasgulla", price: 75 },
    { id: 43, name: "Ice Cream", price: 90 },
    { id: 44, name: "Kheer", price: 85 },
  ],
};

const NC_NAMES = ["Kapil Sir", "Mohit", "Honey Sir", "Rahul", "Priya"];

const CATEGORY_ICONS = {
  "Beverages":        "ti-cup",
  "North Indian":     "ti-bowl-spoon",
  "Veg Soup":         "ti-soup",
  "Non-Veg Soup":     "ti-soup",
  "Veg Starters":     "ti-salad",
  "Non Veg Starters": "ti-meat",
  "Main Course":      "ti-tools-kitchen-2",
  "Desserts":         "ti-ice-cream",
};

/* ── Floating particle that flies from card → order panel ── */
function FlyParticle({ x, y, onDone }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tx = window.innerWidth - 200;
    const ty = 60;
    el.animate(
      [
        { transform: "translate(0,0) scale(1)", opacity: 1 },
        { transform: `translate(${tx - x}px,${ty - y}px) scale(0.3)`, opacity: 0 },
      ],
      { duration: 550, easing: "cubic-bezier(0.2,0.8,0.4,1)", fill: "forwards" }
    ).onfinish = onDone;
  }, []);
  return (
    <div
      ref={ref}
      style={{
        position: "fixed", left: x, top: y, zIndex: 9999, pointerEvents: "none",
        width: "36px", height: "36px", borderRadius: "50%",
        background: "linear-gradient(135deg,#FAC775,#BA7517)",
        boxShadow: "0 0 12px rgba(186,117,23,0.6)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <i className="ti ti-plus" style={{ color: "#fff", fontSize: "16px" }} />
    </div>
  );
}

/* ── Card with cursor-glow tracking ── */
function ItemCard({ item, inOrder, orderQty, qtyFlash, onAdd }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + "%";
    const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + "%";
    if (glowRef.current) {
      glowRef.current.style.background =
        `radial-gradient(circle at ${x} ${y}, rgba(239,159,39,0.22) 0%, transparent 65%)`;
      glowRef.current.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={cardRef}
      onClick={onAdd}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        borderRadius: "14px", overflow: "hidden", cursor: "pointer", position: "relative",
        background: "rgba(255,255,255,0.62)",
        border: inOrder ? "1.5px solid rgba(186,117,23,0.5)" : "1px solid rgba(255,255,255,0.85)",
        boxShadow: inOrder
          ? "0 0 0 2px rgba(239,159,39,0.15), 0 8px 32px rgba(186,117,23,0.15)"
          : "0 8px 32px rgba(186,117,23,0.10), 0 1.5px 6px rgba(186,117,23,0.07)",
        backdropFilter: "blur(12px) saturate(1.4)",
        transition: "transform 0.18s, box-shadow 0.18s, border-color 0.18s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px) scale(1.015)";
        e.currentTarget.style.boxShadow = "0 16px 40px rgba(186,117,23,0.18), 0 2px 8px rgba(186,117,23,0.10)";
      }}
      onMouseLeave2={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = inOrder
          ? "0 0 0 2px rgba(239,159,39,0.15), 0 8px 32px rgba(186,117,23,0.15)"
          : "0 8px 32px rgba(186,117,23,0.10), 0 1.5px 6px rgba(186,117,23,0.07)";
      }}
    >
      {/* cursor glow layer */}
      <div
        ref={glowRef}
        style={{
          position: "absolute", inset: 0, borderRadius: "14px",
          pointerEvents: "none", opacity: 0,
          transition: "opacity 0.3s",
          background: "radial-gradient(circle at 50% 50%, rgba(239,159,39,0.18) 0%, transparent 65%)",
        }}
      />

      {/* Card top */}
      <div style={{
        padding: "11px 9px", textAlign: "center", fontSize: "12px", fontWeight: 600,
        color: "#854F0B", letterSpacing: "0.2px", minHeight: "46px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: inOrder ? "rgba(239,159,39,0.1)" : "rgba(255,255,255,0.45)",
        lineHeight: 1.3, position: "relative", transition: "background 0.2s",
      }}>
        {inOrder && (
          <span style={{
            position: "absolute", top: "5px", right: "5px",
            width: "19px", height: "19px", borderRadius: "50%",
            background: "linear-gradient(135deg,#FAC775,#BA7517)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "11px", fontWeight: 700, color: "#fff",
            boxShadow: "0 2px 6px rgba(186,117,23,0.35)",
            animation: qtyFlash ? "qtyBounce 0.45s ease" : "none",
          }}>
            {orderQty}
          </span>
        )}
        {item.name}
      </div>

      {/* Card price */}
      <div style={{
        padding: "6px", textAlign: "center", fontSize: "13px", fontWeight: 700,
        color: inOrder ? "#854F0B" : "#BA7517",
        background: inOrder ? "rgba(239,159,39,0.1)" : "rgba(250,206,122,0.12)",
        borderTop: "1px solid rgba(186,117,23,0.1)",
        transition: "all 0.2s",
      }}>
        ₹ {item.price}
      </div>
    </div>
  );
}

export default function POSOrder({ onDashboard }) {
  const [activeCategory, setActiveCategory]   = useState("Beverages");
  const [menuSearch, setMenuSearch]           = useState("");
  const [orderItems, setOrderItems]           = useState([]);
  const [particles, setParticles]             = useState([]);
  const [addedId, setAddedId]                 = useState(null);
  const [editingRemarkId, setEditingRemarkId] = useState(null);
  const [remarkDraft, setRemarkDraft]         = useState("");
  const [isNC, setIsNC]                       = useState(false);
  const [ncName, setNcName]                   = useState("");
  const [ncSearch, setNcSearch]               = useState("");
  const [showNcDrop, setShowNcDrop]           = useState(false);
  const [roomNo, setRoomNo]                   = useState("");
  const [givenAmt, setGivenAmt]               = useState("");
  const [now, setNow]                         = useState(new Date());
  const [kotSaved, setKotSaved]               = useState(false);
  const [newRowId, setNewRowId]               = useState(null);
  const [qtyFlash, setQtyFlash]               = useState(null);
  const ncRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const h = (e) => {
      if (ncRef.current && !ncRef.current.contains(e.target)) setShowNcDrop(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const formatTime = (d) =>
    d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }).toUpperCase() +
    " " + d.toLocaleDateString("en-IN");

  const filteredMenu = (MENU[activeCategory] || []).filter((i) =>
    i.name.toLowerCase().includes(menuSearch.toLowerCase())
  );

  const addItem = (item, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const pid = Date.now();
    setParticles((p) => [...p, { id: pid, x: cx, y: cy }]);

    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 400);

    setOrderItems((prev) => {
      const ex = prev.find((o) => o.id === item.id);
      if (ex) {
        setQtyFlash(item.id);
        setTimeout(() => setQtyFlash(null), 500);
        return prev.map((o) => o.id === item.id ? { ...o, qty: o.qty + 1 } : o);
      }
      setNewRowId(item.id);
      setTimeout(() => setNewRowId(null), 500);
      return [...prev, { ...item, qty: 1, remark: "" }];
    });
  };

  const changeQty = (id, delta) => {
    setQtyFlash(id);
    setTimeout(() => setQtyFlash(null), 400);
    setOrderItems((prev) =>
      prev.map((o) => o.id === id ? { ...o, qty: Math.max(1, o.qty + delta) } : o)
    );
  };

  const removeItem    = (id) => setOrderItems((prev) => prev.filter((o) => o.id !== id));
  const saveRemark    = (id) => {
    setOrderItems((prev) => prev.map((o) => o.id === id ? { ...o, remark: remarkDraft } : o));
    setEditingRemarkId(null);
  };

  const dishTotal  = orderItems.reduce((s, o) => s + o.price * o.qty, 0);
  const returnAmt  = givenAmt ? Math.max(0, Number(givenAmt) - dishTotal) : 0;

  const handleCloseTable = () => { setOrderItems([]); setGivenAmt(""); setRoomNo(""); setIsNC(false); setNcName(""); };
  const handleSaveKOT    = () => { if (orderItems.length) { setKotSaved(true); setTimeout(() => setKotSaved(false), 2000); } };
  const handlePrintBill  = () => alert(`Bill Total: ₹${dishTotal}`);

  const ncFiltered = NC_NAMES.filter((n) => n.toLowerCase().includes(ncSearch.toLowerCase()));

  /* ── shared small input style ── */
  const smInput = {
    height: "30px", padding: "0 9px",
    border: "1.5px solid rgba(186,117,23,0.18)",
    borderRadius: "8px", background: "rgba(255,255,255,0.6)",
    fontSize: "12px", color: "#854F0B",
    fontFamily: "'Inter',sans-serif", outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const actionBtn = (g1, g2, shadow) => ({
    padding: "6px 10px", border: "none", borderRadius: "8px",
    cursor: "pointer", fontFamily: "'Inter',sans-serif",
    fontSize: "11.5px", fontWeight: 600, color: "#fff", letterSpacing: "0.3px",
    background: `linear-gradient(135deg,${g1},${g2})`,
    boxShadow: `0 3px 10px ${shadow}`,
    transition: "transform 0.12s, box-shadow 0.12s, filter 0.12s",
    whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "5px",
  });

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
        rel="stylesheet"
      />

      <style>{`
        @keyframes cardPop    { 0%{transform:scale(1)} 40%{transform:scale(0.9)} 70%{transform:scale(1.07)} 100%{transform:scale(1)} }
        @keyframes rowSlide   { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes qtyBounce  { 0%{transform:scale(1)} 35%{transform:scale(1.55)} 70%{transform:scale(0.88)} 100%{transform:scale(1)} }
        @keyframes catPulse   { from{opacity:0.5;transform:scaleX(0)} to{opacity:1;transform:scaleX(1)} }
        @keyframes shimmer    { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .menu-scroll::-webkit-scrollbar { width: 3px; }
        .menu-scroll::-webkit-scrollbar-thumb { background: rgba(186,117,23,0.2); border-radius: 4px; }
        .order-scroll::-webkit-scrollbar { width: 3px; }
        .order-scroll::-webkit-scrollbar-thumb { background: rgba(186,117,23,0.18); border-radius: 4px; }
        .sidebar-scroll::-webkit-scrollbar { width: 3px; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: rgba(186,117,23,0.15); border-radius: 4px; }
        .cat-btn:hover:not(.active) { background: rgba(239,159,39,0.08) !important; color: #BA7517 !important; }
        .abtn:hover { transform: translateY(-2px); filter: brightness(1.08); }
        .abtn:active { transform: scale(0.96); }
        .qty-btn-minus:hover { background: rgba(215,90,48,0.28) !important; transform: scale(1.1); }
        .qty-btn-plus:hover  { background: rgba(24,95,165,0.22) !important; transform: scale(1.1); }
        .remove-btn:hover { color: #a32d2d !important; }
        .sm-input:focus { border-color: #EF9F27 !important; box-shadow: 0 0 0 3px rgba(239,159,39,0.12) !important; }
        .search-input:focus { border-color: #EF9F27 !important; box-shadow: 0 0 0 3px rgba(239,159,39,0.15) !important; }
        .nc-opt:hover { background: rgba(239,159,39,0.1) !important; }
      `}</style>

      {/* Fly particles */}
      {particles.map((p) => (
        <FlyParticle
          key={p.id} x={p.x} y={p.y}
          onDone={() => setParticles((prev) => prev.filter((pp) => pp.id !== p.id))}
        />
      ))}

      <div style={{
        height: "100vh", display: "flex", flexDirection: "column",
        fontFamily: "'Inter',sans-serif", overflow: "hidden",
        background: "linear-gradient(135deg,#fff8f0 0%,#fef3e2 40%,#fde8c8 70%,#fcdcb0 100%)",
      }}>

        {/* ── TOP BAR ── */}
        <div style={{
          height: "52px", flexShrink: 0,
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.8)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 1rem", gap: "12px",
          boxShadow: "0 1px 0 rgba(186,117,23,0.08)",
        }}>

          {/* Search */}
          <div style={{ position: "relative", flex: 1, maxWidth: "300px" }}>
            <i className="ti ti-search" style={{
              position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)",
              fontSize: "14px", color: "#BA7517", pointerEvents: "none",
            }} aria-hidden="true" />
            <input
              type="text" placeholder="Search menu items..." value={menuSearch}
              onChange={(e) => setMenuSearch(e.target.value)}
              className="search-input"
              style={{
                width: "100%", height: "34px", padding: "0 10px 0 32px",
                border: "1.5px solid rgba(186,117,23,0.2)", borderRadius: "10px",
                background: "rgba(255,255,255,0.7)", fontSize: "12.5px",
                fontFamily: "'Inter',sans-serif", color: "#854F0B", outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            />
          </div>

          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "34px", height: "34px",
              background: "linear-gradient(135deg,#FAC775,#BA7517)",
              borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 10px rgba(186,117,23,0.25)",
            }}>
              <i className="ti ti-tools-kitchen-2" style={{ fontSize: "18px", color: "#fff" }} aria-hidden="true" />
            </div>
            <div>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "14px", fontWeight: 600, color: "#854F0B", margin: 0, lineHeight: 1.1 }}>Hotel Premier Inn</p>
              <p style={{ fontSize: "10px", color: "#BA7517", margin: 0, letterSpacing: "2px", textTransform: "uppercase", opacity: 0.7 }}>POS Terminal</p>
            </div>
          </div>

          {/* Clock */}
          <div style={{
            display: "flex", alignItems: "center", gap: "7px",
            background: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(255,255,255,0.9)",
            borderRadius: "10px", padding: "5px 13px",
            boxShadow: "0 2px 8px rgba(186,117,23,0.08)",
          }}>
            <i className="ti ti-clock" style={{ fontSize: "14px", color: "#BA7517" }} aria-hidden="true" />
            <span style={{ fontSize: "12.5px", fontWeight: 600, color: "#854F0B", letterSpacing: "0.3px" }}>
              {formatTime(now)}
            </span>
          </div>
        </div>

        {/* ── BODY ── */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

          {/* ── CATEGORY SIDEBAR ── */}
          <div
            className="sidebar-scroll"
            style={{
              width: "104px", flexShrink: 0, overflowY: "auto",
              background: "rgba(255,255,255,0.38)",
              borderRight: "1px solid rgba(255,255,255,0.75)",
            }}
          >
            {Object.keys(MENU).map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat} type="button"
                  className={`cat-btn${active ? " active" : ""}`}
                  onClick={() => { setActiveCategory(cat); setMenuSearch(""); }}
                  style={{
                    width: "100%", padding: "11px 5px", border: "none", cursor: "pointer",
                    fontFamily: "'Inter',sans-serif", fontSize: "10px",
                    fontWeight: active ? 600 : 500,
                    textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "center",
                    background: active ? "rgba(239,159,39,0.12)" : "transparent",
                    color: active ? "#854F0B" : "rgba(133,79,11,0.45)",
                    borderLeft: active ? "3px solid #EF9F27" : "3px solid transparent",
                    borderBottom: "1px solid rgba(186,117,23,0.07)",
                    transition: "all 0.18s", lineHeight: 1.4, position: "relative",
                  }}
                >
                  <i
                    className={`ti ${CATEGORY_ICONS[cat] || "ti-bowl-spoon"}`}
                    style={{
                      fontSize: "18px", display: "block", marginBottom: "4px",
                      color: active ? "#BA7517" : "rgba(186,117,23,0.35)",
                    }}
                    aria-hidden="true"
                  />
                  {cat}
                  {active && (
                    <div style={{
                      position: "absolute", bottom: 0, left: "3px", right: 0,
                      height: "2px", background: "linear-gradient(90deg,#EF9F27,transparent)",
                      animation: "catPulse 0.3s ease forwards", transformOrigin: "left",
                    }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── MENU GRID ── */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Category header */}
            <div style={{
              padding: "8px 12px", flexShrink: 0,
              borderBottom: "1px solid rgba(186,117,23,0.08)",
              background: "rgba(255,255,255,0.3)",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <i
                className={`ti ${CATEGORY_ICONS[activeCategory] || "ti-bowl-spoon"}`}
                style={{ fontSize: "15px", color: "#BA7517" }}
                aria-hidden="true"
              />
              <span style={{ fontSize: "11px", fontWeight: 600, color: "#BA7517", letterSpacing: "0.7px", textTransform: "uppercase" }}>
                {activeCategory}
              </span>
              <span style={{ fontSize: "11px", color: "rgba(186,117,23,0.4)" }}>
                · {filteredMenu.length} items
              </span>
            </div>

            {/* Grid */}
            <div
              className="menu-scroll"
              style={{
                flex: 1, overflowY: "auto", padding: "10px",
                display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "9px", alignContent: "start",
              }}
            >
              {filteredMenu.map((item) => {
                const inOrder  = orderItems.some((o) => o.id === item.id);
                const orderQty = orderItems.find((o) => o.id === item.id)?.qty;
                return (
                  <ItemCard
                    key={item.id}
                    item={item}
                    inOrder={inOrder}
                    orderQty={orderQty}
                    qtyFlash={qtyFlash === item.id}
                    onAdd={(e) => addItem(item, e)}
                  />
                );
              })}

              {filteredMenu.length === 0 && (
                <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "3rem", color: "rgba(186,117,23,0.3)", fontSize: "13px" }}>
                  <i className="ti ti-search-off" style={{ fontSize: "28px", display: "block", marginBottom: "8px" }} aria-hidden="true" />
                  No items found
                </div>
              )}
            </div>
          </div>

          {/* ── ORDER PANEL ── */}
          <div style={{
            width: "385px", flexShrink: 0, display: "flex", flexDirection: "column",
            background: "rgba(255,255,255,0.52)",
            backdropFilter: "blur(24px) saturate(1.3)",
            borderLeft: "1px solid rgba(255,255,255,0.8)",
            boxShadow: "-4px 0 24px rgba(186,117,23,0.06)",
          }}>

            {/* Order header */}
            <div style={{
              padding: "10px 12px", flexShrink: 0,
              borderBottom: "1px solid rgba(186,117,23,0.08)",
              background: "rgba(255,255,255,0.5)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <i className="ti ti-clipboard-list" style={{ fontSize: "16px", color: "#BA7517" }} aria-hidden="true" />
                <span style={{ fontSize: "12.5px", fontWeight: 600, color: "#854F0B" }}>Order</span>
                {orderItems.length > 0 && (
                  <span style={{
                    width: "20px", height: "20px", borderRadius: "50%",
                    background: "linear-gradient(135deg,#FAC775,#BA7517)",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    fontSize: "11px", fontWeight: 700, color: "#fff",
                    boxShadow: "0 2px 6px rgba(186,117,23,0.3)",
                  }}>{orderItems.length}</span>
                )}
              </div>
              {orderItems.length > 0 && (
                <button
                  type="button"
                  onClick={() => setOrderItems([])}
                  style={{
                    background: "rgba(220,58,40,0.08)", border: "1px solid rgba(200,50,30,0.18)",
                    borderRadius: "8px", padding: "4px 9px", cursor: "pointer",
                    fontSize: "11px", color: "#a32d2d", fontFamily: "'Inter',sans-serif",
                    display: "flex", alignItems: "center", gap: "4px",
                  }}
                >
                  <i className="ti ti-trash" style={{ fontSize: "12px" }} aria-hidden="true" /> Clear
                </button>
              )}
            </div>

            {/* Order list */}
            <div className="order-scroll" style={{ flex: 1, overflowY: "auto" }}>
              {orderItems.length === 0 ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem", color: "rgba(186,117,23,0.3)" }}>
                  <i className="ti ti-shopping-cart-off" style={{ fontSize: "34px", display: "block", marginBottom: "10px" }} aria-hidden="true" />
                  <p style={{ fontSize: "12.5px", fontWeight: 300 }}>Tap menu items to add</p>
                </div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,0.4)" }}>
                      {["Item", "Price", "Qty", "Note", "Total", ""].map((h, i) => (
                        <th key={i} style={{
                          padding: "8px 5px", fontSize: "10.5px", fontWeight: 600,
                          color: "rgba(133,79,11,0.45)", textTransform: "uppercase",
                          letterSpacing: "0.5px", textAlign: i === 0 ? "left" : "center",
                          borderBottom: "1px solid rgba(186,117,23,0.08)",
                          paddingLeft: i === 0 ? "12px" : "5px",
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item, idx) => (
                      <>
                        <tr
                          key={item.id}
                          style={{
                            background: idx % 2 === 0 ? "rgba(250,206,122,0.07)" : "transparent",
                            animation: newRowId === item.id ? "rowSlide 0.4s ease" : "none",
                          }}
                        >
                          <td style={{ padding: "8px 5px 8px 12px", fontSize: "12px", fontWeight: 500, color: "#854F0B", borderBottom: "1px solid rgba(186,117,23,0.05)", maxWidth: "110px" }}>
                            {item.name}
                          </td>
                          <td style={{ padding: "8px 5px", fontSize: "11.5px", color: "rgba(133,79,11,0.5)", textAlign: "center", borderBottom: "1px solid rgba(186,117,23,0.05)" }}>
                            {item.price}
                          </td>
                          <td style={{ padding: "8px 4px", textAlign: "center", borderBottom: "1px solid rgba(186,117,23,0.05)" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "3px" }}>
                              <button
                                type="button" className="qty-btn-minus"
                                onClick={() => changeQty(item.id, -1)}
                                style={{ width: "22px", height: "22px", borderRadius: "7px", border: "none", background: "rgba(215,90,48,0.15)", color: "#D85A30", cursor: "pointer", fontSize: "15px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.12s" }}
                              >−</button>
                              <span style={{
                                minWidth: "20px", textAlign: "center", fontSize: "13px",
                                fontWeight: 700, color: "#854F0B",
                                animation: qtyFlash === item.id ? "qtyBounce 0.45s ease" : "none",
                                display: "inline-block",
                              }}>{item.qty}</span>
                              <button
                                type="button" className="qty-btn-plus"
                                onClick={() => changeQty(item.id, 1)}
                                style={{ width: "22px", height: "22px", borderRadius: "7px", border: "none", background: "rgba(24,95,165,0.12)", color: "#185FA5", cursor: "pointer", fontSize: "15px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.12s" }}
                              >+</button>
                            </div>
                          </td>
                          <td style={{ padding: "8px 4px", textAlign: "center", borderBottom: "1px solid rgba(186,117,23,0.05)" }}>
                            {editingRemarkId === item.id ? (
                              <input
                                type="text" value={remarkDraft} autoFocus
                                onChange={(e) => setRemarkDraft(e.target.value)}
                                onKeyDown={(e) => { if (e.key === "Enter") saveRemark(item.id); if (e.key === "Escape") setEditingRemarkId(null); }}
                                onBlur={() => saveRemark(item.id)}
                                style={{ height: "24px", padding: "0 7px", border: "1.5px solid rgba(239,159,39,0.4)", borderRadius: "7px", background: "rgba(255,255,255,0.7)", fontSize: "11px", fontFamily: "'Inter',sans-serif", color: "#854F0B", outline: "none", width: "70px" }}
                              />
                            ) : (
                              <button
                                type="button" title="Add note"
                                onClick={() => { setEditingRemarkId(item.id); setRemarkDraft(item.remark); }}
                                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "15px", color: item.remark ? "#BA7517" : "rgba(186,117,23,0.25)", transition: "color 0.15s", padding: "2px" }}
                              >
                                <i className={item.remark ? "ti ti-pencil-check" : "ti ti-pencil"} aria-hidden="true" />
                              </button>
                            )}
                          </td>
                          <td style={{ padding: "8px 5px", textAlign: "center", fontSize: "12.5px", fontWeight: 700, color: "#854F0B", borderBottom: "1px solid rgba(186,117,23,0.05)" }}>
                            ₹{item.price * item.qty}
                          </td>
                          <td style={{ padding: "8px 5px", textAlign: "center", borderBottom: "1px solid rgba(186,117,23,0.05)" }}>
                            <button
                              type="button" className="remove-btn"
                              onClick={() => removeItem(item.id)}
                              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "15px", color: "rgba(200,50,30,0.3)", transition: "color 0.15s", padding: "2px" }}
                            >
                              <i className="ti ti-x" aria-hidden="true" />
                            </button>
                          </td>
                        </tr>
                        {item.remark && (
                          <tr key={`r-${item.id}`}>
                            <td colSpan={6} style={{ padding: "0 12px 7px", fontSize: "11px", color: "rgba(133,79,11,0.4)", fontStyle: "italic", borderBottom: "1px solid rgba(186,117,23,0.05)" }}>
                              ✏️ {item.remark}
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* ── BOTTOM PANEL ── */}
            <div style={{
              borderTop: "1px solid rgba(186,117,23,0.1)", padding: "10px",
              background: "rgba(255,255,255,0.45)",
              backdropFilter: "blur(12px)",
              flexShrink: 0,
            }}>

              {/* Dish total */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "9px", paddingBottom: "9px", borderBottom: "1px solid rgba(186,117,23,0.1)" }}>
                <span style={{ fontSize: "12px", color: "rgba(133,79,11,0.5)" }}>Dish Total Amount (Rs.) :</span>
                <span style={{ fontSize: "19px", fontWeight: 700, color: "#854F0B" }}>₹ {dishTotal}</span>
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "9px" }}>
                <button type="button" className="abtn" style={actionBtn("#e85a3a","#b82010","rgba(184,32,16,0.25)")} onClick={handleCloseTable}>
                  <i className="ti ti-table-off" style={{ fontSize: "13px" }} aria-hidden="true" /> Close Table
                </button>
                <button type="button" className="abtn" style={actionBtn("#1a8a40","#0f6030","rgba(15,96,48,0.25)")} onClick={handlePrintBill}>
                  <i className="ti ti-printer" style={{ fontSize: "13px" }} aria-hidden="true" /> Print Bill
                </button>
                <button
                  type="button" className="abtn"
                  style={actionBtn(kotSaved ? "#0f7030" : "#1a6a9a", kotSaved ? "#0a5020" : "#1e5a94", kotSaved ? "rgba(15,112,48,0.25)" : "rgba(30,90,148,0.25)")}
                  onClick={handleSaveKOT}
                >
                  <i className={`ti ${kotSaved ? "ti-check" : "ti-device-floppy"}`} style={{ fontSize: "13px" }} aria-hidden="true" />
                  {kotSaved ? "KOT Saved!" : "Save KOT"}
                </button>
                <button type="button" className="abtn" style={actionBtn("#7a3a9a","#5a2080","rgba(90,32,128,0.25)")}>
                  <i className="ti ti-clock-pause" style={{ fontSize: "13px" }} aria-hidden="true" /> Pend
                </button>
                <button type="button" className="abtn" style={actionBtn("#EF9F27","#BA7517","rgba(186,117,23,0.25)")} onClick={onDashboard}>
                  <i className="ti ti-layout-dashboard" style={{ fontSize: "13px" }} aria-hidden="true" /> Dashboard
                </button>
              </div>

              {/* Room + NC Name */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "11px", color: "rgba(133,79,11,0.5)", whiteSpace: "nowrap" }}>Room No:</span>
                  <input
                    type="text" placeholder="Search..." value={roomNo}
                    onChange={(e) => setRoomNo(e.target.value)}
                    className="sm-input"
                    style={{ ...smInput, width: "76px" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", position: "relative", flex: 1 }} ref={ncRef}>
                  <span style={{ fontSize: "11px", color: "rgba(133,79,11,0.5)", whiteSpace: "nowrap" }}>NC Name:</span>
                  <input
                    type="text" placeholder="Type to search..."
                    value={ncSearch || ncName}
                    onChange={(e) => { setNcSearch(e.target.value); setNcName(""); setShowNcDrop(true); }}
                    onFocus={() => setShowNcDrop(true)}
                    className="sm-input"
                    style={{ ...smInput, flex: 1 }}
                  />
                  {showNcDrop && ncFiltered.length > 0 && (
                    <div style={{
                      position: "absolute", bottom: "34px", left: "66px",
                      background: "rgba(255,255,255,0.92)",
                      backdropFilter: "blur(16px)",
                      border: "1px solid rgba(186,117,23,0.15)",
                      borderRadius: "10px",
                      boxShadow: "0 8px 28px rgba(186,117,23,0.15)",
                      zIndex: 50, minWidth: "150px", overflow: "hidden",
                    }}>
                      {ncFiltered.map((n) => (
                        <div
                          key={n} className="nc-opt"
                          onClick={() => { setNcName(n); setNcSearch(""); setShowNcDrop(false); }}
                          style={{ padding: "9px 12px", fontSize: "12.5px", color: "#854F0B", cursor: "pointer", borderBottom: "1px solid rgba(186,117,23,0.06)", transition: "background 0.15s" }}
                        >
                          {n}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* NC Toggle */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "9px" }}>
                <div
                  onClick={() => setIsNC(!isNC)}
                  style={{
                    width: "38px", height: "20px", borderRadius: "11px", cursor: "pointer",
                    flexShrink: 0, position: "relative", transition: "background 0.25s",
                    background: isNC ? "linear-gradient(135deg,#FAC775,#BA7517)" : "rgba(186,117,23,0.12)",
                    boxShadow: isNC ? "0 0 8px rgba(186,117,23,0.35)" : "inset 0 1px 3px rgba(0,0,0,0.08)",
                  }}
                >
                  <div style={{
                    position: "absolute", top: "2px",
                    left: isNC ? "20px" : "2px",
                    width: "16px", height: "16px", borderRadius: "50%",
                    background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                    transition: "left 0.22s",
                  }} />
                </div>
                <span style={{ fontSize: "12px", fontWeight: 600, color: isNC ? "#854F0B" : "rgba(133,79,11,0.4)", transition: "color 0.2s" }}>
                  NC {isNC ? "— No Charge" : ""}
                </span>
              </div>

              {/* Given / Return */}
              <div style={{ display: "flex", gap: "8px" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "10.5px", color: "rgba(133,79,11,0.4)", margin: "0 0 4px", letterSpacing: "0.3px" }}>Given Amount</p>
                  <input
                    type="number" placeholder="₹ 0" value={givenAmt}
                    onChange={(e) => setGivenAmt(e.target.value)}
                    style={{ ...smInput, width: "100%", height: "30px", fontSize: "13px", fontWeight: 600 }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "10.5px", color: "rgba(133,79,11,0.4)", margin: "0 0 4px", letterSpacing: "0.3px" }}>Return Amount</p>
                  <div style={{
                    height: "30px", padding: "0 9px", borderRadius: "8px",
                    background: returnAmt > 0 ? "rgba(29,158,117,0.08)" : "rgba(255,255,255,0.5)",
                    border: `1.5px solid ${returnAmt > 0 ? "rgba(29,158,117,0.3)" : "rgba(186,117,23,0.1)"}`,
                    display: "flex", alignItems: "center", fontSize: "13px", fontWeight: 700,
                    color: returnAmt > 0 ? "#1D9E75" : "rgba(133,79,11,0.3)",
                    transition: "all 0.3s",
                  }}>
                    ₹ {returnAmt}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}