import type { Meta, StoryObj } from '@storybook/react';
import { ProviderSearchForm } from '../ProviderSearchForm';
import { action } from '@storybook/addon-actions';

const meta = {
  title: 'Features/Search/ProviderSearchForm',
  component: ProviderSearchForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Whether the form is in loading state',
    },
    onSearch: { action: 'search submitted' },
  },
} satisfies Meta<typeof ProviderSearchForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLoading: false,
    onSearch: action('search submitted'),
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    onSearch: action('search submitted'),
  },
};