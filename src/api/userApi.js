import { mockStore } from './mockStore'

export const getUsers = () => mockStore.getCollection('users')
export const getUserById = (id) => mockStore.getById('users', id)
export const createUser = (payload) => mockStore.create('users', payload)
export const updateUser = (id, payload) => mockStore.update('users', id, payload)
export const deleteUser = (id) => mockStore.remove('users', id)
