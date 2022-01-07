import { MakeGenerics, Route } from 'react-location';
import { QueryClient } from 'react-query';
import AlreadySubmittedPage from '../../components/features/AlreadySubmitted/AlreadySubmitted.page';

import VerifyEmployeePage from '../../components/features/VerifyEmployee/VerifyEmployee.pages';
import { EmployeeAPI } from '../../services/verify_employee/auth.services';

export const routes: (
  queryClient: QueryClient
) => Route<{ Params: { employeeID: string } }>[] = (
  queryClient: QueryClient
) => [
  {
    path: '/',
    element: <VerifyEmployeePage />,
  },
  {
    path: 'employee-information',
    children: [
      {
        path: ':employeeID',
        element: () =>
          import(
            '../../components/features/EmployeeDemographic/DemographicSurvey.page'
          ).then((module) => <module.default />),
        loader: async ({
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
  {
    path: 'already-submitted',
    element: <AlreadySubmittedPage />,
  },
];

export type LocationGenerics = MakeGenerics<{
  Params: {
    employeeID: string;
  };
  LoaderData: any;
}>;
