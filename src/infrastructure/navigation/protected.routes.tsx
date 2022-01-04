import { MakeGenerics, Route } from 'react-location';
import SurveyPage from '../../pages/Survey.page';

export const protectedRoutes: Route[] = [
  {
    path: '/employee-information',
    children: [{ path: ':employeeID', element: <SurveyPage /> }],
  },
];

export type ProtectedRouteLocationGenerics = MakeGenerics<{
  Params: {
    employeeID: string;
  };
}>;
