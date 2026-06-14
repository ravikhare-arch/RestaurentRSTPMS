import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { createRole } from '../../../api/roleApi'

const RoleCreate = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', code: '', description: '', isActive: true })
  const [saving, setSaving] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await createRole(form)
      toast.success('Role created')
      navigate('/masters/roles')
    } catch {
      toast.error('Failed to create role')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Add Role</h1>
        </div>
      </div>
      <form className="card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="code">Role Code</label>
            <input id="code" name="code" value={form.code} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="name">Role Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={form.description} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="checkbox-item">
              <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
              Active
            </label>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>Save Role</button>
          <Link to="/masters/roles" className="btn btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default RoleCreate
