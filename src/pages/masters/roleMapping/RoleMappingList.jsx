import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getRoleMappings, deleteRoleMapping } from '../../../api/roleMappingApi'
import { getRoles } from '../../../api/roleApi'
import DataTable from '../../../components/common/DataTable'
import PageHeader from '../../../components/common/PageHeader'
import ConfirmDeleteModal from '../../../components/common/ConfirmDeleteModal'
import usePermission from '../../../hooks/usePermission'
import { PERMISSIONS } from '../../../config/permissions'

const RoleMappingList = () => {
  const [mappings, setMappings] = useState([])
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const canCreate = usePermission(PERMISSIONS.ROLE_MAPPING_CREATE)
  const canEdit = usePermission(PERMISSIONS.ROLE_MAPPING_EDIT)
  const canDelete = usePermission(PERMISSIONS.ROLE_MAPPING_DELETE)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [mappingRes, roleRes] = await Promise.all([getRoleMappings(), getRoles()])
      setMappings(mappingRes.data)
      setRoles(roleRes.data)
    } catch {
      toast.error('Failed to load role mappings')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const getRoleName = (roleId) => roles.find((r) => r.id === roleId)?.name || roleId

  const handleDelete = async () => {
    try {
      await deleteRoleMapping(deleteTarget.id)
      toast.success('Role mapping deleted')
      setDeleteTarget(null)
      fetchData()
    } catch {
      toast.error('Failed to delete role mapping')
    }
  }

  const columns = [
    {
      key: 'roleId',
      label: 'Role',
      render: (row) => getRoleName(row.roleId),
    },
    {
      key: 'claimIds',
      label: 'Claims Count',
      render: (row) => `${row.claimIds?.length || 0} permissions`,
    },
  ]

  return (
    <div>
      <PageHeader title="Role Mapping" subtitle="Map roles to permission claims" createPath="/masters/role-mapping/create" createPermission={canCreate} />
      <DataTable
        columns={columns}
        data={mappings}
        loading={loading}
        editPath={(id) => `/masters/role-mapping/${id}/edit`}
        onDelete={canDelete ? setDeleteTarget : null}
        canEdit={canEdit}
        canDelete={canDelete}
      />
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        message={`Delete mapping for "${getRoleName(deleteTarget?.roleId)}"?`}
      />
    </div>
  )
}

export default RoleMappingList
