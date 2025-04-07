# Nova Frontend Architecture

This document outlines the clean architecture principles and React Router v7 patterns implemented in the Nova frontend application.

## Clean Architecture Principles

The frontend has been restructured to follow clean architecture principles:

### 1. Service Layer

We've introduced a dedicated service layer to handle all API interactions and data transformation logic:

- `api.service.ts` - Centralized API interaction with error handling
- `organization.service.ts` - Organization-specific data management
- `SearchService.ts` - Search functionality and state management

### 2. Separation of Concerns

Components are now focused on UI rendering and delegating to services for business logic:

- **UI Components**: Handle rendering and user interaction
- **Services**: Handle data fetching, transformation, and business logic
- **Context Providers**: Manage shared state across components

### 3. Domain-Driven Structure

The application is structured around domain concepts rather than technical concerns:

- `/services` - Core business logic and API interactions
- `/context` - Shared state management
- `/components` - Reusable UI components
- `/routes` - Route-specific components and logic

### 4. Data Flow

The application follows a unidirectional data flow pattern:

1. User interaction triggers events
2. Services handle business logic and API calls
3. State is updated in services or context
4. UI re-renders based on updated state

## React Router v7 Improvements

We've enhanced the routing implementation to leverage React Router v7 features:

### 1. Typed Route Definitions

Routes are now explicitly defined with TypeScript types for better static analysis.

### 2. Loader Pattern

Route data loading has been improved with the loader pattern:

- Co-located loaders in separate files (e.g., `organization.$id.loader.ts`)
- Deferred data loading for progressive enhancement
- Route-specific error boundaries

### 3. Error Handling

Each route has dedicated error handling:

- Route-specific error boundaries
- Status-based error responses
- Consistent error UI patterns

### 4. Navigation Patterns

Navigation has been standardized:

- Using `useNavigate` hook instead of direct window.location changes
- Improved type safety for route parameters
- Consistent URL patterns across the application

## Best Practices

### Implementing New Features

1. Define domain models and interfaces
2. Implement service layer functionality
3. Create or update context providers if needed
4. Build UI components focused on rendering
5. Connect components to services via hooks

### Data Fetching Pattern

For route-specific data:

```tsx
// Route loader
export async function loader({ params }) {
  return defer({
    data: loadData(params.id)
  });
}

// Component
function RouteComponent() {
  const { data } = useLoaderData();
  return <Await resolve={data}>
    {(resolvedData) => <YourComponent data={resolvedData} />}
  </Await>;
}
```

For component-specific data:

```tsx
function YourComponent() {
  const { data } = useQuery(['queryKey'], () => service.fetchData());
  return <div>{data}</div>;
}
```

### State Management

- Use context for global or shared state
- Use hooks for component-specific state
- Use services for business logic and data transformation

## Future Improvements

- Add unit and integration tests
- Implement code splitting for route-based bundles
- Consider adding state management solutions for complex state
- Enhance error tracking and monitoring