# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- Build: `npm run build`
- Dev server: `npm run dev`
- Serve built app: `npm run serve`
- Storybook: `npm run storybook`
- TypeCheck: `npm run typecheck`
- Run tests: `vitest run`
- Run single test: `vitest [test-file-path]`
- Run tests in watch mode: `vitest`

## Code Style Guidelines
- TypeScript with strict mode enabled
- React Router (v7) with file-based routing
- Material UI + Tailwind CSS for styling
- Component organization: PascalCase for components (`Header.tsx`)
- Hooks: camelCase with `use` prefix (`useDebounce.ts`)
- Types: Interface definitions in `/types` directory
- Imports: React first, libraries second, local imports last
- Error handling: Use React error boundaries for component errors
- Use TypeScript interfaces for component props
- Prefer functional components with explicit return types
- Path aliases: Use `~/` for imports from app directory