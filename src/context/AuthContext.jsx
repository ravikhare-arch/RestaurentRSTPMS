import { createContext, useEffect, useMemo, useState } from 'react'
import { getStorageItem, removeStorageItem, setStorageItem } from '../utils/localStorage'

const AUTH_KEY = 'auth_session'

export const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  login: () => undefined,
  logout: () => undefined,
})

const loadSession = () => {
  const raw = getStorageItem(AUTH_KEY)
  if (!raw) return { user: null, token: null, isAuthenticated: false }
  try {
    const session = JSON.parse(raw)
    return { user: session.user, token: session.token, isAuthenticated: true }
  } catch {
    return { user: null, token: null, isAuthenticated: false }
  }
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(loadSession)

  useEffect(() => {
    if (auth.isAuthenticated) {
      setStorageItem(AUTH_KEY, JSON.stringify({ user: auth.user, token: auth.token }))
    } else {
      removeStorageItem(AUTH_KEY)
    }
  }, [auth])

  const value = useMemo(
    () => ({
      ...auth,
      login: (payload) =>
        setAuth({
          user: payload.user,
          token: payload.token,
          isAuthenticated: true,
        }),
      logout: () =>
        setAuth({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    [auth],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
