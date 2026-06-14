import { useState } from "react";

import { C, glassCard, Field, Input } from "../../../services/DesignTokens.jsx";
import { TopBar, DataTable, Toast, AddBtn } from "../../../../src/services/SharedLayouts.jsx";

const emptyCountry = { name: "", language: "", capital: "", continent: "" };
const CONTINENTS = ["Asia", "Europe", "North America", "South America", "Africa", "Australia", "Antarctica"];

export default function CountryMaster() {
  const [view, setView] = useState("ADD");
  const [form, setForm] = useState(emptyCountry);
  const [errors, setErrors] = useState({});
  const [rows, setRows] = useState([
    { id: 1, name: "India", language: "Hindi", capital: "New Delhi", continent: "Asia" },
    { id: 2, name: "USA", language: "English", capital: "Washington D.C.", continent: "North America" },
    { id: 3, name: "France", language: "French", capital: "Paris", continent: "Europe" },
  ]);
  const [nextId, setNextId] = useState(4);
  const [editId, setEditId] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  function f(key) { return val => { setForm(p => ({ ...p, [key]: val })); setErrors(p => ({ ...p, [key]: "" })); }; }
  
  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    return e;
  }
  
  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      if (editId !== null) {
        setRows(p => p.map(r => r.id === editId ? { ...r, ...form } : r));
        setToast({ msg: "Country updated!", type: "success" });
        setEditId(null);
      } else {
        setRows(p => [...p, { id: nextId, ...form }]);
        setNextId(n => n + 1);
        setToast({ msg: "Country added!", type: "success" });
      }
      setForm(emptyCountry); setLoading(false); setView("LIST");
    }, 500);
  }
  
  function handleEdit(row) { setForm({ name: row.name, language: row.language, capital: row.capital, continent: row.continent }); setEditId(row.id); setView("ADD"); }
  function handleDelete(id) { if (!window.confirm("Delete?")) return; setRows(p => p.filter(r => r.id !== id)); setToast({ msg: "Deleted.", type: "error" }); }

  const cols = [{ key: "name", label: "Country" }, { key: "language", label: "Language" }, { key: "capital", label: "Capital" }, { key: "continent", label: "Continent" }];

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <TopBar title="Add Country Details" view={view} setView={v => { setView(v); if (v === "ADD") { setForm(emptyCountry); setEditId(null); setErrors({}); }}} />
      <div style={{ ...glassCard, borderRadius: "0 0 20px 20px", padding: 28 }}>
        {view === "ADD" ? (
          <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>{editId ? "Edit Country" : "Add New Country"}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ gridColumn: "1/-1" }}>
                <Field label="Country Name" required><Input value={form.name} onChange={f("name")} placeholder="e.g. India" /></Field>
                {errors.name && <div style={{ fontSize: 11, color: C.danger, marginTop: 3 }}>{errors.name}</div>}
              </div>
              <Field label="Language"><Input value={form.language} onChange={f("language")} placeholder="e.g. Hindi" /></Field>
              <Field label="Capital"><Input value={form.capital} onChange={f("capital")} placeholder="e.g. New Delhi" /></Field>
              <div style={{ gridColumn: "1/-1" }}>
                <Field label="Continent"><Select value={form.continent} onChange={f("continent")} options={CONTINENTS} placeholder="Choose a Continent" /></Field>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
              <AddBtn label={editId ? "Update Country" : "Add Country"} onClick={handleSubmit} loading={loading} />
            </div>
          </div>
        ) : (
          <DataTable columns={cols} rows={rows} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}