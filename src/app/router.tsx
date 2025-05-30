import { createBrowserRouter, Navigate } from 'react-router-dom';

import DefaultLayout from './layout/DefaultLayout';
import GuestLayout from './layout/GuestLayout';
import RequireAuth from '@/components/auth/RequireAuth';
// protected routes
import ConfigurationsLayout from '@/app/layout/ConfigurationsLayout';
import Stations from '@/pages/configurations/pages/stations/Stations';
import SerialAnalyzers from '@/pages/configurations/pages/serial-analyzers';
import TcpAnalyzers from '@/pages/configurations/pages/tcp-analyzers/TcpAnalyzers';
import VirtualChannel from '@/pages/configurations/pages/virtual-channels/VirtualChannel';
import AddAnalyzerPage from '@/pages/configurations/pages/add-analyzer';
import UserDashboardPage from '@/pages/account/pages/user-dashboard/UserDashboardPage';
import AccountSettingsPage from '@/pages/account/pages/account-settings/AccountSettingsPage';

// non-protected routesh
import UserLogsPage from '@/pages/user-logs/UserLogsPage';
import DataHistoryPage from '@/pages/data-history/DataHistoryPage';
import DataMonitoring from '@/pages/data-monitoring/DataMonitoringPage';

const router = createBrowserRouter(
  [
    {
      path:'/',
      element: <GuestLayout />,
      children: [
        {
          index: true,
          element: <Navigate to='/data-monitoring' replace />, // Default path when visiting
        },
        {
          path:`/data-monitoring`, // not protected
          element: <DataMonitoring />
        },
        {
          path:`/data-history`, // not protected
          element: <DataHistoryPage />
        },
      ]
    },
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          index: true,
          element: <Navigate to='/configurations/stations' replace />,
        },
        {
          path: '/user-logs',
          element: <RequireAuth><UserLogsPage /></RequireAuth>,
        },
        {
          path: '/user-dashboard',
          element: <RequireAuth><UserDashboardPage /></RequireAuth>,
        },
        {
          path: '/settings',
          element: <RequireAuth><AccountSettingsPage /></RequireAuth>,
        },
        {
          path: '/configurations',
          element: <RequireAuth><ConfigurationsLayout /></RequireAuth>,
          children: [
            { path: 'stations', element: <Stations /> },
            { path: 'virtual-channels', element: <VirtualChannel /> },
            { path: 'tcp-analyzers/:id', element: <TcpAnalyzers /> },
            { path: 'add-analyzer', element: <AddAnalyzerPage /> },
            { path: 'serial-analyzers/:id', element: <SerialAnalyzers /> }
          ]
        }
      ]
    }
  ]
)

export default router;