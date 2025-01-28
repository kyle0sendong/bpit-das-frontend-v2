import { createBrowserRouter, Navigate } from "react-router-dom";

import DefaultLayout from "./layout/DefaultLayout";
import GuessLayout from "./layout/GuessLayout";

import ConfigurationsLayout from "@/app/layout/ConfigurationsLayout";
import Stations from "@/pages/configurations/pages/stations/Stations";
import SerialAnalyzers from "@/pages/configurations/pages/serial-analyzers/SerialAnalyzers";
import TcpAnalyzers from "@/pages/configurations/pages/tcp-analyzers/TcpAnalyzers";
import VirtualChannel from "@/pages/configurations/pages/virtual-channels/VirtualChannel";
import AddAnalyzerPage from "@/pages/configurations/pages/add-analyzer/AddAnalyzerPage";

import AccountSettings from "@/pages/account-settings";
import UserLogsPage from "@/pages/user-logs/UserLogsPage";
import DataHistoryPage from "@/pages/data-history/DataHistoryPage";
import DataMonitoring from "@/pages/data-monitoring/DataMonitoringPage";

const router = createBrowserRouter(
  [
    {
      path:"/",
      element: <GuessLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="/data-monitoring" replace />, // Default path when visiting
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
      path:"/",
      element: <DefaultLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="/configurations/stations" replace />, // Default path when visiting
        },
        {
          path:`/user-logs`,
          element: <UserLogsPage />
        },
        {
          path:`/account-settings`,
          element: <AccountSettings />
        },
        {
          path:`/configurations`,
          element: <ConfigurationsLayout />,
          children: [
            {
              path:`stations`,
              element: <Stations />
            },
            {
              path:`virtual-channels`,
              element: <VirtualChannel />
            },
            {
              path:`tcp-analyzers/:id`,
              element: <TcpAnalyzers />
            },
            {
              path: 'add-tcp-analyzer',
              element: <AddAnalyzerPage />
            },
            {
              path:`serial-analyzers`,
              element: <SerialAnalyzers />
            }
          ]
        }
      ]
    }
  ]
)

export default router;