import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Filter from './Filter';

// Component metadata and default arguments
const meta = {
  title: 'Components/UI/Filter',
  component: Filter,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Filter component for searching and filtering provider data.',
      },
    },
  },
  args: {
    onFilterChange: action('onFilterChange'),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Filter>;

export default meta;

// Story definitions
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    onFilterChange: action('onFilterChange'),
  },
};

// Empty state
export const EmptyState: Story = {
  args: {
    onFilterChange: action('onFilterChange'),
  },
};

// With filters applied
export const WithFiltersApplied: Story = {
  args: {
    onFilterChange: action('onFilterChange'),
  },
  decorators: [
    (Story) => {
      // This would simulate the component with some filters already applied
      return <Story />;
    },
  ],
};