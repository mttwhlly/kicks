import type { Route } from './+types/home';
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';

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
      <TextField id="standard-basic" label="First Name" variant="standard" />
      <TextField
        id="standard-basic"
        label="Last Name"
        required
        variant="standard"
      />
      <TextField id="standard-basic" label="City" variant="standard" />
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={al}>Alabama</MenuItem>
        <MenuItem value={ak}>Alaska</MenuItem>
        <MenuItem value={ar}>Arizona</MenuItem>
      </Select>
      <Button variant="contained">Search</Button>
    </Box>
  );
}
