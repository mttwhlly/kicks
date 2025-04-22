import { useState, useEffect, Suspense } from 'react';
import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import { useSearchParams } from 'react-router';
import { ProviderCard } from '../components/features/Provider/ProviderCard';
import ProviderSearchForm from '../components/features/Search/ProviderSearchForm';
import { SearchSkeleton } from '../components/ui/Skeletons';
import { ProviderSearchCriteria } from '../../core/repositories/providerRepository';
import { useProviderSearch } from '../hooks/useProviders';
import { SearchProvider, useSearchContext } from '../providers/SearchProvider';

// Wrapper component that provides search context
function SearchPageContent() {
  const { searchProvidersUseCase } = useSearchContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [criteria, setCriteria] = useState<ProviderSearchCriteria>({});

  // Extract search criteria from URL parameters
  useEffect(() => {
    const extractedCriteria: ProviderSearchCriteria = {};

    for (const [key, value] of searchParams.entries()) {
      if (key.endsWith('[]')) {
        const arrayKey = key.slice(0, -2) as keyof ProviderSearchCriteria;
        if (!extractedCriteria[arrayKey]) {
          extractedCriteria[arrayKey] = [];
        }
        (extractedCriteria[arrayKey] as string[]).push(value);
      } else {
        const typedKey = key as keyof ProviderSearchCriteria;
        if (value === 'true') {
          extractedCriteria[typedKey] = true;
        } else if (value === 'false') {
          extractedCriteria[typedKey] = false;
        } else {
          extractedCriteria[typedKey] = value;
        }
      }
    }

    setCriteria(extractedCriteria);
  }, [searchParams]);

  // Search for providers based on criteria
  const {
    data: providers,
    isLoading,
    error,
  } = useProviderSearch(searchProvidersUseCase, criteria);

  const handleSearch = (newCriteria: ProviderSearchCriteria) => {
    // Update URL parameters
    const params = new URLSearchParams();

    Object.entries(newCriteria).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach((item) => params.append(`${key}[]`, item));
        } else {
          params.append(key, value.toString());
        }
      }
    });

    setSearchParams(params);
  };

  return (
    <Suspense fallback={<SearchSkeleton />}>
      <Box className="max-w-6xl mx-auto p-4">
        <Typography variant="h4" component="h1" className="my-6">
          Search Results
        </Typography>

        <Box className="mb-6">
          <ProviderSearchForm onSearch={handleSearch} isLoading={isLoading} />
        </Box>

        {isLoading ? (
          <Box className="flex justify-center my-12">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box className="text-center my-12">
            <Typography color="error">
              Failed to load providers. Please try again.
            </Typography>
          </Box>
        ) : providers?.length === 0 ? (
          <Box className="text-center my-12">
            <Typography>
              No providers found. Try adjusting your search criteria.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {providers?.map((provider) => (
              <Grid item xs={12} md={6} lg={4} key={provider.id}>
                <ProviderCard provider={provider} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Suspense>
  );
}

/**
 * Search results page component
 */
export default function SearchPage() {
  return (
    <SearchProvider>
      <SearchPageContent />
    </SearchProvider>
  );
}
