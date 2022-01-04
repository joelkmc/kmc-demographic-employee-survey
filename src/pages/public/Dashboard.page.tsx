import React from 'react';
import { Link } from 'react-location';

const DashboardPage = () => {
  return (
    <div>
      DashboardPage
      <Link to='/auth'>Link to Auth</Link>
    </div>
  );
};

export default DashboardPage;
