import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router';
import { Box } from '@mui/material';
import Filter from '~/components/Filter/Filter';
import DynamicVirtualizedTable from '~/components/DynamicVirtualizedTable/DynamicVirtualizedTable';
import type { FilterCriteria } from '~/components/Filter/Filter';
import {
  FilterSkeleton,
  TableSkeleton,
} from '~/components/Skeletons/Skeletons';

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

export default function PlanList() {
  const params = useParams();
  const planId = params.id;
  const [filterCriteria, setFilterCriteria] = useState<
    FilterCriteria | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);
  const [locationData, setLocationData] = useState<LocationData[]>([]);

  // Fetch provider data based on plan ID
  useEffect(() => {
    let isMounted = true;
    // Simulating an API call to fetch providers for the specific plan
    // In a real app, you would make an actual API request here
    setIsLoading(true);

    // Sample data - in a real app this would come from an API
    const mockData: LocationData[] = [
      {
        id: 1,
        name: 'Dr. Alice Auburn',
        description: '',
        address: '501 Stanyan St, San Francisco, CA 94117',
        position: [37.7694, -122.4862],
        specialty: 'Orthopedic Surgery',
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
    ];

    // Simulated API fetch with setTimeout
    const timer = setTimeout(() => {
      if (isMounted) {
        setLocationData(mockData);
        setIsLoading(false);
      }
    }, 1500); // Simulate network delay

    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [planId]);

  // Apply filters to the data
  const filteredData = useMemo(() => {
    if (!filterCriteria) return locationData;

    return locationData.filter((location) => {
      // Filter by provider name
      if (
        filterCriteria.name &&
        filterCriteria.name.trim() !== '' &&
        !location.name.toLowerCase().includes(filterCriteria.name.toLowerCase())
      ) {
        return false;
      }

      // Filter by city
      if (
        filterCriteria.city &&
        filterCriteria.city.trim() !== '' &&
        !location.address
          .toLowerCase()
          .includes(filterCriteria.city.toLowerCase())
      ) {
        return false;
      }

      // Filter by state
      if (
        filterCriteria.state &&
        filterCriteria.state.trim() !== '' &&
        !location.address.includes(filterCriteria.state)
      ) {
        return false;
      }

      // Filter by specialty
      if (
        filterCriteria.specialty &&
        filterCriteria.specialty.trim() !== '' &&
        location.specialty.toLowerCase() !==
          filterCriteria.specialty.toLowerCase()
      ) {
        return false;
      }

      // Filter by status (active/inactive)
      if (
        !filterCriteria.includeInactive &&
        location.status.toLowerCase() === 'inactive'
      ) {
        return false;
      }

      return true;
    });
  }, [filterCriteria, locationData]);

  // Memoize the filter change handler to prevent recreating it on every render
  const handleFilterChange = useCallback((filters: FilterCriteria) => {
    setFilterCriteria(filters);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* Filter Component - Show skeleton while loading */}
      {isLoading ? (
        <FilterSkeleton />
      ) : (
        <Filter onFilterChange={handleFilterChange} />
      )}

      {/* Table Component - Show skeleton while loading */}
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <Box className="mt-4">
          {/* Display result count */}
          <div className="mb-4">
            <p className="font-medium text-gray-700">
              Showing {filteredData.length} of {locationData.length} providers
            </p>
          </div>

          {/* Virtualized Table Component */}
          <DynamicVirtualizedTable
            data={filteredData}
            excludeKeys={['id', 'description', 'position']}
          />
        </Box>
      )}
    </Box>
  );
}
