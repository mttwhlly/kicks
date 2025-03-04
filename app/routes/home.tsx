import type { Route } from './+types/home';
import { Button } from '@mui/material';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'React Router Starter' },
    {
      name: 'description',
      content:
        'React + TypeScript + React Router + React Query + React Hook Form + Material UI Starter',
    },
  ];
}

export default function Home() {
  return <Button variant="contained">Hello world</Button>;
}
