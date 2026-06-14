import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { createUser } from '../../api/userApi'
import { getRoles } from '../../api/roleApi'
import { getCompanies } from '../../api/companyApi'
import Loader from '../../components/common/Loader'

const UserCreate = () => {
  const navigate = useNavigate()
  const [roles, setRoles] = useState([])
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    username: '', password: '', name: '', email: '', phone: '', companyId: '', roleId: '', isActive: true,
  })

  useEffect(() => {
    Promise.all([getRoles(), getCompanies()])
      .then(([roleRes, companyRes]) => {
        setRoles(roleRes.data)
        setCompanies(companyRes.data)
      })
      .catch(() => toast.error('Failed to load form data'))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await createUser(form)
      toast.success('User created')
      navigate('/users')
    } catch {
      toast.error('Failed to create user')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Add User</h1>
        </div>
      </div>
      <form className="card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" value={form.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required />
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
          <button type="submit" className="btn btn-primary" disabled={saving}>Save User</button>
          <Link to="/users" className="btn btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default UserCreate
