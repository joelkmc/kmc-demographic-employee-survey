import { Outlet, ReactLocation, Router } from 'react-location';
import { routes } from './routes';
import { ReactLocationDevtools } from 'react-location-devtools';
import LayoutComponent from '../../components/layout';

const location = new ReactLocation();

const RoutesNavigation = () => {
  return (
    <Router
      location={location}
      routes={routes}
      // basepath='/'
      // defaultErrorElement={<NotFoundPage />}
      // defaultPendingMs={1000}
      // defaultPendingMinMs={500}
    >
      <LayoutComponent>
        <Outlet />
      </LayoutComponent>
      <ReactLocationDevtools initialIsOpen={false} />
    </Router>
  );
};

export default RoutesNavigation;
