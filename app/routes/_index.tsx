import { Suspense } from 'react';
import { Box } from '@mui/material';
import { HomePageSkeleton } from '~/components/Skeletons/Skeletons';

export default function Index() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <Box className="text-center gap-4 mt-[120px] mb-12 flex flex-col">
        <h1 className="text-2xl font-bold">Hello World!</h1>
      </Box>
    </Suspense>
  );
}
