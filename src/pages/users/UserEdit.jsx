import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getUserById, updateUser } from '../../api/userApi'
import { getRoles } from '../../api/roleApi'
import { getCompanies } from '../../api/companyApi'
import Loader from '../../components/common/Loader'

const UserEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [roles, setRoles] = useState([])
  const [companies, setCompanies] = useState([])
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    Promise.all([getUserById(id), getRoles(), getCompanies()])
      .then(([userRes, roleRes, companyRes]) => {
        const { password, ...userData } = userRes.data
        setForm({ ...userData, password: '' })
        setRoles(roleRes.data)
        setCompanies(companyRes.data)
      })
      .catch(() => toast.error('User not found'))
  }, [id])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = { ...form }
      if (!payload.password) delete payload.password
      await updateUser(id, payload)
      toast.success('User updated')
      navigate('/users')
    } catch {
      toast.error('Failed to update user')
    } finally {
      setSaving(false)
    }
  }

  if (!form) return <Loader />

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Edit User</h1>
        </div>
      </div>
      <form className="card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" value={form.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password (leave blank to keep)</label>
            <input id="password" name="password" type="password" value={form.password} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" value={form.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="companyId">Company</label>
            <select id="companyId" name="companyId" value={form.companyId} onChange={handleChange} required>
              <option value="">-- Select Company --</option>
              {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="roleId">Role</label>
            <select id="roleId" name="roleId" value={form.roleId} onChange={handleChange} required>
              <option value="">-- Select Role --</option>
              {roles.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="checkbox-item">
              <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
              Active
            </label>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>Update User</button>
          <Link to="/users" className="btn btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default UserEdit
