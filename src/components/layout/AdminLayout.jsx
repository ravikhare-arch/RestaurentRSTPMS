import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { MENU_ITEMS } from '../../config/menu'
import useAuth from '../../hooks/useAuth'
import { hasPermission } from '../../utils/permissions'

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const visibleMenu = MENU_ITEMS.filter((item) =>
    hasPermission(user?.claims || [], item.permission),
  )

  const handleLogout = () => {
    logout()
    navigate('/login')
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
          {visibleMenu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `admin-sidebar__link ${isActive ? 'active' : ''}`
              }
              title={item.label}
            >
              <i className={`ti ${item.icon}`} aria-hidden="true" />
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
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
