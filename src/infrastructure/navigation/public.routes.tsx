import { Route } from 'react-location';
import LoadingPage from '../../pages/LoadingPage';
import NotFoundPage from '../../pages/NotFoundPage';
import DashboardPage from '../../pages/public/Dashboard.page';
import { apiClient } from '../../services/apiClient';

export const dashboardRoutes: Route[] = [
  { path: '/', element: <DashboardPage />, errorElement: <NotFoundPage /> },
  {
    path: '/auth',
    children: [
      {
        element: () =>
          import('../../pages/public/Auth.page').then((module) => (
            <module.default />
          )),
        pendingElement: async () => <LoadingPage />,
        loader: async () => ({
          team: await apiClient('v3.1/all', {
            prefixUrl: 'https://restcountries.com/',
            method: 'GET',
          }),
        }),
      },
    ],
  },
];
