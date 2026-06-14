import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { hasPermission } from '../utils/permissions'

const PermissionRoute = ({ permission }) => {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (permission && !hasPermission(user?.claims || [], permission)) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default PermissionRoute
