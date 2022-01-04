import React from 'react';
import { useMatch } from 'react-location';
import { ProtectedRouteLocationGenerics } from '../infrastructure/navigation/protected.routes';

const SurveyPage: React.FC = () => {
  const { employeeID } = useMatch<ProtectedRouteLocationGenerics>().params;

  return <div>{employeeID}</div>;
};

export default SurveyPage;
