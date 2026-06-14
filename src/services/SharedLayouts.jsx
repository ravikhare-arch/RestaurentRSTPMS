import { useEffect, useState } from "react";

// FIX: Yahan 'inputStyle' missing tha, use add kar diya hai taaki DataTable crash na ho
import { C, glassCard, Field, Input, inputStyle } from "./DesignTokens";

// // ─── TOPBAR COMPONENT ────────────────────────────────────────────────────────
// export function TopBar({ title, view, setView }) {
//   return (
//     <div style={{ ...glassCard, borderRadius: "16px 16px 0 0", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 0, borderBottom: `1px solid ${C.border}` }}>
//       <div style={{ display: "flex", gap: 8 }}>
//         {["ADD", "LIST"].map(v => (
//           <button key={v} onClick={() => setView(v)} style={{ background: view === v ? C.terra : "rgba(255,255,255,0.5)", color: view === v ? "#fff" : C.textMid, border: `1px solid ${view === v ? C.terra : C.border}`, borderRadius: 8, padding: "6px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.2s", boxShadow: view === v ? `0 2px 8px ${C.terra}44` : "none" }}>{v}</button>
//         ))}
//       </div>
//       <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{title}</span>
//       <div style={{ display: "flex", gap: 8 }}>
//         <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.6)", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 15 }}>🔗</div>
//         <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.amber, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 15 }}>−</div>
//       </div>
//     </div>
//   );
// }
// import { useEffect, useState } from "react";

// FIX: Yahan 'inputStyle' missing tha, use add kar diya hai taaki DataTable crash na ho
// import { C, glassCard, Field, Input, inputStyle } from "../../../../src/services/DesignTokens.js";

// ─── TOPBAR COMPONENT ────────────────────────────────────────────────────────
export function TopBar({ title, view, setView }) {
  const isFormView = view === "ADD";

  return (
    <div style={{ padding: "4px 0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
      <div>
        <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>{title}</div>
        <div style={{ fontSize: 12, color: C.textLight, marginTop: 4 }}>
          {isFormView ? `Enter ${title.toLowerCase()} details` : `Manage ${title.toLowerCase()} records`}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setView(isFormView ? "LIST" : "ADD")}
        style={{
          background: isFormView ? "rgba(255,255,255,0.72)" : C.terra,
          color: isFormView ? C.textMid : C.white,
          border: `1px solid ${isFormView ? C.border : C.terra}`,
          borderRadius: 9,
          padding: "9px 18px",
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: isFormView ? "none" : `0 3px 10px ${C.terra}44`,
        }}
      >
        {isFormView ? "Back to List" : "+ Add New"}
      </button>
    </div>
  );
}

// ─── DATA TABLE COMPONENT ────────────────────────────────────────────────────
export function DataTable({ columns, rows, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchFocused, setSearchFocused] = useState(false);

  const filtered = rows.filter(r =>
    columns.some(c => String(r[c.key] || "").toLowerCase().includes(search.toLowerCase()))
  );

  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const va = String(a[sortKey] || ""), vb = String(b[sortKey] || "")
        return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      })
    : filtered;

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const paginated = sorted.slice((page - 1) * perPage, page * perPage);

  function toggleSort(key) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  }

  useEffect(() => { setPage(1); }, [search]);

  const th = {
    padding: "10px 14px", fontSize: 11, fontWeight: 700, color: C.textLight,
    textAlign: "left", borderBottom: `1px solid ${C.border}`,
    letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap",
    background: "rgba(255,255,255,0.45)", cursor: "pointer", userSelect: "none",
  };
  const td = { padding: "11px 14px", fontSize: 13, color: C.text, borderBottom: `1px solid rgba(201,104,64,0.07)` };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.textMid }}>
          Show
          <select value={perPage} onChange={e => { setPerPage(Number(e.target.value)); setPage(1); }} style={{ ...inputStyle(false), width: 70, padding: "6px 8px" }}>
            {[5, 10, 25].map(n => <option key={n}>{n}</option>)}
          </select>
          entries
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, color: C.textMid }}>Search:</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Type to search…"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{ ...inputStyle(searchFocused), width: 200 }}
          />
        </div>
      </div>

      <div style={{ overflowX: "auto", borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...th, width: 40 }}>#</th>
              {columns.map(c => (
                <th key={c.key} style={th} onClick={() => toggleSort(c.key)}>
                  {c.label} <span style={{ opacity: sortKey === c.key ? 1 : 0.35, fontSize: 10 }}>{sortKey === c.key ? (sortDir === "asc" ? "↑" : "↓") : "⇅"}</span>
                </th>
              ))}
              <th style={{ ...th, textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr><td colSpan={columns.length + 2} style={{ ...td, textAlign: "center", padding: 32, color: C.textLight }}>No records found.</td></tr>
            ) : paginated.map((row, i) => (
              <tr key={row.id}
                style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.3)", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.55)"}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.3)"}
              >
                <td style={{ ...td, color: C.textLight, fontWeight: 600 }}>{(page - 1) * perPage + i + 1}</td>
                {columns.map(c => <td key={c.key} style={td}>{row[c.key] ?? "—"}</td>)}
                <td style={{ ...td, textAlign: "center" }}>
                  <button onClick={() => onEdit(row)} style={{ background: "rgba(42,157,143,0.1)", color: C.teal, border: "1px solid rgba(42,157,143,0.3)", borderRadius: 7, padding: "4px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", marginRight: 6 }}>✏️ Edit</button>
                  <button onClick={() => onDelete(row.id)} style={{ background: "rgba(201,74,106,0.1)", color: C.rose, border: "1px solid rgba(201,74,106,0.3)", borderRadius: 7, padding: "4px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13, color: C.textMid }}>
        <span>Showing {sorted.length === 0 ? 0 : (page - 1) * perPage + 1}–{Math.min(page * perPage, sorted.length)} of {sorted.length} entries</span>
        <div style={{ display: "flex", gap: 6 }}>
          {["← Prev", ...Array.from({ length: totalPages }, (_, i) => String(i + 1)), "Next →"].map((label, idx) => {
            const isNum = !isNaN(Number(label));
            const pageNum = isNum ? Number(label) : (label.includes("Prev") ? page - 1 : page + 1);
            const active = isNum && Number(label) === page;
            const disabled = (label.includes("Prev") && page === 1) || (label.includes("Next") && page === totalPages);
            return (
              <button key={idx} onClick={() => !disabled && setPage(pageNum)}
                disabled={disabled}
                style={{ background: active ? C.terra : "rgba(255,255,255,0.55)", color: active ? "#fff" : disabled ? "#ccc" : C.textMid, border: `1px solid ${active ? C.terra : C.border}`, borderRadius: 7, padding: "5px 12px", fontSize: 12, fontWeight: active ? 700 : 400, cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.18s", boxShadow: active ? `0 2px 6px ${C.terra}44` : "none" }}>
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── TOAST COMPONENT ─────────────────────────────────────────────────────────
export function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 2800); return () => clearTimeout(t); }, [msg]);
  if (!msg) return null;
  const color = type === "success" ? C.sage : type === "error" ? C.danger : C.terra;
  return (
    <div style={{ position: "fixed", top: 20, right: 24, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", border: `1px solid ${color}55`, borderRadius: 12, padding: "12px 20px", fontSize: 13, fontWeight: 600, color, zIndex: 9999, boxShadow: "0 4px 24px rgba(180,100,60,0.15)", display: "flex", alignItems: "center", gap: 8, animation: "slideIn 0.3s ease" }}>
      {type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"} {msg}
      <button onClick={onClose} style={{ background: "none", border: "none", color, cursor: "pointer", fontSize: 15, marginLeft: 4 }}>×</button>
    </div>
  );
}

// ─── ADD BUTTON COMPONENT ────────────────────────────────────────────────────
export function AddBtn({ label, onClick, loading }) {
  return (
    <button onClick={onClick} disabled={loading} style={{ background: loading ? "#ccc" : C.terra, color: "#fff", border: "none", borderRadius: 10, padding: "11px 40px", fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", boxShadow: `0 4px 14px ${C.terra}44`, transition: "all 0.2s", letterSpacing: "0.04em" }}>
      {loading ? "Saving…" : label}
    </button>
  );
}

