# Tiny Moves

A minimal template for building a React application using Vite, React Router 7, and TypeScript.

[![Open in CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/mttwhlly/tiny-moves)

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/mttwhlly/tiny-moves)

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

## Deployment

### Docker Deployment

This template includes a `Dockerfile` for containerization.

To build and run using Docker:

```bash
# For npm
docker build -t tiny-moves-app .

# Run the container
docker run -p 3000:3000 tiny-moves-app
```
