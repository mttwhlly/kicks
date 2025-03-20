import { Box, Card, Chip, Skeleton } from '@mui/material';

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
 * Skeleton for the provider profile header
 */
export const ProfileHeaderSkeleton = () => {
  return (
    <Box className="max-w-3xl mx-auto gap-4 mt-12 mb-8 flex flex-col">
      <Skeleton
        variant="rectangular"
        width={120}
        height={40}
        className="rounded-lg"
      />
      <Skeleton variant="text" width="80%" height={50} />
      <Skeleton variant="text" width="40%" height={24} />
      <Skeleton variant="text" width="60%" height={24} />
      <Skeleton variant="text" width="30%" height={24} />
    </Box>
  );
};

/**
 * Skeleton for health plan network section
 */
export const HealthPlanNetworkSkeleton = () => {
  return (
    <Box className="max-w-3xl mx-auto">
      <Skeleton variant="text" width={250} height={32} className="mb-4" />
      <Box className="flex flex-row gap-4 overflow-x-hidden">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width={120}
            height={80}
            className="rounded-lg"
          />
        ))}
      </Box>
    </Box>
  );
};

/**
 * Skeleton for contact information section
 */
export const ContactInfoSkeleton = () => {
  return (
    <Box className="max-w-3xl mx-auto">
      <Skeleton variant="text" width={200} height={32} className="mb-4" />
      <Skeleton variant="text" width="70%" height={24} className="mb-2" />
      <Skeleton variant="text" width="50%" height={24} />
    </Box>
  );
};

/**
 * Skeleton for public notice section
 */
export const PublicNoticeSkeleton = () => {
  return (
    <Box className="max-w-3xl mx-auto">
      <Skeleton variant="text" width={180} height={32} className="mb-4" />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={80}
        className="rounded-lg"
      />
    </Box>
  );
};

/**
 * Skeleton for a location card
 */
export const LocationCardSkeleton = () => {
  return (
    <Card className="p-4 my-2">
      <Skeleton variant="text" width={150} height={28} className="mb-2" />
      <Skeleton variant="text" width="90%" height={24} className="mb-1" />
      <Skeleton variant="text" width="60%" height={24} className="mb-1" />
      <Skeleton variant="text" width="40%" height={24} className="mb-1" />
      <Skeleton variant="text" width="30%" height={24} className="mb-1" />
      <Skeleton variant="text" width="80%" height={24} className="mb-1" />
      <Skeleton variant="text" width="80%" height={24} className="mb-3" />
      <Skeleton
        variant="rectangular"
        width={180}
        height={32}
        className="rounded-full"
      />
    </Card>
  );
};

/**
 * Skeleton for locations section
 */
export const LocationsSkeleton = () => {
  return (
    <Box className="max-w-3xl mx-auto">
      <Skeleton variant="text" width={250} height={32} className="mb-4" />
      <LocationCardSkeleton />
      <LocationCardSkeleton />
    </Box>
  );
};

/**
 * Skeleton for accordion sections
 */
export const AccordionSkeleton = () => {
  return (
    <Box className="max-w-3xl mx-auto">
      <Skeleton
        variant="rectangular"
        width="100%"
        height={56}
        className="mb-3 rounded-lg"
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={56}
        className="mb-3 rounded-lg"
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={56}
        className="mb-3 rounded-lg"
      />
    </Box>
  );
};

/**
 * Skeleton for NPI number card
 */
export const NPICardSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      width="100%"
      height={60}
      className="my-2 rounded-lg"
    />
  );
};

/**
 * Complete skeleton for provider profile page
 */
export const ProfilePageSkeleton = () => {
  return (
    <Box className="max-w-3xl mx-auto gap-6 mt-12 mb-8 flex flex-col">
      <ProfileHeaderSkeleton />
      <HealthPlanNetworkSkeleton />
      <ContactInfoSkeleton />
      <PublicNoticeSkeleton />
      <LocationsSkeleton />
      <AccordionSkeleton />
      <NPICardSkeleton />
    </Box>
  );
};

/**
 * Skeleton component for the Filter UI
 */
export const FilterSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 pt-0 mb-4 sticky top-0 z-[1001] bg-white border border-gray-200 rounded-lg shadow-sm">
      <Box className="flex justify-between items-center mb-2">
        <Skeleton variant="text" width={100} height={30} />
        <Box className="flex justify-end">
          <Skeleton variant="text" width={200} height={40} />
        </Box>
      </Box>
      <Box className="flex gap-2 flex-wrap md:flex-nowrap">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={40}
            className="flex-1 min-w-[200px]"
          />
        ))}
      </Box>
    </div>
  );
};

/**
 * Skeleton component for a provider card
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

/**
 * Skeleton for the card stack in the interactive map component
 */
export const CardStackSkeleton = () => {
  return (
    <div className="w-full md:w-1/3 h-1/2 md:h-full overflow-y-auto p-4 bg-white border border-neutral-200 space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <ProviderCardSkeleton key={i} />
      ))}
    </div>
  );
};

/**
 * Skeleton for the map section
 */
export const MapSkeleton = () => {
  return (
    <div className="w-full md:w-2/3 h-1/2 md:h-full bg-gray-100 flex items-center justify-center">
      <div className="w-full h-full relative">
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ bgcolor: 'rgba(210, 210, 210, 0.6)' }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width={120} height={30} className="mt-2" />
        </div>
      </div>
    </div>
  );
};

/**
 * Complete skeleton for the interactive map with cards component
 */
export const InteractiveMapWithCardsSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto max-h-svh h-[40rem] bg-gray-100">
      <CardStackSkeleton />
      <MapSkeleton />
    </div>
  );
};

/**
 * Skeleton for the virtualized table
 */
export const TableSkeleton = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-4">
      {/* Table header skeleton */}
      <div className="mb-4 flex border-b pb-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex-1 px-3">
            <Skeleton variant="text" width="80%" height={24} />
          </div>
        ))}
      </div>

      {/* Table rows skeleton */}
      {Array.from({ length: 10 }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex py-3 border-b">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex-1 px-3">
              <Skeleton
                variant="text"
                width={`${Math.random() * 40 + 60}%`}
                height={20}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

/**
 * Skeleton for the plan page header
 */
export const PlanHeaderSkeleton = () => {
  return (
    <Box className="flex justify-between max-w-6xl mx-auto p-5">
      <Box>
        <Skeleton variant="text" width={200} height={40} className="mb-2" />
        <Skeleton variant="text" width={150} height={24} />
        <Skeleton variant="text" width={180} height={24} />
      </Box>
      <Box className="h-6">
        <Skeleton variant="rectangular" width={200} height={40} />
      </Box>
    </Box>
  );
};

/**
 * Skeleton for the plan page intro section
 */
export const PlanIntroSkeleton = () => {
  return (
    <Box className="rounded-lg pt-8 max-w-8xl mx-auto">
      <Box className="flex flex-col gap-2 max-w-6xl mx-auto px-8">
        <Skeleton variant="text" width={300} height={36} />
        <Skeleton variant="text" width={400} height={24} />
      </Box>
    </Box>
  );
};

/**
 * Skeleton for the tabs in plan page
 */
export const TabsSkeleton = () => {
  return (
    <Box className="border-b border-gray-200 flex flex-row justify-end">
      <Box>
        <Skeleton variant="rectangular" width={200} height={48} />
      </Box>
    </Box>
  );
};

/**
 * Complete skeleton for the plan page
 */
export const PlanPageSkeleton = () => {
  return (
    <div>
      <PlanHeaderSkeleton />

      <Box className="max-w-6xl mx-auto p-5">
        <PlanIntroSkeleton />
        <Box className="flex justify-end mt-4">
          <Box className="w-full max-w-6xl">
            <TabsSkeleton />
            <Box sx={{ p: 3 }}>
              <FilterSkeleton />
              <InteractiveMapWithCardsSkeleton />
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
