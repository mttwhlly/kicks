import type { Meta, StoryObj } from '@storybook/react';
import SimpleBox from './SimpleBox';

// Component metadata
const meta = {
  title: 'Components/Base/SimpleBox',
  component: SimpleBox,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A simple box component for containing content with different variants.',
      },
    },
  },
  // Define argTypes to control the available props in Storybook UI
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled'],
      description: 'The visual style variant of the box',
    },
    title: {
      control: 'text',
      description: 'Optional title to display at the top of the box',
    },
    children: {
      control: 'text',
      description: 'Content to display within the box',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SimpleBox>;

export default meta;

type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    title: 'Default Box',
    children: <p>This is a default box with some content.</p>,
  },
};

// Outlined variant
export const Outlined: Story = {
  args: {
    title: 'Outlined Box',
    variant: 'outlined',
    children: <p>This box has an outline border.</p>,
  },
};

// Filled variant
export const Filled: Story = {
  args: {
    title: 'Filled Box',
    variant: 'filled',
    children: <p>This box has a filled background.</p>,
  },
};

// No title
export const NoTitle: Story = {
  args: {
    children: <p>This box has no title, just content.</p>,
  },
};

// With complex content
export const WithComplexContent: Story = {
  args: {
    title: 'Complex Content',
    variant: 'outlined',
    children: (
      <div>
        <p className="mb-2">This box contains more complex content:</p>
        <ul className="list-disc pl-5 mb-4">
          <li>List item one</li>
          <li>List item two</li>
          <li>List item three</li>
        </ul>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Click me</button>
      </div>
    ),
  },
};