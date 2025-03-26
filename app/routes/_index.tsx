import { Suspense } from 'react';
import { Box } from '@mui/material';
import Search from '~/components/Search/Search';
import { HomePageSkeleton } from '~/components/Skeletons/Skeletons';

export default function Index() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <Box className="text-center gap-4 mt-[120px] mb-12 flex flex-col">
        <h1 className="text-2xl font-bold">Find any doctors in any network</h1>
        <h2 className="text-md">Nationwide Provider & Insurance Data</h2>
      </Box>
      <Search />
    </Suspense>
  );
}
