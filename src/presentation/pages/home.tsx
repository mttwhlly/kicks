import { Suspense } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { ProviderSearchForm } from '../components/features/Search/ProviderSearchForm';
import { HomePageSkeleton } from '../components/ui/Skeletons';
import { ProviderSearchCriteria } from '../../core/repositories/providerRepository';

/**
 * Home page component
 */
export default function HomePage() {
  const navigate = useNavigate();

  const handleSearch = (criteria: ProviderSearchCriteria) => {
    // Convert search criteria to URL parameters
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
    
    // Navigate to search results page with query parameters
    navigate(`/search?${params.toString()}`);
  };

  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <Box className="text-center gap-6 mt-[120px] mb-12 flex flex-col items-center">
        <Typography variant="h3" component="h1" className="font-bold">
          Find Healthcare Providers
        </Typography>
        <Typography variant="h6" component="p" className="max-w-2xl">
          Search for verified providers by specialty, location, and more
        </Typography>
        
        <Box className="w-full max-w-4xl mt-8">
          <ProviderSearchForm onSearch={handleSearch} />
        </Box>
      </Box>
    </Suspense>
  );
}