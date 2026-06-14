import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import PermissionRoute from './PermissionRoute'
import AdminLayout from '../components/layout/AdminLayout'
import Dashboard from '../pages/dashboard/Dashboard'
import Login from '../pages/auth/Login'
import ForgotPassword from '../pages/auth/ForgotPassword'
import SignUp from '../pages/auth/Signup'
import ResetPassword from '../pages/auth/ResetPassword'
import CompanyList from '../pages/masters/company/CompanyList'
import CompanyCreate from '../pages/masters/company/CompanyCreate'
import CompanyEdit from '../pages/masters/company/CompanyEdit'
import RoleList from '../pages/masters/role/RoleList'
import RoleCreate from '../pages/masters/role/RoleCreate'
import RoleEdit from '../pages/masters/role/RoleEdit'
import RoleClaimList from '../pages/masters/roleClaim/RoleClaimList'
import RoleClaimForm from '../pages/masters/roleClaim/RoleClaimForm'
import RoleMappingList from '../pages/masters/roleMapping/RoleMappingList'
import RoleMappingForm from '../pages/masters/roleMapping/RoleMappingForm'
import UserList from '../pages/users/UserList'
import UserCreate from '../pages/users/UserCreate'
import UserEdit from '../pages/users/UserEdit'
import BranchMaster from '../pages/masters/BasicMaster/BranchMaster'
import CityMaster from '../pages/masters/BasicMaster/CityMaster'
import CountryMaster from '../pages/masters/BasicMaster/CountryMaster'
import TaxMaster from '../pages/masters/BasicMaster/TaxMaster'
import AreaMaster from '../pages/masters/masteruser/AreaMaster'
import TableMaster from '../pages/masters/masteruser/TableMaster'
import WaiterMaster from '../pages/masters/masteruser/WaiterMaster'
import POSOrderScreen from '../pages/masters/POSOrderScreen/POSOrderScreen'
import Welcome from '../pages/masters/POSOrderScreen/WelCome'
import { PERMISSIONS } from '../config/permissions'

const AppRoutes = () => (
  <Routes>
    <Route element={<PublicRoute />}>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Route>

    <Route element={<ProtectedRoute />}>
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route element={<PermissionRoute permission={PERMISSIONS.COMPANY_VIEW} />}>
          <Route path="/masters/companies" element={<CompanyList />} />
          <Route path="/masters/companies/create" element={<CompanyCreate />} />
          <Route path="/masters/companies/:id/edit" element={<CompanyEdit />} />
        </Route>

        <Route element={<PermissionRoute permission={PERMISSIONS.ROLE_VIEW} />}>
          <Route path="/masters/roles" element={<RoleList />} />
          <Route path="/masters/roles/create" element={<RoleCreate />} />
          <Route path="/masters/roles/:id/edit" element={<RoleEdit />} />
        </Route>

        <Route element={<PermissionRoute permission={PERMISSIONS.ROLE_CLAIM_VIEW} />}>
          <Route path="/masters/role-claims" element={<RoleClaimList />} />
          <Route path="/masters/role-claims/create" element={<RoleClaimForm />} />
          <Route path="/masters/role-claims/:id/edit" element={<RoleClaimForm />} />
        </Route>

        <Route element={<PermissionRoute permission={PERMISSIONS.ROLE_MAPPING_VIEW} />}>
          <Route path="/masters/role-mapping" element={<RoleMappingList />} />
          <Route path="/masters/role-mapping/create" element={<RoleMappingForm />} />
          <Route path="/masters/role-mapping/:id/edit" element={<RoleMappingForm />} />
        </Route>

        <Route element={<PermissionRoute permission={PERMISSIONS.USER_VIEW} />}>
          <Route path="/users" element={<UserList />} />
          <Route path="/users/create" element={<UserCreate />} />
          <Route path="/users/:id/edit" element={<UserEdit />} />
        </Route>

        <Route element={<PermissionRoute permission={PERMISSIONS.BRANCH_MASTER_VIEW} />}>
          <Route path="/masters/basic/branch" element={<BranchMaster />} />
        </Route>
        <Route element={<PermissionRoute permission={PERMISSIONS.CITY_MASTER_VIEW} />}>
          <Route path="/masters/basic/city" element={<CityMaster />} />
        </Route>
        <Route element={<PermissionRoute permission={PERMISSIONS.COUNTRY_MASTER_VIEW} />}>
          <Route path="/masters/basic/country" element={<CountryMaster />} />
        </Route>
        <Route element={<PermissionRoute permission={PERMISSIONS.TAX_MASTER_VIEW} />}>
          <Route path="/masters/basic/tax" element={<TaxMaster />} />
        </Route>

        <Route element={<PermissionRoute permission={PERMISSIONS.AREA_MASTER_VIEW} />}>
          <Route path="/masters/masteruser/area" element={<AreaMaster />} />
        </Route>
        <Route element={<PermissionRoute permission={PERMISSIONS.TABLE_MASTER_VIEW} />}>
          <Route path="/masters/masteruser/table" element={<TableMaster />} />
        </Route>
        <Route element={<PermissionRoute permission={PERMISSIONS.WAITER_MASTER_VIEW} />}>
          <Route path="/masters/masteruser/waiter" element={<WaiterMaster />} />
        </Route>

        <Route element={<PermissionRoute permission={PERMISSIONS.POS_ORDER_SCREEN_VIEW} />}>
          <Route path="/masters/pos-order-screen" element={<POSOrderScreen />} />
        </Route>
        <Route element={<PermissionRoute permission={PERMISSIONS.WELCOME_VIEW} />}>
          <Route path="/masters/welcome" element={<Welcome />} />
        </Route>
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
)

export default AppRoutes
