// src/presentation/components/ui/Button.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import { Button, CustomButtonProps } from './Button';

const meta: Meta<CustomButtonProps> = {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger']
    }
  }
};

export default meta;
type Story = StoryObj<CustomButtonProps>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
};