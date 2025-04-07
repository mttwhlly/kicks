import React from 'react';
import { Box } from '@mui/material';

export interface SimpleBoxProps {
  title?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'outlined' | 'filled';
}

/**
 * A simple box component for containing content
 */
export default function SimpleBox({ 
  title, 
  children, 
  variant = 'default' 
}: SimpleBoxProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'outlined':
        return 'border border-gray-300 bg-white';
      case 'filled':
        return 'bg-gray-100';
      default:
        return 'bg-white';
    }
  };

  return (
    <Box className={`p-4 rounded-md ${getVariantClasses()}`}>
      {title && <h3 className="text-lg font-medium mb-3">{title}</h3>}
      {children}
    </Box>
  );
}