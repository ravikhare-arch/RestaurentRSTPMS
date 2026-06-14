import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getUsers, deleteUser } from '../../api/userApi'
import { getRoles } from '../../api/roleApi'
import { getCompanies } from '../../api/companyApi'
import DataTable from '../../components/common/DataTable'
import PageHeader from '../../components/common/PageHeader'
import ConfirmDeleteModal from '../../components/common/ConfirmDeleteModal'
import usePermission from '../../hooks/usePermission'
import { PERMISSIONS } from '../../config/permissions'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const canCreate = usePermission(PERMISSIONS.USER_CREATE)
  const canEdit = usePermission(PERMISSIONS.USER_EDIT)
  const canDelete = usePermission(PERMISSIONS.USER_DELETE)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [userRes, roleRes, companyRes] = await Promise.all([getUsers(), getRoles(), getCompanies()])
      setUsers(userRes.data.map(({ password, ...u }) => u))
      setRoles(roleRes.data)
      setCompanies(companyRes.data)
    } catch {
      toast.error('Failed to load users')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const getRoleName = (roleId) => roles.find((r) => r.id === roleId)?.name || '-'
  const getCompanyName = (companyId) => companies.find((c) => c.id === companyId)?.name || '-'

  const handleDelete = async () => {
    try {
      await deleteUser(deleteTarget.id)
      toast.success('User deleted')
      setDeleteTarget(null)
      fetchData()
    } catch {
      toast.error('Failed to delete user')
    }
  }

  const columns = [
    { key: 'username', label: 'Username' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'roleId', label: 'Role', render: (row) => getRoleName(row.roleId) },
    { key: 'companyId', label: 'Company', render: (row) => getCompanyName(row.companyId) },
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
      <PageHeader title="User Master" subtitle="Manage system users" createPath="/users/create" createPermission={canCreate} />
      <DataTable
        columns={columns}
        data={users}
        loading={loading}
        editPath={(id) => `/users/${id}/edit`}
        onDelete={canDelete ? setDeleteTarget : null}
        canEdit={canEdit}
        canDelete={canDelete}
      />
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        message={`Delete user "${deleteTarget?.username}"?`}
      />
    </div>
  )
}

export default UserList
