import { Suspense } from 'react';
import { Box } from '@mui/material';
import Search from '~/components/Search/Search';

export default function Index() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Box className="text-center gap-4 mt-12 mb-8 flex flex-col">
        <h1 className="text-2xl font-bold">Find providers in your network</h1>
        <h2 className="text-md">Verified Provider & Facility Data</h2>
      </Box>
      <Search />
    </Suspense>
  );
}
