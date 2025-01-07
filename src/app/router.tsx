import { createBrowserRouter, Navigate } from "react-router-dom";

import DefaultLayout from "./layout/DefaultLayout";
import Configurations from "@/pages/configurations";
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
          element: <Navigate to="/configurations" replace />, // Default path when visiting
        },
        {
          path:`/configurations`, // protected
          element: <Configurations />
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