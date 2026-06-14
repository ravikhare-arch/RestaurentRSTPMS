import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { hasPermission } from '../utils/permissions'

const usePermission = (permission) => {
  const { user } = useContext(AuthContext)
  return hasPermission(user?.claims || [], permission)
}

export default usePermission
