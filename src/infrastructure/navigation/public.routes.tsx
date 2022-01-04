import { Route } from 'react-location';
import NotFoundPage from '../../pages/NotFoundPage';
import VerifyEmployeePage from '../../pages/VerifyEmployee.pages';

export const dashboardRoutes: Route[] = [
  {
    path: '/',
    element: <VerifyEmployeePage />,
    errorElement: <NotFoundPage />,
  },
];
