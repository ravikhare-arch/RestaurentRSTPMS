import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { createCompany } from '../../../api/companyApi'

const CompanyCreate = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', code: '', address: '', city: '', phone: '', email: '', isActive: true,
  })
  const [saving, setSaving] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await createCompany(form)
      toast.success('Company created')
      navigate('/masters/companies')
    } catch {
      toast.error('Failed to create company')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Add Company</h1>
          <p className="page-header__subtitle">Create a new company record</p>
        </div>
      </div>
      <form className="card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="code">Company Code</label>
            <input id="code" name="code" value={form.code} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="name">Company Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input id="city" name="city" value={form.city} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" value={form.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="address">Address</label>
            <textarea id="address" name="address" value={form.address} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="checkbox-item">
              <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
              Active
            </label>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Company'}
          </button>
          <Link to="/masters/companies" className="btn btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default CompanyCreate
