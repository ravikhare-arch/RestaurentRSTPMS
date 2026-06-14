import axiosClient from './axiosClient'

export const getAttendanceReport = (params) =>
  axiosClient.get('/reports/attendance', { params })
export const getUserReport = (params) =>
  axiosClient.get('/reports/users', { params })
export const getCompanyReport = (params) =>
  axiosClient.get('/reports/companies', { params })
