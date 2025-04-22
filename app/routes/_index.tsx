import { Suspense } from 'react';
import { Box } from '@mui/material';
import ProviderSearchForm from '~/presentation/components/features/Search/ProviderSearchForm';
import { HomePageSkeleton } from '~/presentation/components/ui/Skeletons';
import Content from '~/presentation/components/features/Content/Content';

export default function Index() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <Box className="text-center gap-4 mt-[120px] mb-12 flex flex-col">
        <h1 className="text-2xl font-bold">
          Find any practitioners in any network
        </h1>
        <h2 className="text-md">Nationwide Practitioner & Insurance Data</h2>
      </Box>
      <ProviderSearchForm />
      <Content />
    </Suspense>
  );
}
