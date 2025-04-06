# Clean Architecture for React Router 7 Project

This document outlines the clean architecture approach for this React Router 7 project.

## Architecture Overview

```
/src
├── core/                     # Business logic & domain models
│   ├── domain/               # Domain entities & business rules
│   ├── usecases/             # Application use cases & business logic
│   └── repositories/         # Repository interfaces
│
├── infrastructure/           # Implementation of repositories & services
│   ├── api/                  # API clients & implementation
│   ├── repositories/         # Data storage implementations
│   └── services/             # External service integrations
│
├── presentation/             # UI components & state management
│   ├── components/           # Reusable UI components
│   │   ├── ui/               # Base UI elements
│   │   ├── layouts/          # Layout components
│   │   └── features/         # Feature-specific components
│   ├── hooks/                # Custom React hooks
│   ├── pages/                # Page components (routes)
│   └── providers/            # Context providers
│
└── common/                   # Shared utilities & constants
    ├── constants/            # Application constants
    ├── types/                # TypeScript types & interfaces
    └── utils/                # Utility functions
```

## Principles

1. **Dependency Rule**: Inner layers should not depend on outer layers. Dependencies point inward.
2. **Separation of Concerns**: Each layer has a specific responsibility.
3. **Testability**: Each layer can be tested in isolation.
4. **Independence from Frameworks**: Core business logic is independent of UI or data frameworks.

## Layer Responsibilities

### Core Layer
- Contains business logic, domain entities, and use cases
- Independent of frameworks and libraries
- Defines interfaces for data access (repositories)

### Infrastructure Layer
- Implements data access interfaces defined in the core layer
- Handles external communication (API, local storage, etc.)
- Contains third-party service integrations

### Presentation Layer
- Contains all UI components and React-specific code
- Manages UI state and user interactions
- Organized by feature or page

### Common Layer
- Contains shared utilities, constants, and types
- Used by all other layers

## Data Flow

1. User interacts with the UI (Presentation Layer)
2. Presentation layer calls Use Cases (Core Layer)
3. Use Cases implement business logic using Domain entities
4. Use Cases call Repository interfaces (Core Layer)
5. Repository implementations (Infrastructure Layer) handle data access
6. Data flows back through the layers in reverse order

By following this architecture, we maintain separation of concerns while ensuring scalability and maintainability.