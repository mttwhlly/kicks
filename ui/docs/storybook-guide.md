# Nova UI Storybook Guide

This guide explains the Storybook setup for Nova UI components following clean architecture principles.

## Overview

Our Storybook implementation:

1. Documents UI components in isolation
2. Provides interactive examples
3. Follows clean architecture patterns
4. Includes a mock service layer for testing

## Getting Started

### Running Storybook

```bash
# Start Storybook development server
npm run storybook

# Check Storybook setup
npm run check-storybook

# Build static Storybook site
npm run build-storybook
```

### Key Files

- `.storybook/main.js`: Main Storybook configuration
- `.storybook/preview.tsx`: Preview configuration and decorators
- `.storybook/mocks.ts`: Mock services for testing
- `app/components/*/*.stories.tsx`: Component stories

## Creating Component Stories

Follow this pattern to create new stories:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import YourComponent from './YourComponent';

const meta = {
  title: 'Category/YourComponent',
  component: YourComponent,
  parameters: {
    docs: {
      description: {
        component: 'Component description',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof YourComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Default props
  },
};
```

## Using Mocks

For components that depend on services:

```tsx
// In your stories
import { mockApiService } from '../../../.storybook/mocks';

export const WithMockedService: Story = {
  decorators: [
    (Story) => (
      <MockServiceContext.Provider value={mockApiService}>
        <Story />
      </MockServiceContext.Provider>
    ),
  ],
};
```

## Clean Architecture in Stories

1. **UI Component**: Focus on props, rendering, and user interaction
2. **Mock Services**: Simulate business logic and API calls
3. **Test Multiple States**: Loading, error, success, empty

```
Component/
├── Component.tsx            # Presentation logic only
├── Component.stories.tsx    # Stories for different states
└── ComponentService.ts      # Business logic
```

## Documentation Patterns

1. **Welcome Page**: Overview of the component library
2. **Architecture**: Explanation of clean architecture
3. **Component Guidelines**: Best practices for components
4. **Component Docs**: Autodocs for each component

## Testing with Storybook

Storybook can be used for:

1. Visual testing of components
2. Interaction testing
3. Accessibility testing
4. Integration with automated testing

## Troubleshooting

If you encounter issues:

1. Check the browser console for errors
2. Run `npm run check-storybook` to verify setup
3. Ensure components follow clean architecture patterns
4. Check for import path issues (use `~` alias for imports)