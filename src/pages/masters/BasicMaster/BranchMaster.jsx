import { useState } from "react";
import { C, glassCard, Field, Input, Select, inputStyle, COUNTRY_STATE_MAP } from "./../../../services/DesignTokens.jsx";
import { TopBar, DataTable, Toast ,AddBtn} from "../../../../src/services/SharedLayouts.jsx";


const emptyBranch = { joiningDate: "", branchCode: "BRC-0005", branchName: "", company: "", iata: "", license: "", gst: "", pan: "", address: "", country: "", state: "", city: "", pincode: "", officeTele: "", authPerson: "", contact: "", email: "", website: "" };
const COMPANIES = ["Hotel Premier Inn", "Grand Palace Hotels", "Sunrise Resorts"];

export default function BranchMaster() {
  const [view, setView] = useState("ADD");
  const [form, setForm] = useState(emptyBranch);
  const [errors, setErrors] = useState({});
  const [rows, setRows] = useState([
    { id: 1, joiningDate: "2024-01-10", branchCode: "BRC-0001", branchName: "Main Branch", company: "Hotel Premier Inn", iata: "DEL01", license: "LIC-001", gst: "07AABCU9603R1ZV", pan: "AABCU9603R", address: "Connaught Place", country: "India", state: "Delhi", city: "New Delhi", pincode: "110001", officeTele: "011-12345678", authPerson: "Rahul Sharma", contact: "9876543210", email: "main@premierinn.com", website: "www.premierinn.com" },
    { id: 2, joiningDate: "2024-03-15", branchCode: "BRC-0002", branchName: "South Branch", company: "Hotel Premier Inn", iata: "BOM01", license: "LIC-002", gst: "27AABCU9603R1ZV", pan: "AABCU9603R", address: "Bandra West", country: "India", state: "Maharashtra", city: "Mumbai", pincode: "400050", officeTele: "022-98765432", authPerson: "Priya Patel", contact: "9123456789", email: "south@premierinn.com", website: "www.premierinn.com" },
  ]);
  const [nextId, setNextId] = useState(3);
  const [nextCode, setNextCode] = useState(5);
  const [editId, setEditId] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const states = COUNTRY_STATE_MAP[form.country] || [];

  function f(key) { return val => { setForm(p => ({ ...p, [key]: val, ...(key === "country" ? { state: "", city: "" } : key === "state" ? { city: "" } : {}) })); setErrors(p => ({ ...p, [key]: "" })); }; }

  function validate() {
    const e = {};
    if (!form.joiningDate) e.joiningDate = "Required";
    if (!form.branchName.trim()) e.branchName = "Required";
    if (!form.company) e.company = "Required";
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      if (editId !== null) {
        setRows(p => p.map(r => r.id === editId ? { ...r, ...form } : r));
        setToast({ msg: "Branch updated!", type: "success" });
        setEditId(null);
      } else {
        const code = `BRC-${String(nextCode).padStart(4, "0")}`;
        setRows(p => [...p, { id: nextId, ...form, branchCode: code }]);
        setNextId(n => n + 1);
        setNextCode(n => n + 1);
        setToast({ msg: "Branch added!", type: "success" });
      }
      setForm({ ...emptyBranch, branchCode: `BRC-${String(nextCode + 1).padStart(4, "0")}` });
      setLoading(false); setView("LIST");
    }, 500);
  }

  function handleEdit(row) {
    setForm({ ...row }); setEditId(row.id); setView("ADD");
  }
  function handleDelete(id) {
    if (!window.confirm("Delete branch?")) return;
    setRows(p => p.filter(r => r.id !== id));
    setToast({ msg: "Branch deleted.", type: "error" });
  }

  const cols = [
    { key: "branchCode", label: "Branch Code" }, { key: "branchName", label: "Branch Name" },
    { key: "company", label: "Company" }, { key: "city", label: "City" },
    { key: "contact", label: "Contact" }, { key: "email", label: "Email" },
  ];

  const Section = ({ title }) => (
    <div style={{ fontSize: 12, fontWeight: 700, color: C.terra, letterSpacing: "0.08em", textTransform: "uppercase", borderBottom: `1px solid ${C.border}`, paddingBottom: 6, marginBottom: 2, marginTop: 6 }}>{title}</div>
  );

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <TopBar title="Branch Master" view={view} setView={v => { setView(v); if (v === "ADD") { setForm(emptyBranch); setEditId(null); setErrors({}); }}} />
      <div style={{ ...glassCard, borderRadius: "0 0 20px 20px", padding: 28 }}>
        {view === "ADD" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{editId ? "Edit Branch" : "Add New Branch"}</div>

            <Section title="Basic Info" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
              <div>
                <Field label="Joining Date" required><Input type="date" value={form.joiningDate} onChange={f("joiningDate")} /></Field>
                {errors.joiningDate && <div style={{ fontSize: 11, color: C.danger, marginTop: 3 }}>{errors.joiningDate}</div>}
              </div>
              <Field label="Branch Code"><input value={form.branchCode} readOnly style={{ ...inputStyle(false), background: "rgba(201,104,64,0.07)", color: C.textMid }} /></Field>
              <div>
                <Field label="Branch Name" required><Input value={form.branchName} onChange={f("branchName")} placeholder="Branch Name" /></Field>
                {errors.branchName && <div style={{ fontSize: 11, color: C.danger, marginTop: 3 }}>{errors.branchName}</div>}
              </div>
              <div>
                <Field label="Company Name" required>
                  <Select value={form.company} onChange={f("company")} options={COMPANIES} placeholder="Choose a company" />
                </Field>
                {errors.company && <div style={{ fontSize: 11, color: C.danger, marginTop: 3 }}>{errors.company}</div>}
              </div>
              <Field label="IATA No"><Input value={form.iata} onChange={f("iata")} placeholder="IATA No" /></Field>
              <Field label="License No"><Input value={form.license} onChange={f("license")} placeholder="License No" /></Field>
            </div>

            <Section title="Tax & Address" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
              <Field label="GST No"><Input value={form.gst} onChange={f("gst")} placeholder="GST No" /></Field>
              <Field label="PAN No"><Input value={form.pan} onChange={f("pan")} placeholder="PAN No" /></Field>
              <div style={{ gridColumn: "span 2" }}><Field label="Address"><Input value={form.address} onChange={f("address")} placeholder="Full Address" /></Field></div>
              <Field label="Country">
                <Select value={form.country} onChange={f("country")} options={Object.keys(COUNTRY_STATE_MAP)} placeholder="Choose a Country" />
              </Field>
              <Field label="State">
                <Select value={form.state} onChange={f("state")} options={states} placeholder="Choose a state" />
              </Field>
              <Field label="City"><Input value={form.city} onChange={f("city")} placeholder="City" /></Field>
              <Field label="Pincode"><Input value={form.pincode} onChange={f("pincode")} placeholder="Pincode" /></Field>
              <Field label="Office Tele"><Input value={form.officeTele} onChange={f("officeTele")} placeholder="Office Phone" /></Field>
            </div>

            <Section title="Contact Details" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
              <Field label="Authorized Person"><Input value={form.authPerson} onChange={f("authPerson")} placeholder="Full Name" /></Field>
              <Field label="Contact No"><Input value={form.contact} onChange={f("contact")} placeholder="Mobile" /></Field>
              <Field label="Email ID"><Input value={form.email} onChange={f("email")} placeholder="email@example.com" /></Field>
              <Field label="Website"><Input value={form.website} onChange={f("website")} placeholder="www.example.com" /></Field>
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
              <AddBtn label={editId ? "Update Branch" : "Add Branch"} onClick={handleSubmit} loading={loading} />
            </div>
          </div>
        ) : (
          <DataTable columns={cols} rows={rows} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}