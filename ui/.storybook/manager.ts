// .storybook/manager.ts
import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

// Configure Storybook's manager UI
addons.setConfig({
  theme: {
    ...themes.light,
    // Base properties
    base: 'light',
    // Brand information
    brandTitle: 'Nova UI Component Library',
    // brandUrl: '',
    
    // UI colors
    colorPrimary: '#1EA7FD',
    colorSecondary: '#FF4785',
    
    // UI colors
    appBg: '#F6F9FC',
    appContentBg: '#FFFFFF',
    appBorderColor: 'rgba(0,0,0,.1)',
    appBorderRadius: 4,
    
    // Text colors
    textColor: '#333333',
    textInverseColor: '#FFFFFF',
    
    // Form colors
    inputBg: '#FFFFFF',
    inputBorder: 'rgba(0,0,0,.1)',
    inputTextColor: '#333333',
    inputBorderRadius: 4,
    
    // Other
    barTextColor: '#999999',
    barSelectedColor: '#1EA7FD',
    barBg: '#FFFFFF',
    
    // Buttons
    buttonBg: '#FFFFFF',
    buttonBorder: 'rgba(0,0,0,.1)',
    booleanBg: '#FFFFFF',
    booleanSelectedBg: '#1EA7FD',
  },
});