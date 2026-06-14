import { mockStore } from './mockStore'

export const getRoles = () => mockStore.getCollection('roles')
export const getRoleById = (id) => mockStore.getById('roles', id)
export const createRole = (payload) => mockStore.create('roles', payload)
export const updateRole = (id, payload) => mockStore.update('roles', id, payload)
export const deleteRole = (id) => mockStore.remove('roles', id)
