import { Outlet, ReactLocation, Router } from 'react-location';
import NotFoundPage from '../../pages/NotFoundPage';
import { dashboardRoutes } from './public.routes';
import { ReactLocationDevtools } from 'react-location-devtools';

const location = new ReactLocation();

const routes = [...dashboardRoutes];

const RoutesNavigation = () => {
  return (
    <Router
      location={location}
      routes={routes}
      basepath='/'
      defaultErrorElement={<NotFoundPage />}
      defaultPendingMs={1000}
      defaultPendingMinMs={500}
    >
      <Outlet /> {/* Start rendering router matches */}
      <ReactLocationDevtools initialIsOpen={false} />
    </Router>
  );
};

export default RoutesNavigation;
