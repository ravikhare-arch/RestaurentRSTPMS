import { useState } from "react";

import { C, glassCard, Field, Input } from "../../../services/DesignTokens.jsx";
import { TopBar, DataTable, Toast, AddBtn } from "../../../../src/services/SharedLayouts.jsx";
const emptyCity = { country: "", state: "", city: "" };

export default function CityMaster() {
  const [view, setView] = useState("ADD");
  const [form, setForm] = useState(emptyCity);
  const [errors, setErrors] = useState({});
  const [rows, setRows] = useState([
    { id: 1, country: "India", state: "Maharashtra", city: "Mumbai" },
    { id: 2, country: "India", state: "Delhi", city: "New Delhi" },
    { id: 3, country: "USA", state: "California", city: "Los Angeles" },
  ]);
  const [nextId, setNextId] = useState(4);
  const [editId, setEditId] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const states = COUNTRY_STATE_MAP[form.country] || [];

  function f(key) { return val => { setForm(p => ({ ...p, [key]: val, ...(key === "country" ? { state: "" } : {}) })); setErrors(p => ({ ...p, [key]: "" })); }; }
  
  function validate() {
    const e = {};
    if (!form.country) e.country = "Required";
    if (!form.state) e.state = "Required";
    if (!form.city.trim()) e.city = "Required";
    return e;
  }
  
  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      if (editId !== null) {
        setRows(p => p.map(r => r.id === editId ? { ...r, ...form } : r));
        setToast({ msg: "City updated!", type: "success" });
        setEditId(null);
      } else {
        setRows(p => [...p, { id: nextId, ...form }]);
        setNextId(n => n + 1);
        setToast({ msg: "City added!", type: "success" });
      }
      setForm(emptyCity); setLoading(false); setView("LIST");
    }, 500);
  }
  
  function handleEdit(row) { setForm({ country: row.country, state: row.state, city: row.city }); setEditId(row.id); setView("ADD"); }
  function handleDelete(id) { if (!window.confirm("Delete?")) return; setRows(p => p.filter(r => r.id !== id)); setToast({ msg: "Deleted.", type: "error" }); }

  const cols = [{ key: "country", label: "Country" }, { key: "state", label: "State" }, { key: "city", label: "City" }];

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <TopBar title="Add City Details" view={view} setView={v => { setView(v); if (v === "ADD") { setForm(emptyCity); setEditId(null); setErrors({}); }}} />
      <div style={{ ...glassCard, borderRadius: "0 0 20px 20px", padding: 28 }}>
        {view === "ADD" ? (
          <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>{editId ? "Edit City" : "Add New City"}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <Field label="Country Name" required>
                  <Select value={form.country} onChange={f("country")} options={Object.keys(COUNTRY_STATE_MAP)} placeholder="Choose a Country" />
                </Field>
                {errors.country && <div style={{ fontSize: 11, color: C.danger, marginTop: 3 }}>{errors.country}</div>}
              </div>
              <div>
                <Field label="State Name" required>
                  <Select value={form.state} onChange={f("state")} options={states} placeholder="Choose a State" />
                </Field>
                {errors.state && <div style={{ fontSize: 11, color: C.danger, marginTop: 3 }}>{errors.state}</div>}
              </div>
              <div>
                <Field label="City Name" required><Input value={form.city} onChange={f("city")} placeholder="e.g. Mumbai" /></Field>
                {errors.city && <div style={{ fontSize: 11, color: C.danger, marginTop: 3 }}>{errors.city}</div>}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
              <AddBtn label={editId ? "Update City" : "Add City"} onClick={handleSubmit} loading={loading} />
            </div>
          </div>
        ) : (
          <DataTable columns={cols} rows={rows} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}