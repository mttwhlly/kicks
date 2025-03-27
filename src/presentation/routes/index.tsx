// src/presentation/routes/index.tsx
import { createBrowserRouter } from 'react-router';
import AppLayout from '../components/layouts/AppLayout';
import { Dashboard, UserProfile, NotFound } from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/profile', element: <UserProfile /> },
      { path: '*', element: <NotFound /> }
    ]
  }
]);