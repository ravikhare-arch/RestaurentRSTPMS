import { useState } from "react";

const ORDER_TYPES = ["Dine In", "Take Away", "Home Delivery", "Banquet", "Room Service"];

const AreaMaster = () => {
  const [areas, setAreas] = useState([
    { id: 1, tableName: "Table A1", orderType: "Dine In" },
    { id: 2, tableName: "Table B2", orderType: "Banquet" },
    { id: 3, tableName: "Terrace 1", orderType: "Dine In" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ tableName: "", orderType: "" });
  const [search, setSearch] = useState("");
  const [showEntries, setShowEntries] = useState(10);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const filtered = areas.filter(
    (a) =>
      a.tableName.toLowerCase().includes(search.toLowerCase()) ||
      a.orderType.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice(0, showEntries);

  const openCreate = () => {
    setEditId(null);
    setForm({ tableName: "", orderType: "" });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditId(item.id);
    setForm({ tableName: item.tableName, orderType: item.orderType });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.tableName.trim() || !form.orderType) return;
    if (editId) {
      setAreas((prev) => prev.map((a) => (a.id === editId ? { ...a, ...form } : a)));
    } else {
      setAreas((prev) => [...prev, { id: Date.now(), ...form }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setAreas((prev) => prev.filter((a) => a.id !== id));
    setDeleteConfirmId(null);
  };

  const wrap = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fde8dc 0%, #f5c0a0 30%, #e89070 65%, #d4623a 100%)",
    fontFamily: "'Inter', sans-serif",
    padding: "1.5rem",
    position: "relative",
    overflow: "auto",
  };

  const card = {
    background: "linear-gradient(160deg, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0.28) 100%)",
    border: "1.5px solid rgba(255,255,255,0.75)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    borderRadius: "20px",
    boxShadow: "0 2px 0 rgba(255,255,255,0.9) inset, 0 24px 60px rgba(140,45,10,0.22), 0 8px 20px rgba(160,55,20,0.16)",
    overflow: "hidden",
    boxSizing: "border-box",
  };

  const inputStyle = (key) => ({
    width: "100%",
    height: "42px",
    padding: "0 12px",
    border: focusedField === key ? "1.5px solid rgba(192,98,58,0.85)" : "1.5px solid rgba(255,255,255,0.6)",
    borderRadius: "9px",
    background: focusedField === key ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.42)",
    backdropFilter: "blur(8px)",
    fontSize: "13.5px",
    color: "#3d1208",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    boxSizing: "border-box",
    boxShadow: focusedField === key ? "0 0 0 3px rgba(192,98,58,0.14)" : "inset 0 1px 3px rgba(0,0,0,0.05)",
    transition: "all 0.2s",
    appearance: "none",
    WebkitAppearance: "none",
  });

  const selectStyle = (key) => ({
    ...inputStyle(key),
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a04020' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    paddingRight: "36px",
    cursor: "pointer",
  });

  const btnPrimary = {
    height: "38px",
    padding: "0 18px",
    background: "linear-gradient(135deg, #e8926a, #c0623a, #a04828)",
    border: "none",
    borderRadius: "9px",
    color: "#fff",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    letterSpacing: "0.3px",
    boxShadow: "0 4px 14px rgba(160,60,20,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
    transition: "transform 0.12s, box-shadow 0.12s",
    whiteSpace: "nowrap",
  };

  const btnGhost = {
    height: "34px",
    padding: "0 14px",
    background: "rgba(255,255,255,0.35)",
    border: "1.5px solid rgba(255,255,255,0.6)",
    borderRadius: "8px",
    color: "#7a3520",
    fontSize: "12.5px",
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    backdropFilter: "blur(6px)",
    transition: "all 0.15s",
    whiteSpace: "nowrap",
  };

  const btnDanger = {
    ...btnGhost,
    background: "rgba(200,50,30,0.1)",
    border: "1.5px solid rgba(200,50,30,0.3)",
    color: "#9a2010",
  };

  const label = {
    fontSize: "11.5px",
    fontWeight: 500,
    color: "rgba(80,30,10,0.72)",
    letterSpacing: "0.3px",
    display: "block",
    marginBottom: "5px",
  };

  const thStyle = {
    padding: "11px 16px",
    fontSize: "11.5px",
    fontWeight: 600,
    color: "rgba(80,30,10,0.65)",
    letterSpacing: "0.4px",
    textAlign: "left",
    borderBottom: "1px solid rgba(160,70,30,0.12)",
    background: "rgba(255,255,255,0.18)",
    textTransform: "uppercase",
  };

  const tdStyle = {
    padding: "11px 16px",
    fontSize: "13px",
    color: "#3d1208",
    borderBottom: "1px solid rgba(160,70,30,0.07)",
    verticalAlign: "middle",
  };

  const orderTypeBadge = (type) => {
    const map = {
      "Dine In":      { bg: "rgba(45,138,78,0.12)",  color: "#1a6636" },
      "Take Away":    { bg: "rgba(30,100,180,0.12)", color: "#1a5a9a" },
      "Home Delivery":{ bg: "rgba(160,80,20,0.12)",  color: "#8a4010" },
      "Banquet":      { bg: "rgba(120,40,150,0.1)",  color: "#6a1a80" },
      "Room Service": { bg: "rgba(30,140,140,0.12)", color: "#0a6060" },
    };
    const s = map[type] || { bg: "rgba(160,70,30,0.12)", color: "#8a3a10" };
    return {
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: "6px",
      fontSize: "12px",
      fontWeight: 500,
      background: s.bg,
      color: s.color,
    };
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" rel="stylesheet" />

      <div style={wrap}>
        {/* bg blobs */}
        {[
          { top: "-70px", left: "-70px", size: "260px", op: 0.11 },
          { bottom: "-80px", right: "-50px", size: "220px", op: 0.09 },
          { top: "42%", right: "6%", size: "100px", op: 0.08 },
        ].map((b, i) => (
          <div key={i} style={{ position: "fixed", borderRadius: "50%", pointerEvents: "none", background: `rgba(255,255,255,${b.op})`, width: b.size, height: b.size, top: b.top, left: b.left, bottom: b.bottom, right: b.right, zIndex: 0 }} />
        ))}

        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* Page Header */}
          <div style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(145deg, rgba(255,255,255,0.65), rgba(255,235,215,0.4))", border: "1.5px solid rgba(255,255,255,0.8)", borderRadius: "11px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 12px rgba(160,60,20,0.16), inset 0 1px 0 rgba(255,255,255,0.9)", flexShrink: 0 }}>
              <i className="ti ti-layout-grid" style={{ fontSize: "20px", color: "#7a3520" }} aria-hidden="true" />
            </div>
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 600, color: "#2d1008", margin: 0, lineHeight: 1.2 }}>
                Area <span style={{ color: "#a04020" }}>Master</span>
              </h1>
              <p style={{ fontSize: "11.5px", color: "rgba(80,30,10,0.5)", margin: 0, fontWeight: 300 }}>Hotel Premier Inn · Restaurant Management</p>
            </div>
          </div>

          <div style={card}>
            {/* Toolbar */}
            <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid rgba(160,70,30,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", background: "rgba(255,255,255,0.12)" }}>
              <button type="button" style={btnPrimary} onClick={openCreate}>
                <i className="ti ti-plus" style={{ fontSize: "15px" }} aria-hidden="true" />
                Create New
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                {/* Show entries */}
                <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <span style={{ fontSize: "12px", color: "rgba(80,30,10,0.55)" }}>Show</span>
                  <select value={showEntries} onChange={(e) => setShowEntries(Number(e.target.value))}
                    style={{ ...selectStyle("se"), width: "70px", height: "34px", fontSize: "12.5px" }}
                    onFocus={() => setFocusedField("se")} onBlur={() => setFocusedField(null)}>
                    {[5, 10, 25, 50].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                  <span style={{ fontSize: "12px", color: "rgba(80,30,10,0.55)" }}>entries</span>
                </div>

                {/* Search */}
                <div style={{ position: "relative" }}>
                  <i className="ti ti-search" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", color: "rgba(150,70,40,0.55)", pointerEvents: "none" }} aria-hidden="true" />
                  <input
                    type="text"
                    placeholder="Search table or order type..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setFocusedField("search")}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...inputStyle("search"), width: "210px", height: "34px", paddingLeft: "32px", fontSize: "12.5px" }}
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "520px" }}>
                <thead>
                  <tr>
                    <th style={{ ...thStyle, width: "60px" }}>Sr No.</th>
                    <th style={thStyle}>Table Name</th>
                    <th style={thStyle}>Order Type</th>
                    <th style={{ ...thStyle, textAlign: "center", width: "140px" }}>Edit / Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ ...tdStyle, textAlign: "center", padding: "2.5rem", color: "rgba(80,30,10,0.4)" }}>
                        <i className="ti ti-database-off" style={{ fontSize: "28px", display: "block", marginBottom: "8px", opacity: 0.4 }} aria-hidden="true" />
                        No records found
                      </td>
                    </tr>
                  ) : (
                    paginated.map((item, idx) => (
                      <tr key={item.id} style={{ background: idx % 2 === 0 ? "rgba(255,255,255,0.08)" : "transparent" }}>
                        <td style={{ ...tdStyle, color: "rgba(80,30,10,0.5)", fontSize: "12.5px" }}>{idx + 1}</td>
                        <td style={tdStyle}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: "rgba(192,98,58,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              <i className="ti ti-armchair" style={{ fontSize: "14px", color: "#c0623a" }} aria-hidden="true" />
                            </div>
                            <span style={{ fontWeight: 500 }}>{item.tableName}</span>
                          </div>
                        </td>
                        <td style={tdStyle}>
                          <span style={orderTypeBadge(item.orderType)}>{item.orderType}</span>
                        </td>
                        <td style={{ ...tdStyle, textAlign: "center" }}>
                          <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                            <button type="button" style={btnGhost} onClick={() => openEdit(item)}>
                              <i className="ti ti-edit" style={{ fontSize: "13px" }} aria-hidden="true" />
                              Edit
                            </button>
                            <button type="button" style={btnDanger} onClick={() => setDeleteConfirmId(item.id)}>
                              <i className="ti ti-trash" style={{ fontSize: "13px" }} aria-hidden="true" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div style={{ padding: "0.9rem 1.25rem", borderTop: "1px solid rgba(160,70,30,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.08)", flexWrap: "wrap", gap: "8px" }}>
              <span style={{ fontSize: "12px", color: "rgba(80,30,10,0.5)" }}>
                Showing {paginated.length === 0 ? 0 : 1} to {paginated.length} of {filtered.length} entries
              </span>
              <div style={{ display: "flex", gap: "6px" }}>
                <button type="button" style={{ ...btnGhost, opacity: 0.5, cursor: "default" }}>Previous</button>
                <button type="button" style={{ ...btnPrimary, height: "34px", padding: "0 16px", fontSize: "12.5px" }}>1</button>
                <button type="button" style={{ ...btnGhost, opacity: filtered.length <= showEntries ? 0.5 : 1 }}>Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* ── CREATE / EDIT MODAL ── */}
        {showModal && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(40,10,2,0.45)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "1rem" }}>
            <div style={{ ...card, width: "100%", maxWidth: "400px", boxShadow: "0 40px 100px rgba(100,30,5,0.45)" }}>
              {/* Modal header */}
              <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid rgba(160,70,30,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.15)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <div style={{ width: "30px", height: "30px", background: "linear-gradient(135deg,rgba(255,255,255,0.6),rgba(255,235,215,0.35))", border: "1px solid rgba(255,255,255,0.75)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <i className={`ti ${editId ? "ti-edit" : "ti-plus"}`} style={{ fontSize: "15px", color: "#7a3520" }} aria-hidden="true" />
                  </div>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 600, color: "#2d1008" }}>
                    {editId ? "Edit Area" : "Create New Area"}
                  </span>
                </div>
                <button type="button" onClick={() => setShowModal(false)}
                  style={{ background: "rgba(200,50,30,0.1)", border: "1px solid rgba(200,50,30,0.25)", borderRadius: "7px", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#9a2010" }}>
                  <i className="ti ti-x" style={{ fontSize: "14px" }} aria-hidden="true" />
                </button>
              </div>

              {/* Modal body */}
              <div style={{ padding: "1.25rem" }}>
                {/* Order Type */}
                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="m-otype" style={label}>Order Type</label>
                  <select id="m-otype" value={form.orderType}
                    onChange={(e) => setForm((f) => ({ ...f, orderType: e.target.value }))}
                    onFocus={() => setFocusedField("motype")}
                    onBlur={() => setFocusedField(null)}
                    style={selectStyle("motype")}>
                    <option value="">— Select order type —</option>
                    {ORDER_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                {/* Table Name */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <label htmlFor="m-tname" style={label}>Table Name / Area Name</label>
                  <input id="m-tname" type="text" placeholder="e.g. Table A1, Terrace 2, Banquet Hall"
                    value={form.tableName}
                    onChange={(e) => setForm((f) => ({ ...f, tableName: e.target.value }))}
                    onFocus={() => setFocusedField("mtname")}
                    onBlur={() => setFocusedField(null)}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    style={inputStyle("mtname")} />
                </div>

                {/* Buttons */}
                <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                  <button type="button" style={btnGhost} onClick={() => setShowModal(false)}>
                    <i className="ti ti-x" style={{ fontSize: "13px" }} aria-hidden="true" />
                    Close
                  </button>
                  <button type="button" style={{ ...btnPrimary, opacity: (!form.tableName.trim() || !form.orderType) ? 0.5 : 1, cursor: (!form.tableName.trim() || !form.orderType) ? "not-allowed" : "pointer" }}
                    onClick={handleSave}
                    disabled={!form.tableName.trim() || !form.orderType}>
                    <i className={`ti ${editId ? "ti-check" : "ti-plus"}`} style={{ fontSize: "14px" }} aria-hidden="true" />
                    {editId ? "Update" : "Add"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── DELETE CONFIRM MODAL ── */}
        {deleteConfirmId && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(40,10,2,0.45)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "1rem" }}>
            <div style={{ ...card, width: "100%", maxWidth: "340px", boxShadow: "0 40px 100px rgba(100,30,5,0.45)" }}>
              <div style={{ padding: "1.5rem", textAlign: "center" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(200,50,30,0.12)", border: "1.5px solid rgba(200,50,30,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                  <i className="ti ti-trash" style={{ fontSize: "22px", color: "#9a2010" }} aria-hidden="true" />
                </div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 600, color: "#2d1008", marginBottom: "6px" }}>Delete Area?</p>
                <p style={{ fontSize: "12.5px", color: "rgba(80,30,10,0.55)", marginBottom: "1.5rem", fontWeight: 300, lineHeight: 1.6 }}>
                  This action cannot be undone. Are you sure you want to delete <strong style={{ color: "#a04020" }}>
                    {areas.find((a) => a.id === deleteConfirmId)?.tableName}
                  </strong>?
                </p>
                <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                  <button type="button" style={btnGhost} onClick={() => setDeleteConfirmId(null)}>
                    Cancel
                  </button>
                  <button type="button" style={{ ...btnDanger, height: "38px", padding: "0 18px", fontSize: "13px" }}
                    onClick={() => handleDelete(deleteConfirmId)}>
                    <i className="ti ti-trash" style={{ fontSize: "13px" }} aria-hidden="true" />
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AreaMaster;