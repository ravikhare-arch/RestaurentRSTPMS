import { useState } from "react";

import { C, glassCard, Field, Input, Select } from "../../../services/DesignTokens.jsx";
import { TopBar, DataTable, Toast, AddBtn } from "../../../services/SharedLayouts.jsx";

const ORDER_TYPES = ["Dine In", "Take Away", "Home Delivery", "Banquet", "Room Service"];
const emptyArea = { tableName: "", orderType: "" };

export default function AreaMaster() {
  const [view, setView] = useState("LIST");
  const [form, setForm] = useState(emptyArea);
  const [errors, setErrors] = useState({});
  const [rows, setRows] = useState([
    { id: 1, tableName: "Table A1", orderType: "Dine In" },
    { id: 2, tableName: "Table B2", orderType: "Banquet" },
    { id: 3, tableName: "Terrace 1", orderType: "Dine In" },
  ]);
  const [nextId, setNextId] = useState(4);
  const [editId, setEditId] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  function updateField(key) {
    return (value) => {
      setForm((current) => ({ ...current, [key]: value }));
      setErrors((current) => ({ ...current, [key]: "" }));
    };
  }

  function resetForm() {
    setForm(emptyArea);
    setEditId(null);
    setErrors({});
  }

  function validate() {
    const nextErrors = {};
    if (!form.orderType) nextErrors.orderType = "Required";
    if (!form.tableName.trim()) nextErrors.tableName = "Required";
    return nextErrors;
  }

  function handleSubmit() {
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const area = { tableName: form.tableName.trim(), orderType: form.orderType };
      if (editId !== null) {
        setRows((current) => current.map((row) => (row.id === editId ? { ...row, ...area } : row)));
        setToast({ msg: "Area updated successfully!", type: "success" });
      } else {
        setRows((current) => [...current, { id: nextId, ...area }]);
        setNextId((id) => id + 1);
        setToast({ msg: "Area added successfully!", type: "success" });
      }
      resetForm();
      setLoading(false);
      setView("LIST");
    }, 500);
  }

  function handleEdit(row) {
    setForm({ tableName: row.tableName, orderType: row.orderType });
    setEditId(row.id);
    setErrors({});
    setView("ADD");
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this area record?")) return;
    setRows((current) => current.filter((row) => row.id !== id));
    setToast({ msg: "Area deleted.", type: "error" });
  }

  const columns = [
    { key: "tableName", label: "Table / Area Name" },
    { key: "orderType", label: "Order Type" },
  ];

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <TopBar
        title="Area Master"
        view={view}
        setView={(nextView) => {
          setView(nextView);
          if (nextView === "ADD") resetForm();
        }}
      />
      <div style={{ ...glassCard, borderRadius: "0 0 20px 20px", padding: 28 }}>
        {view === "ADD" ? (
          <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>
              {editId !== null ? "Edit Area" : "Add New Area"}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <Field label="Order Type" required>
                  <Select value={form.orderType} onChange={updateField("orderType")} options={ORDER_TYPES} placeholder="Choose an Order Type" />
                </Field>
                {errors.orderType && <div style={{ fontSize: 11, color: C.danger, marginTop: 3 }}>{errors.orderType}</div>}
              </div>
              <div>
                <Field label="Table / Area Name" required>
                  <Input value={form.tableName} onChange={updateField("tableName")} placeholder="e.g. Table A1 or Terrace" />
                </Field>
                {errors.tableName && <div style={{ fontSize: 11, color: C.danger, marginTop: 3 }}>{errors.tableName}</div>}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
              <AddBtn label={editId !== null ? "Update Area" : "Add Area"} onClick={handleSubmit} loading={loading} />
            </div>
          </div>
        ) : (
          <DataTable columns={columns} rows={rows} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
