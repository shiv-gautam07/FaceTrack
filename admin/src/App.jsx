import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Outlet,
} from 'react-router';

import './App.css';
import { AuthProvider } from '@/auth/AuthContext';
import ProtectedRoute from '@/routing/ProtectedRoute';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import Login from '@/pages/login/login';

// Pages
import DashboardPage from '@/pages/dashboard';
import UserManagementPage from '@/pages/users';
import AttendanceLogsPage from '@/pages/attendance';
import FaceDetectLogsPage from '@/pages/face-recognition';
import LocationsPage from '@/pages/locations';
import NotificationsPage from '@/pages/notifications';
import LeaveRequestsPage from '@/pages/leaves';
import ReportsPage from '@/pages/reports';
import SettingsPage from '@/pages/settings';

const UnauthorizedPage = () => <div>Unauthorized</div>;

const AuthLayoutWrapper = () => (
  <AuthLayout>
    <Outlet />
  </AuthLayout>
);
const MainLayoutWrapper = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      <Route element={<AuthLayoutWrapper />}>
        <Route path="/login" element={<Login />} />
        <Route path="/public" element={<div>Public Content</div>} />
      </Route>

      {/* Protected Routes */}
      <Route element={<MainLayoutWrapper />}>
        <Route
          index
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/users" element={<UserManagementPage />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/attendance" element={<AttendanceLogsPage />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/face-recognition" element={<FaceDetectLogsPage />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/location" element={<LocationsPage />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/notifications" element={<NotificationsPage />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/leave" element={<LeaveRequestsPage />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/reports" element={<ReportsPage />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Route>
    </>,
  ),
);

const AppRouter = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default AppRouter;
