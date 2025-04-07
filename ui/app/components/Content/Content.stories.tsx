import type { Meta, StoryObj } from '@storybook/react';
import Content from './Content';

// Component metadata
const meta = {
  title: 'Components/Base/Content',
  component: Content,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Basic content container for page layouts.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Content>;

export default meta;

// Story definitions
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: <div>Content goes here</div>,
  },
};

// With header
export const WithHeader: Story = {
  args: {
    children: (
      <>
        <h1>Page Title</h1>
        <p>Content goes here</p>
      </>
    ),
  },
};

// With rich content
export const WithRichContent: Story = {
  args: {
    children: (
      <div>
        <h1>Rich Content Example</h1>
        <p>This is an example of a page with rich content.</p>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </ul>
        <button>Click me</button>
      </div>
    ),
  },
};