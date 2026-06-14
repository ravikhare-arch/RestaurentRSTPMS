import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { createRoleClaim, getRoleClaimById, updateRoleClaim } from '../../../api/roleClaimApi'
import Loader from '../../../components/common/Loader'

const RoleClaimForm = () => {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const [form, setForm] = useState({ code: '', name: '', module: '', description: '' })
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isEdit) return
    getRoleClaimById(id)
      .then((res) => { setForm(res.data); setLoading(false) })
      .catch(() => toast.error('Claim not found'))
  }, [id, isEdit])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (isEdit) {
        await updateRoleClaim(id, form)
        toast.success('Role claim updated')
      } else {
        await createRoleClaim(form)
        toast.success('Role claim created')
      }
      navigate('/masters/role-claims')
    } catch {
      toast.error('Failed to save role claim')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-header__title">{isEdit ? 'Edit Role Claim' : 'Add Role Claim'}</h1>
        </div>
      </div>
      <form className="card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="code">Claim Code</label>
            <input id="code" name="code" value={form.code} onChange={handleChange} placeholder="e.g. company.view" required />
          </div>
          <div className="form-group">
            <label htmlFor="name">Claim Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="module">Module</label>
            <input id="module" name="module" value={form.module} onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={form.description} onChange={handleChange} />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : isEdit ? 'Update Claim' : 'Save Claim'}
          </button>
          <Link to="/masters/role-claims" className="btn btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default RoleClaimForm
