import { createBrowserRouter, Navigate } from "react-router-dom";

import DefaultLayout from "./layout/DefaultLayout";

import Configurations from "@/pages/configurations/ConfigurationsLayout";
import Stations from "@/pages/configurations/pages/stations/Stations";
import SerialAnalyzers from "@/pages/configurations/pages/serial-analyzers/SerialAnalyzers";
import TcpAnalyzers from "@/pages/configurations/pages/tcp-analyzers/TcpAnalyzers";
import VirtualChannel from "@/pages/configurations/pages/virtual-channels/VirtualChannel";

import AccountSettings from "@/pages/account-settings";
import UserLogs from "@/pages/user-logs";
import DataHistory from "@/pages/data-history";
import DataMonitoring from "@/pages/data-monitoring";

const router = createBrowserRouter(
  [
    {
      path:"/",
      element: <DefaultLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="/configurations/stations" replace />, // Default path when visiting
        },
        {
          path:`/configurations`, // protected
          element: <Configurations />,
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
              path:`serial-analyzers`,
              element: <SerialAnalyzers />
            }
          ]
        },
        {
          path:`/data-monitoring`, // not protected
          element: <DataMonitoring />
        },
        {
          path:`/data-history`, // not protected
          element: <DataHistory />
        },
        {
          path:`/user-logs`, // protected
          element: <UserLogs />
        },
        {
          path:`/account-settings`, // protected
          element: <AccountSettings />
        }
      ]
    }
  ]
)

export default router;