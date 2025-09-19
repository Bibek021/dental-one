// React Router configuration with protected routes

import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/public/HomePage';
import { ComponentDemo } from '../pages/ComponentDemo';
import { SuperAdminLayout } from '../components/layout/SuperAdminLayout';
import { ClinicAdminLayout } from '../components/layout/ClinicAdminLayout';
import { PublicLayout } from '../components/layout/PublicLayout';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { SuperAdminDashboard, ClinicAdminDashboard, DoctorDashboard } from '../pages/Dashboard';
import { PatientsManagement } from '../pages/admin/PatientsManagement';
import { AppointmentsManagement } from '../pages/admin/AppointmentsManagement';
import { TreatmentsManagement } from '../pages/admin/TreatmentsManagement';
import { StaffManagement } from '../pages/admin/StaffManagement';
import { BillingManagement } from '../pages/admin/BillingManagement';
import { ReportsAnalytics } from '../pages/admin/ReportsAnalytics';
import { MultiClinicManagement } from '../pages/admin/MultiClinicManagement';
import { SubscriptionManagement } from '../pages/admin/SubscriptionManagement';
import { NotificationCenter } from '../pages/admin/NotificationCenter';
import { FileManagement } from '../pages/admin/FileManagement';
import { AdvancedReporting } from '../pages/admin/AdvancedReporting';
import { NotFound } from '../pages/NotFound';

// Placeholder component for development
function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          This page is under development and will be available soon.
        </p>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'demo',
        element: <ComponentDemo />,
      },
    ],
  },

  // Authentication Routes
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },

  // Super Admin Routes
  {
    path: '/super-admin',
    element: (
      <ProtectedRoute requiredRole="super_admin">
        <SuperAdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <SuperAdminDashboard />,
      },
      {
        path: 'clinics',
        element: <MultiClinicManagement />,
      },
      {
        path: 'subscriptions',
        element: <SubscriptionManagement />,
      },
      {
        path: 'analytics',
        element: <ReportsAnalytics />,
      },
      {
        path: 'notifications',
        element: <NotificationCenter />,
      },
      {
        path: 'files',
        element: <FileManagement />,
      },
      {
        path: 'reports',
        element: <AdvancedReporting />,
      },
    ],
  },

  // Clinic Admin Routes
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRole="admin">
        <ClinicAdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ClinicAdminDashboard />,
      },
      {
        path: 'patients',
        element: <PatientsManagement />,
      },
      {
        path: 'appointments',
        element: <AppointmentsManagement />,
      },
      {
        path: 'staff',
        element: <StaffManagement />,
      },
      {
        path: 'treatments',
        element: <TreatmentsManagement />,
      },
      {
        path: 'billing',
        children: [
          {
            index: true,
            element: <BillingManagement />,
          },
          {
            path: 'invoices',
            element: <BillingManagement />,
          },
          {
            path: 'payments',
            element: <BillingManagement />,
          },
          {
            path: 'insurance',
            element: <BillingManagement />,
          },
        ],
      },
      {
        path: 'reports',
        element: <ReportsAnalytics />,
      },
      {
        path: 'notifications',
        element: <NotificationCenter />,
      },
    ],
  },

  // Doctor Routes (restricted clinic admin)
  {
    path: '/doctor',
    element: (
      <ProtectedRoute requiredRole="doctor">
        <ClinicAdminLayout isDoctorMode />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DoctorDashboard />,
      },
      {
        path: 'patients',
        element: <PatientsManagement />,
      },
      {
        path: 'appointments',
        element: <AppointmentsManagement />,
      },
      {
        path: 'treatments',
        element: <TreatmentsManagement />,
      },
    ],
  },

  // Error Routes
  {
    path: '/unauthorized',
    element: <ComingSoon title="Unauthorized Access" />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);