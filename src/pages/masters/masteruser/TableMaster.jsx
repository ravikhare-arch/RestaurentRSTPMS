import { useState } from "react";

const AREAS = ["Indoor", "Outdoor", "Terrace", "Private"];
const ORDER_TYPES = ["Dine In", "Takeaway", "Delivery"];

const initialTables = [
  { id: 1, name: "Table A1", capacity: 4, area: "Indoor", orderType: "Dine In", status: "Active" },
  { id: 2, name: "Table B2", capacity: 2, area: "Outdoor", orderType: "Dine In", status: "Active" },
  { id: 3, name: "Table C3", capacity: 6, area: "Terrace", orderType: "Dine In", status: "Inactive" },
];

const emptyForm = { orderType: "", name: "", capacity: "", area: "" };

export default function TableMaster() {
  const [tables, setTables] = useState(initialTables);
  const [nextId, setNextId] = useState(4);
  const [search, setSearch] = useState("");
  const [showEntries, setShowEntries] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const filtered = tables.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const va = a[sortKey];
        const vb = b[sortKey];
        const cmp = typeof va === "number" ? va - vb : String(va).localeCompare(String(vb));
        return sortDir === "asc" ? cmp : -cmp;
      })
    : filtered;

  const paginated = sorted.slice(0, showEntries);

  function handleSort(key) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  }

  function openAdd() {
    setForm(emptyForm);
    setEditId(null);
    setErrors({});
    setShowModal(true);
  }

  function openEdit(t) {
    setForm({ orderType: t.orderType, name: t.name, capacity: String(t.capacity), area: t.area });
    setEditId(t.id);
    setErrors({});
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setForm(emptyForm);
    setEditId(null);
    setErrors({});
  }

  function validate() {
    const e = {};
    if (!form.orderType) e.orderType = "Required";
    if (!form.name.trim()) e.name = "Required";
    if (!form.capacity || isNaN(form.capacity) || Number(form.capacity) < 1) e.capacity = "Enter a valid number";
    if (!form.area) e.area = "Required";
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    if (editId !== null) {
      setTables((prev) =>
        prev.map((t) =>
          t.id === editId
            ? { ...t, name: form.name.trim(), capacity: Number(form.capacity), area: form.area, orderType: form.orderType }
            : t
        )
      );
    } else {
      setTables((prev) => [
        ...prev,
        { id: nextId, name: form.name.trim(), capacity: Number(form.capacity), area: form.area, orderType: form.orderType, status: "Active" },
      ]);
      setNextId((n) => n + 1);
    }
    closeModal();
  }

  function handleDelete(id) {
    if (window.confirm("Delete this table?")) {
      setTables((prev) => prev.filter((t) => t.id !== id));
    }
  }

  function toggleStatus(id) {
    setTables((prev) =>
      prev.map((t) => t.id === id ? { ...t, status: t.status === "Active" ? "Inactive" : "Active" } : t)
    );
  }

  const SortIcon = ({ col }) => (
    <span style={{ marginLeft: 4, opacity: sortKey === col ? 1 : 0.4, fontSize: 11 }}>
      {sortKey === col ? (sortDir === "asc" ? "↑" : "↓") : "⇅"}
    </span>
  );

  const th = {
    padding: "12px 16px",
    textAlign: "left",
    fontSize: 13,
    fontWeight: 500,
    color: "#fff",
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    background: "#4a2018",
  };

  const td = {
    padding: "11px 16px",
    fontSize: 13,
    color: "#4a2018",
    borderBottom: "0.5px solid #f0e4de",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5ede8", fontFamily: "system-ui, sans-serif" }}>
      {/* Top bar */}
      <div style={{ background: "#fff", borderBottom: "0.5px solid #e8d8d0", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 600, color: "#4a2018" }}>Table Master</div>
          <div style={{ fontSize: 13, color: "#b07060", marginTop: 2 }}>Manage restaurant tables</div>
        </div>
        <button
          onClick={openAdd}
          style={{ background: "#c96840", color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
        >
          + Create New
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: 24 }}>
        <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid #e8d8d0", overflow: "hidden" }}>
          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: "0.5px solid #f0e0d8" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#7a5040" }}>
              Show{" "}
              <select
                value={showEntries}
                onChange={(e) => setShowEntries(Number(e.target.value))}
                style={{ border: "0.5px solid #e0c8bc", borderRadius: 6, padding: "4px 8px", fontSize: 13, color: "#4a2018" }}
              >
                {[10, 25, 50].map((n) => <option key={n}>{n}</option>)}
              </select>{" "}
              entries
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#7a5040" }}>
              Search:{" "}
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Table Name"
                style={{ border: "0.5px solid #e0c8bc", borderRadius: 6, padding: "5px 10px", fontSize: 13, color: "#4a2018", width: 180, outline: "none" }}
              />
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {[
                    { label: "Sr No.", key: null },
                    { label: "Table Name", key: "name" },
                    { label: "Capacity", key: "capacity" },
                    { label: "Area", key: "area" },
                    { label: "Order Type", key: "orderType" },
                    { label: "Status", key: "status" },
                    { label: "Edit / Delete", key: null },
                  ].map(({ label, key }) => (
                    <th key={label} style={th} onClick={() => key && handleSort(key)}>
                      {label}{key && <SortIcon col={key} />}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ ...td, textAlign: "center", color: "#b07060", padding: 32 }}>
                      No tables found. Click "Create New" to add one.
                    </td>
                  </tr>
                ) : (
                  paginated.map((t, i) => (
                    <tr key={t.id} style={{ background: i % 2 === 0 ? "#fff" : "#fdf8f6" }}>
                      <td style={td}>{i + 1}</td>
                      <td style={{ ...td, fontWeight: 500 }}>{t.name}</td>
                      <td style={td}>{t.capacity}</td>
                      <td style={td}>{t.area}</td>
                      <td style={td}>{t.orderType}</td>
                      <td style={td}>
                        <span
                          onClick={() => toggleStatus(t.id)}
                          style={{
                            display: "inline-block",
                            padding: "3px 12px",
                            borderRadius: 20,
                            fontSize: 12,
                            fontWeight: 500,
                            cursor: "pointer",
                            background: t.status === "Active" ? "#eaf3de" : "#fceaea",
                            color: t.status === "Active" ? "#3b6d11" : "#a32d2d",
                          }}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td style={td}>
                        <button
                          onClick={() => openEdit(t)}
                          style={{ border: "0.5px solid #e0c8bc", borderRadius: 6, padding: "4px 12px", fontSize: 12, cursor: "pointer", background: "#fff", color: "#4a2018", marginRight: 6 }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(t.id)}
                          style={{ border: "0.5px solid #f0c0c0", borderRadius: 6, padding: "4px 12px", fontSize: 12, cursor: "pointer", background: "#fff", color: "#a32d2d" }}
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 18px", borderTop: "0.5px solid #f0e0d8", fontSize: 13, color: "#7a5040" }}>
            <span>
              {filtered.length === 0
                ? "Showing 0 to 0 of 0 entries"
                : `Showing 1 to ${Math.min(showEntries, filtered.length)} of ${filtered.length} entries`}
            </span>
            <div style={{ display: "flex", gap: 6 }}>
              <button style={{ border: "0.5px solid #e0c8bc", borderRadius: 6, padding: "5px 14px", fontSize: 13, background: "#fff", color: "#4a2018", cursor: "pointer" }}>Previous</button>
              <button style={{ border: "0.5px solid #e0c8bc", borderRadius: 6, padding: "5px 14px", fontSize: 13, background: "#fff", color: "#4a2018", cursor: "pointer" }}>Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(74,32,24,0.22)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }}
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div style={{ background: "#fff", borderRadius: 12, border: "0.5px solid #e8d8d0", width: 440, overflow: "hidden" }}>
            {/* Header */}
            <div style={{ background: "#c96840", color: "#fff", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 15, fontWeight: 500 }}>Table Master</span>
              <button onClick={closeModal} style={{ background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer", lineHeight: 1, opacity: 0.85 }}>×</button>
            </div>

            {/* Body */}
            <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Order Type", field: "orderType", type: "select", options: ORDER_TYPES, placeholder: "Choose an Order Type" },
                { label: "Table Name", field: "name", type: "text", placeholder: "e.g. Table A1" },
                { label: "Capacity", field: "capacity", type: "number", placeholder: "e.g. 4" },
                { label: "Area", field: "area", type: "select", options: AREAS, placeholder: "Select Area" },
              ].map(({ label, field, type, options, placeholder }) => (
                <div key={field}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#4a2018", marginBottom: 5 }}>{label}</label>
                  {type === "select" ? (
                    <select
                      value={form[field]}
                      onChange={(e) => { setForm((f) => ({ ...f, [field]: e.target.value })); setErrors((er) => ({ ...er, [field]: undefined })); }}
                      style={{ width: "100%", border: `0.5px solid ${errors[field] ? "#e24b4a" : "#e0c8bc"}`, borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "#4a2018", outline: "none" }}
                    >
                      <option value="">{placeholder}</option>
                      {options.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      type={type}
                      value={form[field]}
                      placeholder={placeholder}
                      onChange={(e) => { setForm((f) => ({ ...f, [field]: e.target.value })); setErrors((er) => ({ ...er, [field]: undefined })); }}
                      style={{ width: field === "capacity" ? 120 : "100%", border: `0.5px solid ${errors[field] ? "#e24b4a" : "#e0c8bc"}`, borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "#4a2018", outline: "none" }}
                    />
                  )}
                  {errors[field] && <div style={{ fontSize: 11, color: "#a32d2d", marginTop: 3 }}>{errors[field]}</div>}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ background: "#c96840", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10 }}>
              <button
                onClick={closeModal}
                style={{ background: "#fff", color: "#4a2018", border: "none", borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 500, cursor: "pointer" }}
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                style={{ background: "#fff", color: "#c96840", border: "none", borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
              >
                <span style={{ width: 30, height: 17, borderRadius: 9, background: "#3b6d11", display: "inline-flex", alignItems: "center", justifyContent: "flex-end", padding: "0 2px" }}>
                  <span style={{ width: 13, height: 13, borderRadius: "50%", background: "#fff" }} />
                </span>
                {editId !== null ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}