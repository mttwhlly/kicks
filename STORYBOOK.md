# Storybook Guidelines

This project uses Storybook for UI component development and testing. Follow these guidelines when adding new components or stories.

## Getting Started

To run Storybook:

```bash
npm run storybook
```

To build Storybook for deployment:

```bash
npm run build-storybook
```

## Writing Stories

### Story Organization

Stories should be placed alongside the components they document, following this pattern:

```
src/presentation/components/
├── features/
│   └── Feature/
│       ├── Component.tsx
│       └── stories/
│           └── Component.stories.tsx
└── ui/
    ├── Button.tsx
    └── stories/
        └── Button.stories.tsx
```

### Story Structure

Follow this template for your stories:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from '../MyComponent';

const meta = {
  title: 'Category/Subcategory/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Define controls for your component props
  },
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Default props
  },
};

export const Variant: Story = {
  args: {
    // Variant props
  },
};
```

## Testing Components

All components should include tests. You can write tests using the Vitest framework that's integrated with Storybook.

For component tests, create a `.test.tsx` file alongside your component:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    // Add assertions
  });
});
```

To run component tests:

```bash
npm test
```

## UI Component Guidelines

When creating components for the Storybook:

1. **Follow Clean Architecture** - UI components should be in the presentation layer
2. **Make components composable** - Prefer composition over inheritance
3. **Document all props** - Use TypeScript interfaces/types for all props
4. **Support all variations** - Create stories for all component variants
5. **Test interaction states** - Include stories for hover, focus, disabled states
6. **Use theme tokens** - Reference the theme for colors, spacing, etc.
7. **Apply accessibility** - Ensure ARIA attributes and keyboard navigation

## Mock Data

Use mock data from `.storybook/mocks/` for your stories to ensure consistency and realistic examples.

## Working with Storybook Test Addon

The project includes the experimental Storybook Test addon for component testing:

```typescript
// In your story file
export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Your test steps
  }
};
```

This enables you to test components directly within Storybook.