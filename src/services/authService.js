import { mockStore } from '../api/mockStore'

export const login = (username, password) => mockStore.authenticate(username, password)
