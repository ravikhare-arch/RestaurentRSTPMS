import { useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { MENU_ITEMS } from '../../config/menu'
import useAuth from '../../hooks/useAuth'
import { hasPermission } from '../../utils/permissions'

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const userClaims = user?.claims || []

  const visibleMenu = useMemo(() => {
    const filterMenu = (items) =>
      items
        .map((item) => {
          const children = item.children ? filterMenu(item.children) : []
          const canViewItem = !item.permission || hasPermission(userClaims, item.permission)

          if (children.length > 0) {
            return { ...item, children }
          }

          return canViewItem ? item : null
        })
        .filter(Boolean)

    return filterMenu(MENU_ITEMS)
  }, [userClaims])

  const isMenuItemActive = (item) => {
    if (item.path && location.pathname.startsWith(item.path)) return true
    return item.children?.some(isMenuItemActive) || false
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const renderMenuItem = (item, depth = 0) => {
    const isGroup = item.children?.length > 0
    const isActive = isMenuItemActive(item)

    if (isGroup) {
      return (
        <details
          key={item.label}
          className={`admin-sidebar__group depth-${depth}`}
          open={sidebarOpen && isActive}
        >
          <summary className={`admin-sidebar__group-title ${isActive ? 'active' : ''}`} title={item.label}>
            <i className={`ti ${item.icon}`} aria-hidden="true" />
            {sidebarOpen && (
              <>
                <span>{item.label}</span>
                <i className="ti ti-chevron-down admin-sidebar__chevron" aria-hidden="true" />
              </>
            )}
          </summary>
          {sidebarOpen && (
            <div className="admin-sidebar__group-list">
              {item.children.map((child) => renderMenuItem(child, depth + 1))}
            </div>
          )}
        </details>
      )
    }

    return (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive: navActive }) =>
          `admin-sidebar__link depth-${depth} ${navActive ? 'active' : ''}`
        }
        title={item.label}
      >
        <i className={`ti ${item.icon}`} aria-hidden="true" />
        {sidebarOpen && <span>{item.label}</span>}
      </NavLink>
    )
  }

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="admin-sidebar__brand">
          <div className="admin-sidebar__logo">
            <i className="ti ti-building" aria-hidden="true" />
          </div>
          {sidebarOpen && (
            <div>
              <p className="admin-sidebar__title">Premier Inn</p>
              <p className="admin-sidebar__subtitle">Admin Panel</p>
            </div>
          )}
        </div>

        <nav className="admin-sidebar__nav">
          {visibleMenu.map((item) => renderMenuItem(item))}
        </nav>

        <div className="admin-sidebar__footer">
          <button
            type="button"
            className="admin-sidebar__toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <i className={`ti ${sidebarOpen ? 'ti-chevron-left' : 'ti-chevron-right'}`} aria-hidden="true" />
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-topbar__title">Hotel Premier Inn</p>
            <p className="admin-topbar__date">
              {new Date().toLocaleDateString('en-IN', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
          <div className="admin-topbar__user">
            <div className="admin-topbar__status" />
            <div>
              <p className="admin-topbar__name">{user?.name || user?.username}</p>
              <p className="admin-topbar__role">{user?.roleName || 'User'}</p>
            </div>
            <button type="button" className="admin-topbar__logout" onClick={handleLogout} title="Logout">
              <i className="ti ti-logout" aria-hidden="true" />
            </button>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
