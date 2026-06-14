import axiosClient from './axiosClient'

export const login = (payload) => axiosClient.post('/auth/login', payload)
export const signup = (payload) => axiosClient.post('/auth/signup', payload)
export const forgotPassword = (payload) =>
  axiosClient.post('/auth/forgot-password', payload)
export const resetPassword = (payload) =>
  axiosClient.post('/auth/reset-password', payload)
