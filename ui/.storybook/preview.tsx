import React from 'react';
import { Preview } from '@storybook/react';
import { MemoryRouter } from 'react-router';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mockApiService } from './mocks';
import '../app/app.css';

// Create a client-side Emotion cache
const clientSideEmotionCache = createCache({ key: 'css' });

// Create a theme for Material UI
const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

// Create a QueryClient for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity, // For Storybook, we want to avoid unnecessary refetches
      cacheTime: Infinity,
    },
  },
});

// Create a mock context for services
const ServiceContext = React.createContext(mockApiService);

// Wrap each story with the necessary providers
const withProviders = (Story, context) => {
  // Use layout based on the story's parameters
  const layout = context.parameters.layout || 'padded';
  
  return (
    <MemoryRouter initialEntries={['/']}>
      <QueryClientProvider client={queryClient}>
        <ServiceContext.Provider value={mockApiService}>
          <CacheProvider value={clientSideEmotionCache}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <div className={`storybook-wrapper layout-${layout}`}>
                <Story />
              </div>
            </ThemeProvider>
          </CacheProvider>
        </ServiceContext.Provider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'padded',
    docs: {
      toc: true,
      source: {
        state: 'open',
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'gray', value: '#F5F5F5' },
        { name: 'dark', value: '#333333' },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1280px',
            height: '800px',
          },
        },
      },
    },
  },
  decorators: [withProviders],
};

export default preview;