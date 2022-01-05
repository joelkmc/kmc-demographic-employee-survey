import { Outlet, ReactLocation, Router } from 'react-location';
import { LocationGenerics, routes } from './routes';
import { ReactLocationDevtools } from 'react-location-devtools';
import LayoutComponent from '../../components/layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import NotFoundPage from '../../pages/NotFoundPage';

const location = new ReactLocation<LocationGenerics>();
const queryClient = new QueryClient();

const RoutesNavigation = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router
        location={location}
        routes={routes(queryClient)}
        // basepath='/'
        defaultErrorElement={<NotFoundPage />}
        // defaultPendingMs={1000}
        // defaultPendingMinMs={500}
      >
        <LayoutComponent>
          <Outlet />
        </LayoutComponent>
        <ReactLocationDevtools initialIsOpen={false} />
      </Router>
    </QueryClientProvider>
  );
};

export default RoutesNavigation;
