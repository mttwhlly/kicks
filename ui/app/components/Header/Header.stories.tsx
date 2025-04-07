import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

// Component metadata and default arguments
const meta = {
  title: 'Components/Base/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Main header component with CAQH NOVA branding that appears at the top of all pages.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;

// Story definitions
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {};