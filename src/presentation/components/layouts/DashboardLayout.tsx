// src/presentation/components/layouts/DashboardLayout.tsx
import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Box className="flex h-screen bg-gray-50">
      <Sidebar />
      <Box className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <Box className="flex-1 overflow-auto">
          {children}
        </Box>
      </Box>
    </Box>
  );
};