import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { createRoleMapping, getRoleMappingById, updateRoleMapping } from '../../../api/roleMappingApi'
import { getRoles } from '../../../api/roleApi'
import { getRoleClaims } from '../../../api/roleClaimApi'
import Loader from '../../../components/common/Loader'

const RoleMappingForm = () => {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const [roles, setRoles] = useState([])
  const [claims, setClaims] = useState([])
  const [form, setForm] = useState({ roleId: '', claimIds: [] })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const [roleRes, claimRes] = await Promise.all([getRoles(), getRoleClaims()])
        setRoles(roleRes.data)
        setClaims(claimRes.data)
        if (isEdit) {
          const mappingRes = await getRoleMappingById(id)
          setForm({ roleId: mappingRes.data.roleId, claimIds: mappingRes.data.claimIds || [] })
        }
      } catch {
        toast.error('Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, isEdit])

  const toggleClaim = (code) => {
    setForm((prev) => ({
      ...prev,
      claimIds: prev.claimIds.includes(code)
        ? prev.claimIds.filter((c) => c !== code)
        : [...prev.claimIds, code],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.roleId) {
      toast.error('Please select a role')
      return
    }
    setSaving(true)
    try {
      if (isEdit) {
        await updateRoleMapping(id, form)
        toast.success('Role mapping updated')
      } else {
        await createRoleMapping(form)
        toast.success('Role mapping created')
      }
      navigate('/masters/role-mapping')
    } catch {
      toast.error('Failed to save role mapping')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader />

  const groupedClaims = claims.reduce((acc, claim) => {
    if (!acc[claim.module]) acc[claim.module] = []
    acc[claim.module].push(claim)
    return acc
  }, {})

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-header__title">{isEdit ? 'Edit Role Mapping' : 'Add Role Mapping'}</h1>
          <p className="page-header__subtitle">Assign permission claims to a role</p>
        </div>
      </div>
      <form className="card" onSubmit={handleSubmit}>
        <div className="form-group" style={{ maxWidth: 320, marginBottom: '1rem' }}>
          <label htmlFor="roleId">Select Role</label>
          <select id="roleId" name="roleId" value={form.roleId} onChange={(e) => setForm((p) => ({ ...p, roleId: e.target.value }))} required>
            <option value="">-- Select Role --</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>{role.name} ({role.code})</option>
            ))}
          </select>
        </div>

        {Object.entries(groupedClaims).map(([module, moduleClaims]) => (
          <div key={module}>
            <p className="module-title">{module}</p>
            <div className="checkbox-grid">
              {moduleClaims.map((claim) => (
                <label key={claim.id} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={form.claimIds.includes(claim.code)}
                    onChange={() => toggleClaim(claim.code)}
                  />
                  {claim.name}
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : isEdit ? 'Update Mapping' : 'Save Mapping'}
          </button>
          <Link to="/masters/role-mapping" className="btn btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default RoleMappingForm
