import { Link } from 'react-router-dom'
import Loader from './Loader'

const DataTable = ({
  columns,
  data,
  loading,
  emptyMessage = 'No records found.',
  onDelete,
  editPath,
  canEdit = true,
  canDelete = true,
}) => {
  if (loading) return <Loader />

  if (!data.length) {
    return <div className="empty-state">{emptyMessage}</div>
  }

  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {(canEdit || canDelete) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              {(canEdit || canDelete) && (
                <td className="data-table__actions">
                  {canEdit && editPath && (
                    <Link to={editPath(row.id)} className="btn btn-sm btn-outline">
                      <i className="ti ti-edit" aria-hidden="true" /> Edit
                    </Link>
                  )}
                  {canDelete && onDelete && (
                    <button type="button" className="btn btn-sm btn-danger" onClick={() => onDelete(row)}>
                      <i className="ti ti-trash" aria-hidden="true" /> Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
