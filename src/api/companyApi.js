import { mockStore } from './mockStore'

export const getCompanies = () => mockStore.getCollection('companies')
export const getCompanyById = (id) => mockStore.getById('companies', id)
export const createCompany = (payload) => mockStore.create('companies', payload)
export const updateCompany = (id, payload) => mockStore.update('companies', id, payload)
export const deleteCompany = (id) => mockStore.remove('companies', id)
