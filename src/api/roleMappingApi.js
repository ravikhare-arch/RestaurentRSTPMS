import { mockStore } from './mockStore'

export const getRoleMappings = () => mockStore.getCollection('roleMappings')
export const getRoleMappingById = (id) => mockStore.getById('roleMappings', id)
export const createRoleMapping = (payload) => mockStore.create('roleMappings', payload)
export const updateRoleMapping = (id, payload) => mockStore.update('roleMappings', id, payload)
export const deleteRoleMapping = (id) => mockStore.remove('roleMappings', id)
