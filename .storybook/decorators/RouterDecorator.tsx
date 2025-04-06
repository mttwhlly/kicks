import React from 'react';
import { MemoryRouter } from 'react-router';

/**
 * Router decorator for Storybook stories
 * Wraps stories in a MemoryRouter to support React Router components
 */
export const RouterDecorator = (Story) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);