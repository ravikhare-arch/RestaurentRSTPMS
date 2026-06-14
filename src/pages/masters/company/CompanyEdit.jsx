import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getCompanyById, updateCompany } from '../../../api/companyApi'
import Loader from '../../../components/common/Loader'

const CompanyEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getCompanyById(id)
      .then((res) => setForm(res.data))
      .catch(() => toast.error('Company not found'))
  }, [id])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateCompany(id, form)
      toast.success('Company updated')
      navigate('/masters/companies')
    } catch {
      toast.error('Failed to update company')
    } finally {
      setSaving(false)
    }
  }

  if (!form) return <Loader />

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Edit Company</h1>
          <p className="page-header__subtitle">Update company details</p>
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
            {saving ? 'Saving...' : 'Update Company'}
          </button>
          <Link to="/masters/companies" className="btn btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default CompanyEdit
