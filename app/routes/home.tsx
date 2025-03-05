import type { Route } from './+types/home';
import { Box, Button, TextField } from '@mui/material';

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
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className="p-4 flex flex-col gap-4 max-w-3xl mx-auto"
    >
      <TextField id="standard-basic" label="First Name" variant="standard" />
      <TextField
        id="standard-basic"
        label="Last Name"
        required
        variant="standard"
      />

      <TextField id="standard-basic" label="City" variant="standard" />
      <TextField id="standard-basic" label="State" variant="standard" />
      <Button variant="contained">Search</Button>
    </Box>
  );
}
