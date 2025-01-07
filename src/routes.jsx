import { createBrowserRouter } from "react-router-dom";

// Layouts
import ConfigurationsLayout from "./Pages/default/Configurations/ConfigurationsLayout";
import MonitorDataLayout from "./Pages/default/MonitorData/MonitorDataLayout"
import UserLogsLayout from "./Pages/default/UserLogs/UserLogsLayout";
import DataReporterLayout from "./Pages/default/DataReporter/DataReporterLayout";
import DefaultLayout from "./Pages/default/DefaultLayout";

// Default Pages
import ParametersPage from "./Pages/default/Configurations/ParametersPage";
import HomePage from "./Pages/default/Configurations/HomePage";
import MonitorPage from "./Pages/default/MonitorData/MonitorPage";
import UserLogs from "./Pages/default/UserLogs/UserLogs";
import DataReporterPage from "./Pages/default/DataReporter/DataReporterPage";

// Guest Pages
import PageNotFound from "./Pages/guest/PageNotFound";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/configurations',
        element: <ConfigurationsLayout />,
        children: [
          {
            path:'parameters/:tcp_analyzer_id?',
            element: <ParametersPage />
          },
    
          {
            path:'home',
            element: <HomePage /> 
          },
        ]
      },
      {
        path: '/data-reporter',
        element: <DataReporterLayout />,
        children: [
          {
            path: ':search?',
            element: <DataReporterPage />
          }
        ]
      },
      {
        path: '/monitor-data',
        element: <MonitorDataLayout/>,
        children: [
          {
            path:'tcp/:analyzer_id?',
            element: <MonitorPage />
          },
          {
            path:'others/:analyzer_id?',
            element: <MonitorPage />
          }
        ]
      },
      {
        path: '/user-logs',
        element: <UserLogsLayout/>,
        children: [
          {
            path:':date?',
            element: <UserLogs />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <PageNotFound />
  }


])

export default routes;