import type { Meta, StoryObj } from '@storybook/react';
import Footer from './Footer';

// Component metadata and default arguments
const meta = {
  title: 'Components/Base/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Footer component that appears at the bottom of all pages in the application.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;

// Story definitions
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {};