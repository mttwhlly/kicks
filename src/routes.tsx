import { createBrowserRouter } from 'react-router';
import App, { ErrorBoundary } from './App';

// Pages
import HomePage from './presentation/pages/home';
import SearchPage from './presentation/pages/search';
import ProfilePage from './presentation/pages/profile';

/**
 * Application routes configuration
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary error={null} />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'profile/:id',
        element: <ProfilePage />,
      },
    ],
  },
]);