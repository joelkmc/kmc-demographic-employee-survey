import { MakeGenerics, Route } from 'react-location';

import SurveyPage from '../../pages/Survey.page';
import VerifyEmployeePage from '../../pages/VerifyEmployee.pages';

export const routes: Route[] = [
  {
    path: '/',
    children: [
      {
        path: 'verify-employee',
        element: <VerifyEmployeePage />,
      },
      {
        path: 'employee-information',
        children: [{ path: ':employeeID', element: <SurveyPage /> }],
      },
    ],
  },
];

export type ProtectedRouteLocationGenerics = MakeGenerics<{
  Params: {
    employeeID: string;
  };
}>;
