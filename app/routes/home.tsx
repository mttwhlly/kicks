import type { Route } from './+types/home';
import { Button } from '@mui/material';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'React Router Starter' },
    {
      name: 'description',
      content:
        'React + TypeScript + Vite + React Router + React Query + React Hook Form + Material UI Starter + Tailwind CSS',
    },
  ];
}

export default function Home() {
  return (
    <Button variant="contained" className="text-3xl">
      Hello world
    </Button>
  );
}
