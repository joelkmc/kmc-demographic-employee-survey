import { Outlet, ReactLocation, Router } from 'react-location';
import NotFoundPage from '../../pages/NotFoundPage';
import { dashboardRoutes } from './public.routes';
import { ReactLocationDevtools } from 'react-location-devtools';
import LayoutComponent from '../../components/layout';
import { protectedRoutes } from './protected.routes';

const location = new ReactLocation();

const routes = [...dashboardRoutes, ...protectedRoutes];

const RoutesNavigation = () => {
  return (
    <Router
      location={location}
      routes={routes}
      basepath='/'
      defaultErrorElement={<NotFoundPage />}
      defaultElement={<NotFoundPage />}
      defaultPendingMs={1000}
      defaultPendingMinMs={500}
    >
      <LayoutComponent>
        <Outlet /> {/* Start rendering router matches */}
      </LayoutComponent>
      <ReactLocationDevtools initialIsOpen={false} />
    </Router>
  );
};

export default RoutesNavigation;
