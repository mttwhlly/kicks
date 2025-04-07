# Testing Components with Storybook

This guide explains how to test UI components using Storybook in the Nova application.

## Testing Approaches

Storybook enables several testing approaches:

1. **Visual Testing**: Verify component appearance
2. **Interaction Testing**: Test user interactions
3. **Accessibility Testing**: Check for a11y issues
4. **Unit Testing**: Test component logic

## Visual Testing

Visual testing allows you to verify component appearance:

1. Create stories for different states and variations
2. Verify appearance manually in different browsers
3. Use different viewport sizes to test responsiveness

### Example

```tsx
// Multiple visual states
export const Default: Story = {
  args: { variant: 'default' },
};

export const Error: Story = {
  args: { variant: 'error' },
};

export const Loading: Story = {
  args: { isLoading: true },
};
```

## Interaction Testing

Test user interactions with components:

1. Use the Interactions addon to simulate user behavior
2. Write test scenarios for typical user flows
3. Verify component behavior after interactions

### Example

```tsx
export const WithInteraction: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    
    // Simulate user clicking a button
    await step('Click button', async () => {
      await userEvent.click(canvas.getByRole('button'));
    });
    
    // Verify the result
    await expect(canvas.getByText('Clicked!')).toBeInTheDocument();
  },
};
```

## Accessibility Testing

Use the a11y addon to check for accessibility issues:

1. Each story is automatically checked for a11y issues
2. View violations in the Accessibility tab
3. Fix issues to improve component accessibility

### Best Practices

- Use semantic HTML elements
- Provide proper labels and ARIA attributes
- Ensure sufficient color contrast
- Support keyboard navigation

## Unit Testing

Test component logic with the Test addon:

1. Write unit tests for component logic
2. Run tests alongside stories
3. Use mocks for services and API calls

### Example

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import YourComponent from './YourComponent';

test('component shows correct state after click', async () => {
  render(<YourComponent />);
  await userEvent.click(screen.getByRole('button'));
  expect(screen.getByText('Clicked!')).toBeInTheDocument();
});
```

## Testing with Clean Architecture

Apply clean architecture principles to testing:

1. **Test UI components in isolation**: Mock services and APIs
2. **Test business logic separately**: Unit test service functions
3. **Use composition for complex components**: Test smaller parts first

### Example with Service Mocking

```tsx
import { mockApiService } from '../../.storybook/mocks';

export const WithMockedData: Story = {
  decorators: [
    (Story) => (
      <MockServiceProvider value={mockApiService}>
        <Story />
      </MockServiceProvider>
    ),
  ],
};
```

## Testing Workflow

1. Create stories for all component states
2. Write interaction tests for user flows
3. Check for accessibility issues
4. Run unit tests for business logic
5. Fix issues and verify changes

## Running Tests

```bash
# Start Storybook for manual testing
npm run storybook

# Run automated tests
npm run test-storybook
```

## Documentation-Driven Testing

1. Document expected behavior in stories
2. Use autodocs to generate component API docs
3. Make sure props and behaviors are well-documented
4. Link code examples to test cases