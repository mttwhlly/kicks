# Storybook for Nova UI

This document describes how to use Storybook to build, test, and document UI components in the Nova application.

## Getting Started

To run Storybook:

```bash
npm run storybook
```

This will start the Storybook server at http://localhost:6006.

## Building Components with Storybook

### 1. Create Your Component

Create your component following the clean architecture principles:

- UI components should focus on presentation and user interaction
- Business logic should be in separate service files
- Data fetching should use the api.service.ts

### 2. Create a Story

Create a story file in the same directory as your component:

```tsx
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import ComponentName from './ComponentName';

const meta = {
  title: 'Category/ComponentName',
  component: ComponentName,
  parameters: {
    docs: {
      description: {
        component: 'Description of the component',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ComponentName>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Default props
  },
};
```

### 3. Mocking Services

For components that depend on services, use the mock services provided in `.storybook/mocks.ts`:

```tsx
// ComponentWithService.stories.tsx
import { mockApiService } from '../../.storybook/mocks';

export const WithMockedData: Story = {
  decorators: [
    (Story) => {
      // Mock the service or context
      return (
        <MockServiceProvider service={mockApiService}>
          <Story />
        </MockServiceProvider>
      );
    },
  ],
};
```

## Storybook Best Practices

### Component Documentation

1. **Use autodocs**: Add `tags: ['autodocs']` to your stories to generate documentation
2. **Add descriptions**: Include component and story descriptions
3. **Document props**: Use proper TypeScript types for components to document props

### Testing with Storybook

1. **Create stories for all states**: Including loading, empty, error, and success states
2. **Use interactions**: Test user interactions like clicks, form inputs, etc.
3. **Test edge cases**: Create stories for boundary conditions

### Component Composition

1. **Start with atoms**: Build and test small components first
2. **Compose larger components**: Use smaller components to build more complex ones
3. **Use decorators**: For providing context, theme, or state management

## Folder Structure

```
app/
  components/
    ComponentName/
      ComponentName.tsx
      ComponentName.stories.tsx
      index.ts
.storybook/
  main.ts
  preview.tsx
  mocks.ts
```

## Integration with Clean Architecture

Storybook is set up to work seamlessly with our clean architecture approach:

1. **UI Components**: Develop and test in isolation
2. **Services**: Mocked for predictable behavior
3. **Context Providers**: Available in stories through decorators
4. **TypeScript**: Used for type safety and documentation

## Advanced Features

### Visual Testing

- Compare visual changes with git history
- Ensure consistent styling across components

### Accessibility Testing

- Use the a11y addon to check for accessibility issues
- Test with keyboard navigation and screen readers

### Responsive Design

- Use the viewport addon to test responsive behavior
- Create stories for different screen sizes