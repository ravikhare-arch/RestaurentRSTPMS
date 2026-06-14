import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getRoles, deleteRole } from '../../../api/roleApi'
import DataTable from '../../../components/common/DataTable'
import PageHeader from '../../../components/common/PageHeader'
import ConfirmDeleteModal from '../../../components/common/ConfirmDeleteModal'
import usePermission from '../../../hooks/usePermission'
import { PERMISSIONS } from '../../../config/permissions'

const RoleList = () => {
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const canCreate = usePermission(PERMISSIONS.ROLE_CREATE)
  const canEdit = usePermission(PERMISSIONS.ROLE_EDIT)
  const canDelete = usePermission(PERMISSIONS.ROLE_DELETE)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getRoles()
      setRoles(res.data)
    } catch {
      toast.error('Failed to load roles')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleDelete = async () => {
    try {
      await deleteRole(deleteTarget.id)
      toast.success('Role deleted')
      setDeleteTarget(null)
      fetchData()
    } catch {
      toast.error('Failed to delete role')
    }
  }

  const columns = [
    { key: 'code', label: 'Code' },
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    {
      key: 'isActive',
      label: 'Status',
      render: (row) => (
        <span className={`badge ${row.isActive ? 'badge-success' : 'badge-danger'}`}>
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ]

  return (
    <div>
      <PageHeader title="Role Master" subtitle="Manage user roles" createPath="/masters/roles/create" createPermission={canCreate} />
      <DataTable
        columns={columns}
        data={roles}
        loading={loading}
        editPath={(id) => `/masters/roles/${id}/edit`}
        onDelete={canDelete ? setDeleteTarget : null}
        canEdit={canEdit}
        canDelete={canDelete}
      />
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        message={`Delete role "${deleteTarget?.name}"?`}
      />
    </div>
  )
}

export default RoleList
