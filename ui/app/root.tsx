import { Suspense, useState, useEffect, useRef } from 'react';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation
} from 'react-router';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CssBaseline, LinearProgress } from '@mui/material';
import type { Route } from './+types/root';
import './app.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'CAQH NOVA' },
    {
      name: 'description',
      content:
        'Find practitioners in your network. Verified Practitioner & Facility Data.',
    },
  ];
}

const clientSideEmotionCache = createCache({ key: 'css' });

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className='fixed top-0 left-0 right-0 z-50'>
      <LinearProgress color="inherit" />
    </div>
  )
}

// Create QueryClient outside of component to prevent recreation on every render
const queryClient = new QueryClient();

export function Layout(
  { children }: { children: React.ReactNode },
  emotionCache = clientSideEmotionCache
) {
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(false);
  
  // Simplified isHomePage determination
  useEffect(() => {
    // Simple check based on pathname only
    const path = location.pathname;
    setIsHomePage(path === '/' || path === '' || path === '/index.html');
  }, [location.pathname]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <CssBaseline />
      <body className={`flex flex-col justify-between antialiased ${isHomePage ? 'bg-linear-180 from-neutral-200 to-white border-[68px] border-t-white border-x-white border-b-none border-b-0 min-h-screen h-full' : 'h-screen'}`}>
        <QueryClientProvider client={queryClient}>
          <CacheProvider value={emotionCache}>
            <AppContent>
              {/* Add key prop to force clean remounts during navigation */}
              <Outlet key={location.pathname} />
            </AppContent>
          </CacheProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function AppContent({ children }) {
  return (
    <>
      <Header />
      <main className='mb-auto'>
        {/* Remove the Suspense here to avoid nested Suspense issues */}
        {children}
      </main>
      <Footer />
    </>
  )
}

export function HydrateFallback() {
  return <LoadingOverlay isLoading={true} />;
}

export default function App() {
  const location = useLocation();
  // Add key to force clean remounts
  return <Outlet key={location.pathname} />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}