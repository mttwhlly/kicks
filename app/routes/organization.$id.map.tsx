import {useCallback, useEffect, useState} from 'react';
import { useOutletContext } from 'react-router';
import Filter from '~/components/Filter/Filter'
import InteractiveMapWithCards from '~/components/Map/InteractiveMapWithCards'
import { Box } from '@mui/material';
import { FilterSkeleton, InteractiveMapWithCardsSkeleton } from '~/components/Skeletons/Skeletons';
import type { FilterCriteria } from '~/types/filter'
import type { LocationData } from '~/types/map';

export default function Map() {

const [filterCriteria, setFilterCriteria] = useState<FilterCriteria | undefined>();
const [isLoading, setIsLoading] = useState(true);
const [locationData, setLocationData] = useState<LocationData[]>([]);

const data: LocationData[] = useOutletContext();

useEffect(() => {
  let isMounted = true;

  setIsLoading(true);

  const testData: LocationData[] = data;

  if(isMounted) {
    setLocationData(testData);
    setIsLoading(false);
  }

  return () => {
    isMounted = false;
  }
}, [])

  const handleFilterChange = useCallback((filters: FilterCriteria) => {
    setFilterCriteria(filters);
  }, []);

    return (
        <Box className="mt-4">
          {isLoading ? (
            <FilterSkeleton />
          ) : (
            <Filter onFilterChange={handleFilterChange} />
          )}
            {isLoading ? (
              <InteractiveMapWithCardsSkeleton />
            ) :
            <InteractiveMapWithCards
                filterCriteria={filterCriteria}
                initialData={locationData}
            />
          }
        </Box>
    )
}
