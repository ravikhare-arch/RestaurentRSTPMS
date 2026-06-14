import { useState } from "react";
// import { C, glassCard, Field, Input } from "./Services/DesignTokens";
// import { TopBar, DataTable, Toast, AddBtn } from "./SharedLayouts";
import { C, glassCard, Field, Input } from "../../../services/DesignTokens.jsx";
import { TopBar, DataTable, Toast, AddBtn } from "../../../../src/services/SharedLayouts.jsx";
const emptyTax = { name: "", value: "", cgst: "", sgst: "", igst: "" };


export default function TaxMaster() {
  const [view, setView] = useState("ADD");
  const [form, setForm] = useState(emptyTax);
  const [errors, setErrors] = useState({});
  const [rows, setRows] = useState([
    { id: 1, name: "GST 5%", value: "5", cgst: "2.5", sgst: "2.5", igst: "5" },
    { id: 2, name: "GST 12%", value: "12", cgst: "6", sgst: "6", igst: "12" },
    { id: 3, name: "GST 18%", value: "18", cgst: "9", sgst: "9", igst: "18" },
  ]);
  const [nextId, setNextId] = useState(4);
  const [editId, setEditId] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  function f(key) { return val => { setForm(p => ({ ...p, [key]: val })); setErrors(p => ({ ...p, [key]: "" })); }; }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.value || isNaN(form.value)) e.value = "Enter a number";
    if (!form.cgst || isNaN(form.cgst)) e.cgst = "Enter a number";
    if (!form.sgst || isNaN(form.sgst)) e.sgst = "Enter a number";
    if (!form.igst || isNaN(form.igst)) e.igst = "Enter a number";
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      if (editId !== null) {
        setRows(p => p.map(r => r.id === editId ? { ...r, ...form } : r));
        setToast({ msg: "Tax updated successfully!", type: "success" });
        setEditId(null);
      } else {
        setRows(p => [...p, { id: nextId, ...form }]);
        setNextId(n => n + 1);
        setToast({ msg: "Tax added successfully!", type: "success" });
      }
      setForm(emptyTax);
      setLoading(false);
      setView("LIST");
    }, 500);
  }

  function handleEdit(row) {
    setForm({ name: row.name, value: row.value, cgst: row.cgst, sgst: row.sgst, igst: row.igst });
    setEditId(row.id);
    setView("ADD");
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this tax record?")) return;
    setRows(p => p.filter(r => r.id !== id));
    setToast({ msg: "Tax deleted.", type: "error" });
  }

  const cols = [{ key: "name", label: "Tax Name" }, { key: "value", label: "Tax Value %" }, { key: "cgst", label: "CGST %" }, { key: "sgst", label: "SGST %" }, { key: "igst", label: "IGST %" }];

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <TopBar title="Tax Master" view={view} setView={v => { setView(v); if (v === "ADD") { setForm(emptyTax); setEditId(null); setErrors({}); }}} />
      <div style={{ ...glassCard, borderRadius: "0 0 20px 20px", padding: 28 }}>
        {view === "ADD" ? (
          <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>{editId ? "Edit Tax" : "Add New Tax"}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ gridColumn: "1/-1" }}>
                <Field label="Name of Tax" required><Input value={form.name} onChange={f("name")} placeholder="e.g. GST 18%" /></Field>
                {errors.name && <div style={{ fontSize: 11, color: C.danger, marginTop: 3 }}>{errors.name}</div>}
              </div>
              <div>
                <Field label="Tax Value (%)" required><Input value={form.value} onChange={f("value")} placeholder="e.g. 18" /></Field>
                {errors.value && <div style={{ fontSize: 11, color: C.danger, marginTop: 3 }}>{errors.value}</div>}
              </div>
              <div>
                <Field label="CGST (%)" required><Input value={form.cgst} onChange={f("cgst")} placeholder="e.g. 9" /></Field>
                {errors.cgst && <div style={{ fontSize: 11, color: C.danger, marginTop: 3 }}>{errors.cgst}</div>}
              </div>
              <div>
                <Field label="SGST (%)" required><Input value={form.sgst} onChange={f("sgst")} placeholder="e.g. 9" /></Field>
                {errors.sgst && <div style={{ fontSize: 11, color: C.danger, marginTop: 3 }}>{errors.sgst}</div>}
              </div>
              <div>
                <Field label="IGST (%)" required><Input value={form.igst} onChange={f("igst")} placeholder="e.g. 18" /></Field>
                {errors.igst && <div style={{ fontSize: 11, color: C.danger, marginTop: 3 }}>{errors.igst}</div>}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
              <AddBtn label={editId ? "Update Tax" : "Add Tax"} onClick={handleSubmit} loading={loading} />
            </div>
          </div>
        ) : (
          <DataTable columns={cols} rows={rows} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}