import { MakeGenerics, Route } from 'react-location';
import { QueryClient } from 'react-query';
import AlreadySubmittedPage from '../../components/features/AlreadySubmitted/AlreadySubmitted.page';

import VerifyEmployeePage from '../../components/features/VerifyEmployee/VerifyEmployee.pages';

export const routes: (
  queryClient: QueryClient
) => Route<{ Params: { employeeID: string } }>[] = () => [
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
