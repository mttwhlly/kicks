import { Suspense } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router';
import ProviderSearchForm from '~/presentation/components/features/Search/ProviderSearchForm';
import { HomePageSkeleton } from '~/presentation/components/ui/Skeletons';
import Content from '~/presentation/components/features/Content/Content';
import { SearchProvider } from '~/presentation/providers/SearchProvider';
import { ProviderSearchCriteria } from '~/core/repositories/providerRepository';

function HomeContent() {
  const navigate = useNavigate();
  
  const handleSearch = (criteria: ProviderSearchCriteria) => {
    // Build query parameters from search criteria
    const params = new URLSearchParams();
    
    Object.entries(criteria).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(item => params.append(`${key}[]`, item));
        } else {
          params.append(key, value.toString());
        }
      }
    });
    
    // Navigate to search page with query parameters
    navigate(`/search?${params.toString()}`);
  };
  
  return (
    <>
      <Box className="text-center gap-4 mt-[120px] mb-12 flex flex-col">
        <h1 className="text-2xl font-bold">
          Find any practitioners in any network
        </h1>
        <h2 className="text-md">Nationwide Practitioner & Insurance Data</h2>
      </Box>
      <ProviderSearchForm onSearch={handleSearch} />
      <Content />
    </>
  );
}

export default function Index() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <SearchProvider>
        <HomeContent />
      </SearchProvider>
    </Suspense>
  );
}
