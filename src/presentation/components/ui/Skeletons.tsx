import { Box, Skeleton, Stack } from '@mui/material';

/**
 * Skeleton for the home page search component
 */
export const SearchSkeleton = () => {
  return (
    <Box className="max-w-6xl mx-auto p-6">
      <Box className="flex flex-col items-center mb-6">
        <Skeleton
          variant="rectangular"
          width="60%"
          height={50}
          className="mb-4 rounded-lg"
        />
        <Skeleton
          variant="rectangular"
          width="80%"
          height={40}
          className="rounded-lg"
        />
      </Box>
      <Box className="flex flex-col md:flex-row gap-4 justify-center">
        <Skeleton
          variant="rectangular"
          width={300}
          height={60}
          className="rounded-lg"
        />
        <Skeleton
          variant="rectangular"
          width={150}
          height={60}
          className="rounded-lg"
        />
      </Box>
    </Box>
  );
};

/**
 * Skeleton for the home page
 */
export const HomePageSkeleton = () => {
  return (
    <Box className="mx-auto">
      <Box className="text-center gap-4 mt-12 mb-8 flex flex-col items-center">
        <Skeleton variant="text" width={300} height={40} />
        <Skeleton variant="text" width={200} height={30} />
      </Box>
      <SearchSkeleton />
    </Box>
  );
};

/**
 * Skeleton for a provider card
 */
export const ProviderCardSkeleton = () => {
  return (
    <div className="p-4 rounded-lg shadow-md bg-white">
      <div className="flex justify-between mb-2">
        <Skeleton variant="text" width={150} height={30} />
        <Skeleton variant="rectangular" width={80} height={24} />
      </div>
      <Skeleton variant="text" width="90%" height={20} />
      <Skeleton variant="text" width="60%" height={20} />
      <Skeleton variant="text" width="40%" height={20} className="mt-2" />
    </div>
  );
};