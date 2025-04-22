import { Suspense } from 'react';
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
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../src/presentation/themes/theme';
import { MainLayout } from '../src/presentation/components/layouts/MainLayout';
import '../src/index.css';

export function meta() {
  return [
    { title: 'Provider Directory' },
    {
      name: 'description',
      content:
        'Find healthcare providers in your network. Verified practitioner & facility data.',
    },
  ];
}

const clientSideEmotionCache = createCache({ key: 'css' });

export const links = () => [
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

const LoadingOverlay = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;

  return (
    <div className='fixed top-0 left-0 right-0 z-50'>
      <LinearProgress color="inherit" />
    </div>
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={`antialiased ${isHomePage ? 'bg-linear-180 from-neutral-200 to-white' : ''}`}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CacheProvider value={clientSideEmotionCache}>
              <CssBaseline />
              <MainLayout isHomePage={isHomePage} />
            </CacheProvider>
            {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
          </ThemeProvider>
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return <LoadingOverlay isLoading={true} />;
}

export default function Root() {
  return (
    <Suspense fallback={<LoadingOverlay isLoading={true} />}>
      <Outlet />
    </Suspense>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
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