import { PERMISSIONS } from './permissions'

export const MENU_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: 'ti-layout-dashboard', permission: PERMISSIONS.DASHBOARD_VIEW },
  {
    label: 'Masters',
    icon: 'ti-database',
    children: [
      { path: '/masters/companies', label: 'Company Master', icon: 'ti-building', permission: PERMISSIONS.COMPANY_VIEW },
      { path: '/masters/roles', label: 'Role Master', icon: 'ti-shield', permission: PERMISSIONS.ROLE_VIEW },
      { path: '/masters/role-claims', label: 'Role Claim Master', icon: 'ti-key', permission: PERMISSIONS.ROLE_CLAIM_VIEW },
      { path: '/masters/role-mapping', label: 'Role Mapping', icon: 'ti-link', permission: PERMISSIONS.ROLE_MAPPING_VIEW },
      {
        label: 'Basic Masters',
        icon: 'ti-list',
        children: [
          { path: '/masters/basic/branch', label: 'Branch Master', icon: 'ti-git-branch', permission: PERMISSIONS.BRANCH_MASTER_VIEW },
          { path: '/masters/basic/city', label: 'City Master', icon: 'ti-building-skyscraper', permission: PERMISSIONS.CITY_MASTER_VIEW },
          { path: '/masters/basic/country', label: 'Country Master', icon: 'ti-flag', permission: PERMISSIONS.COUNTRY_MASTER_VIEW },
          { path: '/masters/basic/tax', label: 'Tax Master', icon: 'ti-receipt', permission: PERMISSIONS.TAX_MASTER_VIEW },
        ]
      },
      {
        label: 'Master User',
        icon: 'ti-user',
        children: [
          { path: '/masters/masteruser/area', label: 'Area Master', icon: 'ti-map-pin', permission: PERMISSIONS.AREA_MASTER_VIEW },
          { path: '/masters/masteruser/table', label: 'Table Master', icon: 'ti-table', permission: PERMISSIONS.TABLE_MASTER_VIEW },
          { path: '/masters/masteruser/waiter', label: 'Waiter Master', icon: 'ti-shirt', permission: PERMISSIONS.WAITER_MASTER_VIEW },
        ]
      },
      { path: '/masters/pos-order-screen', label: 'POS Order Screen', icon: 'ti-shopping-cart', permission: PERMISSIONS.POS_ORDER_SCREEN_VIEW },
      { path: '/masters/welcome', label: 'Welcome Page', icon: 'ti-hand-wave', permission: PERMISSIONS.WELCOME_VIEW },
    ]
  },
  { path: '/users', label: 'User Master', icon: 'ti-users', permission: PERMISSIONS.USER_VIEW },
  {
    label: 'Reports',
    icon: 'ti-report',
    children: [
      { path: '/reports/companies', label: 'Company Report', icon: 'ti-building', permission: PERMISSIONS.COMPANY_REPORT_VIEW },
      { path: '/reports/users', label: 'User Report', icon: 'ti-users', permission: PERMISSIONS.USER_REPORT_VIEW },
      { path: '/reports/attendance', label: 'Attendance Report', icon: 'ti-calendar-stats', permission: PERMISSIONS.ATTENDANCE_REPORT_VIEW },
    ],
  },
]
