import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getRoleClaims, deleteRoleClaim } from '../../../api/roleClaimApi'
import DataTable from '../../../components/common/DataTable'
import PageHeader from '../../../components/common/PageHeader'
import ConfirmDeleteModal from '../../../components/common/ConfirmDeleteModal'
import usePermission from '../../../hooks/usePermission'
import { PERMISSIONS } from '../../../config/permissions'

const RoleClaimList = () => {
  const [claims, setClaims] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const canCreate = usePermission(PERMISSIONS.ROLE_CLAIM_CREATE)
  const canEdit = usePermission(PERMISSIONS.ROLE_CLAIM_EDIT)
  const canDelete = usePermission(PERMISSIONS.ROLE_CLAIM_DELETE)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getRoleClaims()
      setClaims(res.data)
    } catch {
      toast.error('Failed to load role claims')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleDelete = async () => {
    try {
      await deleteRoleClaim(deleteTarget.id)
      toast.success('Role claim deleted')
      setDeleteTarget(null)
      fetchData()
    } catch {
      toast.error('Failed to delete role claim')
    }
  }

  const columns = [
    { key: 'code', label: 'Claim Code' },
    { key: 'name', label: 'Name' },
    { key: 'module', label: 'Module' },
    { key: 'description', label: 'Description' },
  ]

  return (
    <div>
      <PageHeader title="Role Claim Master" subtitle="Manage permission claims" createPath="/masters/role-claims/create" createPermission={canCreate} />
      <DataTable
        columns={columns}
        data={claims}
        loading={loading}
        editPath={(id) => `/masters/role-claims/${id}/edit`}
        onDelete={canDelete ? setDeleteTarget : null}
        canEdit={canEdit}
        canDelete={canDelete}
      />
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        message={`Delete claim "${deleteTarget?.name}"?`}
      />
    </div>
  )
}

export default RoleClaimList
