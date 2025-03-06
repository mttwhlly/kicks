import React from 'react';
import type { Route } from './+types/home';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { usStates } from '~/constants';

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
      className="mt-8 p-4 flex flex-col gap-4 max-w-3xl mx-auto border border-gray-200 rounded-md"
    >
      <h1 className="text-3xl font-bold">Provider Search</h1>
      <p>
        Search for a US healthcare provider on the{' '}
        <a className="underline" href="https://npiregistry.cms.hhs.gov/">
          NPPES NPI Registry
        </a>
      </p>

      <Box className="flex gap-4">
        <TextField
          id="standard-basic"
          label="First Name"
          variant="standard"
          className="flex-1"
        />
        <TextField
          id="standard-basic"
          label="Last Name"
          required
          variant="standard"
          className="flex-1"
        />
      </Box>
      <Box className="flex gap-4 mb-4">
        <TextField
          id="standard-basic"
          label="City"
          variant="standard"
          className="flex-1"
        />
        <Autocomplete
          disablePortal
          options={usStates}
          className="flex-1"
          renderInput={(params) => (
            <TextField {...params} label="State" variant="standard" />
          )}
        />
      </Box>

      <Button variant="contained">Search</Button>
      <Button variant="outlined">Reset</Button>
    </Box>
  );
}
