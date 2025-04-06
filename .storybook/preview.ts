import type { Preview } from '@storybook/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { RouterDecorator } from './decorators/RouterDecorator';
import '../src/index.css';

// Create a theme matching our application
const theme = createTheme({
  palette: {
    primary: {
      main: '#0277bd',
    },
    secondary: {
      main: '#7b1fa2',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});

// Wrap stories with providers
const withThemeProvider = (Story, context) => {
  return React.createElement(ThemeProvider, { theme }, [
    React.createElement(CssBaseline, {}),
    React.createElement(Story, context)
  ]);
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
  },
  decorators: [withThemeProvider, RouterDecorator],
};

export default preview;