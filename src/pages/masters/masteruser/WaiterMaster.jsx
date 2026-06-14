import { useState } from "react";

import { C, glassCard, Field, Input } from "../../../services/DesignTokens.jsx";
import { TopBar, DataTable, Toast, AddBtn } from "../../../services/SharedLayouts.jsx";

const emptyWaiter = { name: "" };

export default function WaiterMaster() {
  const [view, setView] = useState("LIST");
  const [form, setForm] = useState(emptyWaiter);
  const [errors, setErrors] = useState({});
  const [rows, setRows] = useState([
    { id: 1, name: "Kapil Sir" },
    { id: 2, name: "Mohit" },
    { id: 3, name: "Honey Sir" },
  ]);
  const [nextId, setNextId] = useState(4);
  const [editId, setEditId] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  function updateName(value) {
    setForm({ name: value });
    setErrors({});
  }

  function resetForm() {
    setForm(emptyWaiter);
    setEditId(null);
    setErrors({});
  }

  function handleSubmit() {
    if (!form.name.trim()) {
      setErrors({ name: "Required" });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const name = form.name.trim();
      if (editId !== null) {
        setRows((current) => current.map((row) => (row.id === editId ? { ...row, name } : row)));
        setToast({ msg: "Waiter updated successfully!", type: "success" });
      } else {
        setRows((current) => [...current, { id: nextId, name }]);
        setNextId((id) => id + 1);
        setToast({ msg: "Waiter added successfully!", type: "success" });
      }
      resetForm();
      setLoading(false);
      setView("LIST");
    }, 500);
  }

  function handleEdit(row) {
    setForm({ name: row.name });
    setEditId(row.id);
    setErrors({});
    setView("ADD");
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this waiter record?")) return;
    setRows((current) => current.filter((row) => row.id !== id));
    setToast({ msg: "Waiter deleted.", type: "error" });
  }

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <TopBar
        title="Waiter / NC Master"
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
              {editId !== null ? "Edit Waiter" : "Add New Waiter"}
            </div>
            <div>
              <Field label="Waiter / NC Name" required>
                <Input value={form.name} onChange={updateName} placeholder="e.g. Kapil Sir" />
              </Field>
              {errors.name && <div style={{ fontSize: 11, color: C.danger, marginTop: 3 }}>{errors.name}</div>}
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
              <AddBtn label={editId !== null ? "Update Waiter" : "Add Waiter"} onClick={handleSubmit} loading={loading} />
            </div>
          </div>
        ) : (
          <DataTable
            columns={[{ key: "name", label: "Waiter / NC Name" }]}
            rows={rows}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
