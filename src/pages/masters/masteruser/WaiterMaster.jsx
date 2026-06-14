import { useState } from "react";

const WaiterMaster = () => {
  const [waiters, setWaiters] = useState([
    { id: 1, name: "Kapil Sir" },
    { id: 2, name: "Mohit" },
    { id: 3, name: "Honey Sir" },
  ]);

  const [showModal, setShowModal]       = useState(false);
  const [editId, setEditId]             = useState(null);
  const [formName, setFormName]         = useState("");
  const [search, setSearch]             = useState("");
  const [showEntries, setShowEntries]   = useState(10);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [sortDir, setSortDir]           = useState(1); // 1 = asc, -1 = desc

  const filtered = waiters
    .filter((w) => w.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortDir * a.name.localeCompare(b.name));

  const paginated = filtered.slice(0, showEntries);

  const openCreate = () => { setEditId(null); setFormName(""); setShowModal(true); };
  const openEdit   = (item) => { setEditId(item.id); setFormName(item.name); setShowModal(true); };

  const handleSave = () => {
    if (!formName.trim()) return;
    if (editId) {
      setWaiters((p) => p.map((w) => (w.id === editId ? { ...w, name: formName.trim() } : w)));
    } else {
      setWaiters((p) => [...p, { id: Date.now(), name: formName.trim() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setWaiters((p) => p.filter((w) => w.id !== id));
    setDeleteConfirmId(null);
  };

  /* ─── Styles ─── */
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
    width: "100%", height: "42px", padding: "0 12px",
    border: focusedField === key ? "1.5px solid rgba(192,98,58,0.85)" : "1.5px solid rgba(255,255,255,0.6)",
    borderRadius: "9px",
    background: focusedField === key ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.42)",
    backdropFilter: "blur(8px)", fontSize: "13.5px", color: "#3d1208",
    fontFamily: "'Inter', sans-serif", outline: "none", boxSizing: "border-box",
    boxShadow: focusedField === key ? "0 0 0 3px rgba(192,98,58,0.14)" : "inset 0 1px 3px rgba(0,0,0,0.05)",
    transition: "all 0.2s", appearance: "none",
  });

  const selectStyle = (key) => ({
    ...inputStyle(key),
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a04020' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
    paddingRight: "36px", cursor: "pointer",
  });

  const btnPrimary = {
    height: "38px", padding: "0 18px",
    background: "linear-gradient(135deg, #e8926a, #c0623a, #a04828)",
    border: "none", borderRadius: "9px", color: "#fff",
    fontSize: "13px", fontWeight: 500, cursor: "pointer",
    fontFamily: "'Inter', sans-serif", display: "inline-flex",
    alignItems: "center", gap: "6px", letterSpacing: "0.3px",
    boxShadow: "0 4px 14px rgba(160,60,20,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
    transition: "transform 0.12s", whiteSpace: "nowrap",
  };

  const btnGhost = {
    height: "34px", padding: "0 14px",
    background: "rgba(255,255,255,0.35)",
    border: "1.5px solid rgba(255,255,255,0.6)",
    borderRadius: "8px", color: "#7a3520", fontSize: "12.5px",
    fontWeight: 500, cursor: "pointer", fontFamily: "'Inter', sans-serif",
    display: "inline-flex", alignItems: "center", gap: "5px",
    backdropFilter: "blur(6px)", transition: "all 0.15s", whiteSpace: "nowrap",
  };

  const iconBtn = (color, bg, border) => ({
    width: "32px", height: "32px", borderRadius: "8px",
    background: bg, border: `1.5px solid ${border}`,
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", transition: "transform 0.12s, box-shadow 0.12s",
    boxShadow: `0 2px 8px ${border}40`,
  });

  const thStyle = {
    padding: "11px 16px", fontSize: "11.5px", fontWeight: 600,
    color: "rgba(80,30,10,0.65)", letterSpacing: "0.4px", textAlign: "left",
    borderBottom: "1px solid rgba(160,70,30,0.12)",
    background: "rgba(255,255,255,0.18)", textTransform: "uppercase",
    userSelect: "none",
  };

  const tdStyle = {
    padding: "12px 16px", fontSize: "13px", color: "#3d1208",
    borderBottom: "1px solid rgba(160,70,30,0.07)", verticalAlign: "middle",
  };

  const label = {
    fontSize: "11.5px", fontWeight: 500, color: "rgba(80,30,10,0.72)",
    letterSpacing: "0.3px", display: "block", marginBottom: "5px",
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" rel="stylesheet" />

      <div style={wrap}>
        {/* bg blobs */}
        {[
          { top:"-70px", left:"-70px", size:"260px", op:0.11 },
          { bottom:"-80px", right:"-50px", size:"220px", op:0.09 },
          { top:"44%", right:"5%", size:"100px", op:0.08 },
        ].map((b,i) => (
          <div key={i} style={{ position:"fixed", borderRadius:"50%", pointerEvents:"none",
            background:`rgba(255,255,255,${b.op})`, width:b.size, height:b.size,
            top:b.top, left:b.left, bottom:b.bottom, right:b.right, zIndex:0 }} />
        ))}

        <div style={{ maxWidth:"820px", margin:"0 auto", position:"relative", zIndex:1 }}>

          {/* Page Header */}
          <div style={{ marginBottom:"1.25rem", display:"flex", alignItems:"center", gap:"12px" }}>
            <div style={{ width:"40px", height:"40px",
              background:"linear-gradient(145deg, rgba(255,255,255,0.65), rgba(255,235,215,0.4))",
              border:"1.5px solid rgba(255,255,255,0.8)", borderRadius:"11px",
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 3px 12px rgba(160,60,20,0.16), inset 0 1px 0 rgba(255,255,255,0.9)", flexShrink:0 }}>
              <i className="ti ti-user-check" style={{ fontSize:"20px", color:"#7a3520" }} aria-hidden="true" />
            </div>
            <div>
              <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:"20px", fontWeight:600,
                color:"#2d1008", margin:0, lineHeight:1.2 }}>
                Waiter / NC <span style={{ color:"#a04020" }}>Master</span>
              </h1>
              <p style={{ fontSize:"11.5px", color:"rgba(80,30,10,0.5)", margin:0, fontWeight:300 }}>
                Hotel Premier Inn · Restaurant Management
              </p>
            </div>
          </div>

          <div style={card}>
            {/* Toolbar */}
            <div style={{ padding:"1rem 1.25rem", borderBottom:"1px solid rgba(160,70,30,0.1)",
              display:"flex", alignItems:"center", justifyContent:"space-between",
              flexWrap:"wrap", gap:"10px", background:"rgba(255,255,255,0.12)" }}>
              <button type="button" style={btnPrimary} onClick={openCreate}>
                <i className="ti ti-plus" style={{ fontSize:"15px" }} aria-hidden="true" />
                Create New
              </button>

              <div style={{ display:"flex", alignItems:"center", gap:"10px", flexWrap:"wrap" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"7px" }}>
                  <span style={{ fontSize:"12px", color:"rgba(80,30,10,0.55)" }}>Show</span>
                  <select value={showEntries} onChange={(e) => setShowEntries(Number(e.target.value))}
                    style={{ ...selectStyle("se"), width:"70px", height:"34px", fontSize:"12.5px" }}
                    onFocus={() => setFocusedField("se")} onBlur={() => setFocusedField(null)}>
                    {[5,10,25,50].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                  <span style={{ fontSize:"12px", color:"rgba(80,30,10,0.55)" }}>entries</span>
                </div>

                <div style={{ position:"relative" }}>
                  <i className="ti ti-search" style={{ position:"absolute", left:"10px", top:"50%",
                    transform:"translateY(-50%)", fontSize:"14px", color:"rgba(150,70,40,0.55)",
                    pointerEvents:"none" }} aria-hidden="true" />
                  <input type="text" placeholder="Search name..." value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setFocusedField("search")}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...inputStyle("search"), width:"200px", height:"34px",
                      paddingLeft:"32px", fontSize:"12.5px" }} />
                </div>
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", minWidth:"420px" }}>
                <thead>
                  <tr>
                    <th style={{ ...thStyle, width:"80px" }}>
                      <span style={{ display:"flex", alignItems:"center", gap:"5px" }}>
                        Sr No.
                        <i className="ti ti-arrows-sort" style={{ fontSize:"12px", opacity:0.5 }} aria-hidden="true" />
                      </span>
                    </th>
                    <th style={thStyle}>
                      <span style={{ display:"flex", alignItems:"center", gap:"5px", cursor:"pointer" }}
                        onClick={() => setSortDir((d) => d * -1)}>
                        Table / Waiter Name
                        <i className={`ti ${sortDir === 1 ? "ti-sort-ascending" : "ti-sort-descending"}`}
                          style={{ fontSize:"13px", color:"rgba(160,70,30,0.6)" }} aria-hidden="true" />
                      </span>
                    </th>
                    <th style={{ ...thStyle, textAlign:"center", width:"120px" }}>
                      <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"5px" }}>
                        Edit / Delete
                        <i className="ti ti-arrows-sort" style={{ fontSize:"12px", opacity:0.5 }} aria-hidden="true" />
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={3} style={{ ...tdStyle, textAlign:"center", padding:"2.5rem",
                        color:"rgba(80,30,10,0.4)" }}>
                        <i className="ti ti-user-off" style={{ fontSize:"28px", display:"block",
                          marginBottom:"8px", opacity:0.4 }} aria-hidden="true" />
                        No records found
                      </td>
                    </tr>
                  ) : (
                    paginated.map((item, idx) => (
                      <tr key={item.id}
                        style={{ background: idx % 2 === 0 ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.04)",
                          transition:"background 0.15s" }}>
                        {/* Sr No */}
                        <td style={{ ...tdStyle, color:"rgba(80,30,10,0.45)", fontSize:"12.5px",
                          fontWeight:500, textAlign:"center" }}>
                          <div style={{ width:"26px", height:"26px", borderRadius:"7px",
                            background:"rgba(192,98,58,0.1)", display:"inline-flex",
                            alignItems:"center", justifyContent:"center", fontSize:"12px",
                            color:"#a04020", fontWeight:600 }}>
                            {idx + 1}
                          </div>
                        </td>

                        {/* Name */}
                        <td style={tdStyle}>
                          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                            <div style={{ width:"34px", height:"34px", borderRadius:"9px",
                              background:"linear-gradient(135deg, rgba(232,146,106,0.2), rgba(192,98,58,0.12))",
                              border:"1px solid rgba(192,98,58,0.2)",
                              display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                              <span style={{ fontSize:"13px", fontWeight:600, color:"#c0623a" }}>
                                {item.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span style={{ fontWeight:500, color:"#2d1008" }}>{item.name}</span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td style={{ ...tdStyle, textAlign:"center" }}>
                          <div style={{ display:"flex", gap:"8px", justifyContent:"center" }}>
                            <button type="button" aria-label={`Edit ${item.name}`}
                              style={iconBtn("#fff", "rgba(34,140,80,0.15)", "rgba(34,140,80,0.45)")}
                              onClick={() => openEdit(item)}
                              onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 4px 14px rgba(34,140,80,0.3)" }}
                              onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 8px rgba(34,140,80,0.2)" }}>
                              <i className="ti ti-edit" style={{ fontSize:"15px", color:"#1a7a40" }} aria-hidden="true" />
                            </button>
                            <button type="button" aria-label={`Delete ${item.name}`}
                              style={iconBtn("#fff", "rgba(200,50,30,0.13)", "rgba(200,50,30,0.4)")}
                              onClick={() => setDeleteConfirmId(item.id)}
                              onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 4px 14px rgba(200,50,30,0.3)" }}
                              onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 8px rgba(200,50,30,0.2)" }}>
                              <i className="ti ti-trash" style={{ fontSize:"15px", color:"#9a2010" }} aria-hidden="true" />
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
            <div style={{ padding:"0.9rem 1.25rem", borderTop:"1px solid rgba(160,70,30,0.08)",
              display:"flex", alignItems:"center", justifyContent:"space-between",
              background:"rgba(255,255,255,0.08)", flexWrap:"wrap", gap:"8px" }}>
              <span style={{ fontSize:"12px", color:"rgba(80,30,10,0.5)" }}>
                Showing {paginated.length === 0 ? 0 : 1} to {paginated.length} of {filtered.length} entries
              </span>
              <div style={{ display:"flex", gap:"6px", alignItems:"center" }}>
                <button type="button" style={{ ...btnGhost, opacity:0.45, cursor:"default" }}>Previous</button>
                <div style={{ width:"32px", height:"32px", borderRadius:"8px",
                  background:"linear-gradient(135deg,#e8926a,#c0623a)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"13px", fontWeight:600, color:"#fff",
                  boxShadow:"0 3px 10px rgba(160,60,20,0.35)" }}>1</div>
                <button type="button" style={{ ...btnGhost, opacity: filtered.length <= showEntries ? 0.45 : 1,
                  cursor: filtered.length <= showEntries ? "default" : "pointer" }}>Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* ── CREATE / EDIT MODAL ── */}
        {showModal && (
          <div style={{ position:"fixed", inset:0, background:"rgba(40,10,2,0.48)",
            backdropFilter:"blur(7px)", display:"flex", alignItems:"center",
            justifyContent:"center", zIndex:100, padding:"1rem" }}>
            <div style={{ ...card, width:"100%", maxWidth:"380px",
              boxShadow:"0 40px 100px rgba(100,30,5,0.45)" }}>

              {/* Modal header */}
              <div style={{ padding:"1rem 1.25rem", borderBottom:"1px solid rgba(160,70,30,0.1)",
                display:"flex", alignItems:"center", justifyContent:"space-between",
                background:"rgba(255,255,255,0.15)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"9px" }}>
                  <div style={{ width:"30px", height:"30px",
                    background:"linear-gradient(135deg,rgba(255,255,255,0.6),rgba(255,235,215,0.35))",
                    border:"1px solid rgba(255,255,255,0.75)", borderRadius:"8px",
                    display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <i className={`ti ${editId ? "ti-user-edit" : "ti-user-plus"}`}
                      style={{ fontSize:"15px", color:"#7a3520" }} aria-hidden="true" />
                  </div>
                  <span style={{ fontFamily:"'Playfair Display', serif", fontSize:"16px",
                    fontWeight:600, color:"#2d1008" }}>
                    {editId ? "Edit Waiter" : "Add New Waiter"}
                  </span>
                </div>
                <button type="button" onClick={() => setShowModal(false)}
                  style={{ background:"rgba(200,50,30,0.1)", border:"1px solid rgba(200,50,30,0.25)",
                    borderRadius:"7px", width:"28px", height:"28px",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    cursor:"pointer", color:"#9a2010" }}>
                  <i className="ti ti-x" style={{ fontSize:"14px" }} aria-hidden="true" />
                </button>
              </div>

              {/* Modal body */}
              <div style={{ padding:"1.25rem" }}>
                <div style={{ marginBottom:"1.25rem" }}>
                  <label htmlFor="m-name" style={label}>Waiter / NC Name</label>
                  <div style={{ position:"relative" }}>
                    <i className="ti ti-user" style={{ position:"absolute", left:"12px", top:"50%",
                      transform:"translateY(-50%)", fontSize:"15px", color:"rgba(150,70,40,0.6)",
                      pointerEvents:"none" }} aria-hidden="true" />
                    <input id="m-name" type="text"
                      placeholder="e.g. Kapil Sir, Mohit, Honey Sir"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      onFocus={() => setFocusedField("mname")}
                      onBlur={() => setFocusedField(null)}
                      onKeyDown={(e) => e.key === "Enter" && handleSave()}
                      style={{ ...inputStyle("mname"), paddingLeft:"38px" }} />
                  </div>
                </div>

                {/* Buttons */}
                <div style={{ display:"flex", gap:"8px", justifyContent:"flex-end" }}>
                  <button type="button"
                    style={{ ...btnGhost, height:"38px", padding:"0 16px", fontSize:"13px" }}
                    onClick={() => setShowModal(false)}>
                    <i className="ti ti-x" style={{ fontSize:"13px" }} aria-hidden="true" />
                    Close
                  </button>
                  <button type="button"
                    style={{ ...btnPrimary,
                      opacity: !formName.trim() ? 0.5 : 1,
                      cursor: !formName.trim() ? "not-allowed" : "pointer" }}
                    onClick={handleSave}
                    disabled={!formName.trim()}>
                    <i className={`ti ${editId ? "ti-check" : "ti-user-plus"}`}
                      style={{ fontSize:"14px" }} aria-hidden="true" />
                    {editId ? "Update" : "Add Waiter"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── DELETE CONFIRM MODAL ── */}
        {deleteConfirmId && (
          <div style={{ position:"fixed", inset:0, background:"rgba(40,10,2,0.48)",
            backdropFilter:"blur(7px)", display:"flex", alignItems:"center",
            justifyContent:"center", zIndex:100, padding:"1rem" }}>
            <div style={{ ...card, width:"100%", maxWidth:"320px",
              boxShadow:"0 40px 100px rgba(100,30,5,0.45)" }}>
              <div style={{ padding:"1.5rem", textAlign:"center" }}>
                <div style={{ width:"48px", height:"48px", borderRadius:"50%",
                  background:"rgba(200,50,30,0.12)", border:"1.5px solid rgba(200,50,30,0.28)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  margin:"0 auto 1rem" }}>
                  <i className="ti ti-trash" style={{ fontSize:"22px", color:"#9a2010" }} aria-hidden="true" />
                </div>
                <p style={{ fontFamily:"'Playfair Display', serif", fontSize:"16px",
                  fontWeight:600, color:"#2d1008", margin:"0 0 6px" }}>Delete Record?</p>
                <p style={{ fontSize:"12.5px", color:"rgba(80,30,10,0.55)", margin:"0 0 1.5rem",
                  fontWeight:300, lineHeight:1.6 }}>
                  Are you sure you want to delete{" "}
                  <strong style={{ color:"#a04020" }}>
                    {waiters.find((w) => w.id === deleteConfirmId)?.name}
                  </strong>?
                  This cannot be undone.
                </p>
                <div style={{ display:"flex", gap:"8px", justifyContent:"center" }}>
                  <button type="button"
                    style={{ ...btnGhost, height:"38px", padding:"0 16px", fontSize:"13px" }}
                    onClick={() => setDeleteConfirmId(null)}>
                    Cancel
                  </button>
                  <button type="button"
                    style={{ height:"38px", padding:"0 18px",
                      background:"linear-gradient(135deg,#e85a3a,#c03020,#a02010)",
                      border:"none", borderRadius:"9px", color:"#fff", fontSize:"13px",
                      fontWeight:500, cursor:"pointer", fontFamily:"'Inter', sans-serif",
                      display:"inline-flex", alignItems:"center", gap:"6px",
                      boxShadow:"0 4px 14px rgba(180,40,20,0.35)" }}
                    onClick={() => handleDelete(deleteConfirmId)}>
                    <i className="ti ti-trash" style={{ fontSize:"13px" }} aria-hidden="true" />
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

export default WaiterMaster;