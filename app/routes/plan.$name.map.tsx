import {useCallback, useEffect, useState} from 'react';
import { useParams } from 'react-router';
import Filter from '~/components/Filter/Filter'
import type { FilterCriteria } from '~/components/Filter/Filter';
import InteractiveMapWithCards from '~/components/InteractiveMapWithCards/InteractiveMapWithCards'
import { Box } from '@mui/material';
import { FilterSkeleton, InteractiveMapWithCardsSkeleton } from '~/components/Skeletons/Skeletons';

interface LocationData {
  id: number;
  name: string;
  description: string;
  address: string;
  position: [number, number];
  specialty: string;
  locations: string;
  status: string;
}

export default function Map() {

const params = useParams();
const orgId = params.id;
const [filterCriteria, setFilterCriteria] = useState<FilterCriteria | undefined>();
const [isLoading, setIsLoading] = useState(true);
const [locationData, setLocationData] = useState<LocationData[]>([]);

useEffect(() => {
  let isMounted = true;

  setIsLoading(true);

  const mockData: LocationData[] = [
    {
      id: 1,
      name: 'Dr. Alice Auburn', // practitioner but need ID
      description: '', // not a thing
      address: '501 Stanyan St, San Francisco, CA 94117', // location but need ID
      position: [37.7694, -122.4862], // location but need ID
      specialty: 'Orthopedic Surgery', // specialty
      locations: '2', 
      status: 'Active',
    },
    {
      id: 2,
      name: 'Dr. Bob Blue',
      description: '',
      address: '123 Main St, San Francisco, CA 94105',
      position: [37.7749, -122.4194],
      specialty: 'Cardiology',
      locations: '3',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Dr. Carol Crimson',
      description: '',
      address: '456 Elm St, San Francisco, CA 94107',
      position: [37.7849, -122.4094],
      specialty: 'Neurology',
      locations: '1',
      status: 'Inactive',
    },
    {
      id: 4,
      name: 'Dr. David Emerald',
      description: '',
      address: '789 Oak St, San Francisco, CA 94108',
      position: [37.7949, -122.3994],
      specialty: 'Pediatrics',
      locations: '4',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Dr. Eva Emerald',
      description: '',
      address: '321 Maple St, San Francisco, CA 94109',
      position: [37.7649, -122.4094],
      specialty: 'Dermatology',
      locations: '2',
      status: 'Active',
    },
    {
      id: 6,
      name: 'Dr. Frank Fuchsia',
      description: '',
      address: '654 Pine St, San Francisco, CA 94110',
      position: [37.7749, -122.3994],
      specialty: 'Gynecology',
      locations: '3',
      status: 'Inactive',
    },
    {
      id: 7,
      name: 'Dr. Grace Green',
      description: '',
      address: '321 Birch St, San Francisco, CA 94111',
      position: [37.7849, -122.3894],
      specialty: 'Psychiatry',
      locations: '1',
      status: 'Active',
    },
    {
      id: 8,
      name: 'Michael P White NP',
      description: '',
      address: '123 Cool Kid Street, San Francisco, CA 94117',
      position: [37.7694, -122.4862],
      specialty: 'Registered Nurse, Medical-Surgical',
      locations: '5', 
      status: 'Active',
    },
  ];
  if(isMounted) {
    setLocationData(mockData);
    setIsLoading(false);
  }

  return () => {
    isMounted = false;
  }
}, [orgId])

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
