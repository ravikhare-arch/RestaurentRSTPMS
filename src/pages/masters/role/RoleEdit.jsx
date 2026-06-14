import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getRoleById, updateRole } from '../../../api/roleApi'
import Loader from '../../../components/common/Loader'

const RoleEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getRoleById(id).then((res) => setForm(res.data)).catch(() => toast.error('Role not found'))
  }, [id])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateRole(id, form)
      toast.success('Role updated')
      navigate('/masters/roles')
    } catch {
      toast.error('Failed to update role')
    } finally {
      setSaving(false)
    }
  }

  if (!form) return <Loader />

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Edit Role</h1>
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
          <button type="submit" className="btn btn-primary" disabled={saving}>Update Role</button>
          <Link to="/masters/roles" className="btn btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default RoleEdit
