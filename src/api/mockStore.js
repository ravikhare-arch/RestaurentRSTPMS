import { ALL_PERMISSIONS } from '../config/permissions'

const STORAGE_KEY = 'admin_panel_data'

const seedData = () => ({
  companies: [
    { id: '1', name: 'Hotel Premier Inn', code: 'HPI', address: 'MG Road', city: 'Mumbai', phone: '022-12345678', email: 'info@premierinn.com', isActive: true },
    { id: '2', name: 'Grand Palace Hotels', code: 'GPH', address: 'Park Street', city: 'Kolkata', phone: '033-87654321', email: 'contact@grandpalace.com', isActive: true },
  ],
  roles: [
    { id: '1', name: 'Administrator', code: 'ADMIN', description: 'Full system access', isActive: true },
    { id: '2', name: 'Manager', code: 'MANAGER', description: 'Manage operations and users', isActive: true },
    { id: '3', name: 'Staff', code: 'STAFF', description: 'View only access', isActive: true },
  ],
  roleClaims: [
    { id: '1', code: 'dashboard.view', name: 'View Dashboard', module: 'Dashboard', description: 'Access dashboard' },
    { id: '2', code: 'company.view', name: 'View Companies', module: 'Company', description: 'View company list' },
    { id: '3', code: 'company.create', name: 'Create Company', module: 'Company', description: 'Add new company' },
    { id: '4', code: 'company.edit', name: 'Edit Company', module: 'Company', description: 'Update company' },
    { id: '5', code: 'company.delete', name: 'Delete Company', module: 'Company', description: 'Remove company' },
    { id: '6', code: 'role.view', name: 'View Roles', module: 'Role', description: 'View role list' },
    { id: '7', code: 'role.create', name: 'Create Role', module: 'Role', description: 'Add new role' },
    { id: '8', code: 'role.edit', name: 'Edit Role', module: 'Role', description: 'Update role' },
    { id: '9', code: 'role.delete', name: 'Delete Role', module: 'Role', description: 'Remove role' },
    { id: '10', code: 'roleclaim.view', name: 'View Role Claims', module: 'Role Claim', description: 'View claims' },
    { id: '11', code: 'roleclaim.create', name: 'Create Role Claim', module: 'Role Claim', description: 'Add claim' },
    { id: '12', code: 'roleclaim.edit', name: 'Edit Role Claim', module: 'Role Claim', description: 'Update claim' },
    { id: '13', code: 'roleclaim.delete', name: 'Delete Role Claim', module: 'Role Claim', description: 'Remove claim' },
    { id: '14', code: 'rolemapping.view', name: 'View Role Mapping', module: 'Role Mapping', description: 'View mappings' },
    { id: '15', code: 'rolemapping.create', name: 'Create Role Mapping', module: 'Role Mapping', description: 'Add mapping' },
    { id: '16', code: 'rolemapping.edit', name: 'Edit Role Mapping', module: 'Role Mapping', description: 'Update mapping' },
    { id: '17', code: 'rolemapping.delete', name: 'Delete Role Mapping', module: 'Role Mapping', description: 'Remove mapping' },
    { id: '18', code: 'user.view', name: 'View Users', module: 'User', description: 'View user list' },
    { id: '19', code: 'user.create', name: 'Create User', module: 'User', description: 'Add user' },
    { id: '20', code: 'user.edit', name: 'Edit User', module: 'User', description: 'Update user' },
    { id: '21', code: 'user.delete', name: 'Delete User', module: 'User', description: 'Remove user' },
  ],
  roleMappings: [
    { id: '1', roleId: '1', claimIds: ALL_PERMISSIONS },
    {
      id: '2',
      roleId: '2',
      claimIds: ['dashboard.view', 'company.view', 'company.create', 'company.edit', 'role.view', 'user.view', 'user.create', 'user.edit', 'rolemapping.view'],
    },
    {
      id: '3',
      roleId: '3',
      claimIds: ['dashboard.view', 'company.view', 'role.view', 'user.view', 'roleclaim.view', 'rolemapping.view'],
    },
  ],
  users: [
    { id: '1', username: 'Admin', password: 'admin', name: 'System Admin', email: 'admin@premierinn.com', phone: '9999999999', companyId: '1', roleId: '1', isActive: true },
    { id: '2', username: 'Manager', password: 'manager', name: 'Restaurant Manager', email: 'manager@premierinn.com', phone: '8888888888', companyId: '1', roleId: '2', isActive: true },
    { id: '3', username: 'Staff', password: 'staff', name: 'Front Desk Staff', email: 'staff@premierinn.com', phone: '7777777777', companyId: '1', roleId: '3', isActive: true },
  ],
})

const loadStore = () => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    const data = seedData()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return data
  }
  return JSON.parse(raw)
}

const saveStore = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

const nextId = (items) => String(Math.max(0, ...items.map((i) => Number(i.id) || 0)) + 1)

export const mockStore = {
  async getCollection(key) {
    await delay()
    const store = loadStore()
    return { data: store[key] || [] }
  },

  async getById(key, id) {
    await delay()
    const store = loadStore()
    const item = (store[key] || []).find((row) => row.id === String(id))
    if (!item) throw new Error('Not found')
    return { data: item }
  },

  async create(key, payload) {
    await delay()
    const store = loadStore()
    const item = { ...payload, id: nextId(store[key] || []) }
    store[key] = [...(store[key] || []), item]
    saveStore(store)
    return { data: item }
  },

  async update(key, id, payload) {
    await delay()
    const store = loadStore()
    const index = (store[key] || []).findIndex((row) => row.id === String(id))
    if (index === -1) throw new Error('Not found')
    const item = { ...store[key][index], ...payload, id: String(id) }
    store[key][index] = item
    saveStore(store)
    return { data: item }
  },

  async remove(key, id) {
    await delay()
    const store = loadStore()
    store[key] = (store[key] || []).filter((row) => row.id !== String(id))
    saveStore(store)
    return { data: { success: true } }
  },

  async authenticate(username, password) {
    await delay(500)
    const store = loadStore()
    const user = store.users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password && u.isActive,
    )
    if (!user) {
      const error = new Error('Invalid username or password')
      throw error
    }

    const role = store.roles.find((r) => r.id === user.roleId)
    const mapping = store.roleMappings.find((m) => m.roleId === user.roleId)
    const company = store.companies.find((c) => c.id === user.companyId)
    const claims = mapping?.claimIds || []

    const { password: _, ...safeUser } = user
    return {
      data: {
        token: `mock-token-${user.id}`,
        user: {
          ...safeUser,
          roleName: role?.name,
          roleCode: role?.code,
          companyName: company?.name,
          claims,
        },
      },
    }
  },

  getClaimsForRole(roleId) {
    const store = loadStore()
    const mapping = store.roleMappings.find((m) => m.roleId === String(roleId))
    return mapping?.claimIds || []
  },
}
