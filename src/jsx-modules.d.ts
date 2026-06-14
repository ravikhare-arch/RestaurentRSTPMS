declare module '*.jsx' {
  import type { ComponentType } from 'react'

  const component: ComponentType<Record<string, unknown>>
  export default component

  export const AuthProvider: ComponentType<{ children: React.ReactNode }>
  export const AuthContext: React.Context<Record<string, unknown>>
}
