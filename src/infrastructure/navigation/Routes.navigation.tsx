import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import toast from 'react-hot-toast';
import { Outlet, ReactLocation, Router } from 'react-location';

import { LocationGenerics, routes } from './routes';
import LayoutComponent from '../../components/layout';
import NotFoundPage from '../../pages/NotFoundPage';

const location = new ReactLocation<LocationGenerics>();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      onError: () => {
        toast('An error has occured!', {
          duration: 4000,
          position: 'top-center',
        });
      },
    },
  },
});

const RoutesNavigation = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router
        location={location}
        routes={routes(queryClient)}
        defaultErrorElement={<NotFoundPage />}
        // defaultPendingMs={1000}
        // defaultPendingMinMs={500}
      >
        <LayoutComponent>
          <Outlet />
        </LayoutComponent>
        {/* <ReactLocationDevtools initialIsOpen={false} /> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </Router>
    </QueryClientProvider>
  );
};

export default RoutesNavigation;
