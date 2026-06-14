import { Link } from 'react-router-dom'

const PageHeader = ({ title, subtitle, createPath, createLabel = 'Add New', createPermission = true }) => (
  <div className="page-header">
    <div>
      <h1 className="page-header__title">{title}</h1>
      {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
    </div>
    {createPath && createPermission && (
      <Link to={createPath} className="btn btn-primary">
        <i className="ti ti-plus" aria-hidden="true" /> {createLabel}
      </Link>
    )}
  </div>
)

export default PageHeader
