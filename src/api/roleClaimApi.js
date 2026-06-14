import { mockStore } from './mockStore'

export const getRoleClaims = () => mockStore.getCollection('roleClaims')
export const getRoleClaimById = (id) => mockStore.getById('roleClaims', id)
export const createRoleClaim = (payload) => mockStore.create('roleClaims', payload)
export const updateRoleClaim = (id, payload) => mockStore.update('roleClaims', id, payload)
export const deleteRoleClaim = (id) => mockStore.remove('roleClaims', id)
