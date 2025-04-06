import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { LinearProgress } from '@mui/material';
import { Header } from '../features/Header/Header';
import { Footer } from '../features/Footer/Footer';

interface MainLayoutProps {
  isHomePage?: boolean;
}

/**
 * Main layout component that wraps the application
 * Includes header, main content area with Suspense, and footer
 */
export const MainLayout = ({ isHomePage = false }: MainLayoutProps) => {
  return (
    <div className={`flex flex-col min-h-screen ${
      isHomePage ? 'bg-linear-180 from-neutral-200 to-white' : ''
    }`}>
      <Header />
      
      <main className="flex-grow">
        <Suspense fallback={<LinearProgress color="inherit" />}>
          <Outlet />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
};