# Kicks 👟

A scalable React application starter with React Router 7 using Clean Architecture principles.

[![Open in CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/mttwhlly/kicks)

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/mttwhlly/kicks)

## Features

- [React 19](https://reactjs.org/) for building user interfaces
- [Vite](https://vite.dev/) for fast development and builds
- [React Router 7](https://reactrouter.com/) for routing
- [TypeScript](https://www.typescriptlang.org/) for type safety
- [Material UI](https://mui.com) for UI components
- [Tanstack Query](https://tanstack.com/query/latest) for data fetching and state management
- [Tanstack Form](https://tanstack.com/form/latest) for form handling
- [Eslint](https://eslint.org/) and [Prettier](https://prettier.io/) for code quality and formatting
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Storybook](https://storybook.js.org/) for UI component development
- Clean Architecture for a scalable, maintainable codebase

## Clean Architecture

This project follows Clean Architecture principles to ensure separation of concerns, testability, and maintainability. The codebase is organized into the following layers:

### Core Layer
- Contains business logic and domain models
- Independent of frameworks and libraries
- Located in `src/core/`

### Infrastructure Layer
- Implements data access and external services
- Depends on the core layer but not on the presentation layer
- Located in `src/infrastructure/`

### Presentation Layer
- Contains all UI components and React-specific code
- Depends on the core layer but not directly on the infrastructure layer
- Located in `src/presentation/`

### Common Layer
- Contains shared utilities, constants, and types
- Used by all other layers
- Located in `src/common/`

## Getting Started

### Installation

Install the dependencies:

```bash
npm i
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Running for Production

Run a production build:

```bash
npm run serve
```

## Storybook

Start the Storybook development server:

```bash
npm run storybook
```

Build Storybook:

```bash
npm run build-storybook
```

## Deployment

### Docker Deployment

This template includes a `Dockerfile` for containerization.

To build and run using Docker:

```bash
# Build the Docker image
docker build -t kicks-app .

# Run the container
docker run -p 3000:3000 kicks-app
```

## Project Structure

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

For more details on the architecture, see [ARCHITECTURE.md](./ARCHITECTURE.md).