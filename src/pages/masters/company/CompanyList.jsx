import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getCompanies, deleteCompany } from '../../../api/companyApi'
import DataTable from '../../../components/common/DataTable'
import PageHeader from '../../../components/common/PageHeader'
import ConfirmDeleteModal from '../../../components/common/ConfirmDeleteModal'
import usePermission from '../../../hooks/usePermission'
import { PERMISSIONS } from '../../../config/permissions'

const CompanyList = () => {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const canCreate = usePermission(PERMISSIONS.COMPANY_CREATE)
  const canEdit = usePermission(PERMISSIONS.COMPANY_EDIT)
  const canDelete = usePermission(PERMISSIONS.COMPANY_DELETE)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getCompanies()
      setCompanies(res.data)
    } catch {
      toast.error('Failed to load companies')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleDelete = async () => {
    try {
      await deleteCompany(deleteTarget.id)
      toast.success('Company deleted')
      setDeleteTarget(null)
      fetchData()
    } catch {
      toast.error('Failed to delete company')
    }
  }

  const columns = [
    { key: 'code', label: 'Code' },
    { key: 'name', label: 'Name' },
    { key: 'city', label: 'City' },
    { key: 'phone', label: 'Phone' },
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
      <PageHeader
        title="Company Master"
        subtitle="Manage companies"
        createPath="/masters/companies/create"
        createPermission={canCreate}
      />
      <DataTable
        columns={columns}
        data={companies}
        loading={loading}
        editPath={(id) => `/masters/companies/${id}/edit`}
        onDelete={canDelete ? setDeleteTarget : null}
        canEdit={canEdit}
        canDelete={canDelete}
      />
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        message={`Delete company "${deleteTarget?.name}"?`}
      />
    </div>
  )
}

export default CompanyList
