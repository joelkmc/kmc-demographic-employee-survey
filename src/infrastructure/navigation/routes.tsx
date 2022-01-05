import { MakeGenerics, Route } from 'react-location';
import { QueryClient } from 'react-query';

import SurveyPage from '../../pages/Survey.page';
import VerifyEmployeePage from '../../pages/VerifyEmployee.pages';
import { EmployeeAPI } from '../../services/verify_employee/auth.services';

export const routes: (
  queryClient: QueryClient
) => Route<{ Params: { employeeID: string } }>[] = (
  queryClient: QueryClient
) => [
  {
    path: '/',
    children: [
      {
        path: 'verify-employee',
        element: <VerifyEmployeePage />,
      },
      {
        path: 'employee-information',
        children: [
          {
            path: ':employeeID',
            element: <SurveyPage />,
            loader: ({
              params: { employeeID },
            }: {
              params: { employeeID: string };
            }) =>
              queryClient.fetchQuery(['employee-information', employeeID], () =>
                EmployeeAPI.employeeDemographic(employeeID)
              ),
          },
        ],
      },
    ],
  },
];

export type LocationGenerics = MakeGenerics<{
  Params: {
    employeeID: string;
  };
}>;
