import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Dashboard = () => {
  const { user } = useAuth()

  const stats = [
    { label: "Today's Orders", value: '142', change: '+12%' },
    { label: 'Active Tables', value: '18/24', change: '75%' },
    { label: 'Revenue Today', value: '₹48,320', change: '+8%' },
    { label: 'Pending Bills', value: '6', change: '-2' },
  ]

  const quickLinks = [
    { path: '/masters/companies', label: 'Companies', icon: 'ti-building' },
    { path: '/masters/roles', label: 'Roles', icon: 'ti-shield' },
    { path: '/users', label: 'Users', icon: 'ti-users' },
    { path: '/masters/role-mapping', label: 'Role Mapping', icon: 'ti-link' },
  ]

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Dashboard</h1>
          <p className="page-header__subtitle">
            Welcome back, {user?.name || user?.username}. Role: {user?.roleName}
          </p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <p className="stat-card__value">{s.value}</p>
            <p className="stat-card__label">{s.label}</p>
            <span className="badge badge-success">{s.change}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 style={{ fontSize: '15px', margin: '0 0 1rem', color: '#2d1008' }}>Quick Access</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '10px' }}>
          {quickLinks.map((link) => (
            <Link key={link.path} to={link.path} className="btn btn-outline" style={{ justifyContent: 'center' }}>
              <i className={`ti ${link.icon}`} aria-hidden="true" /> {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: '1rem' }}>
        <h2 style={{ fontSize: '15px', margin: '0 0 0.75rem', color: '#2d1008' }}>Your Permissions</h2>
        <p style={{ fontSize: '12px', color: 'rgba(80,30,10,0.55)', margin: '0 0 0.75rem' }}>
          Menu and pages are shown based on your role claims.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {(user?.claims || []).map((claim) => (
            <span key={claim} className="badge badge-success">{claim}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
