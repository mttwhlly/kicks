import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useOutletContext, useParams } from 'react-router';
import { Box } from '@mui/material';
import Filter from '~/components/Filter/Filter';
import DynamicVirtualizedTable from '~/components/Table/DynamicVirtualizedTable';
import { FilterSkeleton, TableSkeleton } from '~/components/Skeletons/Skeletons';
import { formatPhoneNumber, formatZip } from '~/utils/formatters'
import type { FilterCriteria } from '~/types/filter'
import type { LocationData } from '~/types/map';

export default function List() {
  const params = useParams();
  const planId = params.id;
  const [filterCriteria, setFilterCriteria] = useState<
    FilterCriteria | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);
  const [locationData, setLocationData] = useState<LocationData[]>([]);

const data: LocationData[] = useOutletContext();

  // Fetch provider data based on plan ID
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    const testData: LocationData[] = data;
    // Simulated API fetch with setTimeout
    const timer = setTimeout(() => {
      if (isMounted) {
        setLocationData(testData);
        setIsLoading(false);
      }
    }, 0); // Simulate network delay if you want to

    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [planId]);

  // Filter data based on criteria
  const filteredData = useMemo(() => {
    if (!filterCriteria || !locationData || locationData.length === 0) {
      return locationData || [];
    }
    
    return locationData.filter((location) => {
      // Filter by provider name
      if (
        location.fullName && filterCriteria.name && filterCriteria.name.trim() !== '' &&
        !location.fullName.toLowerCase().includes(filterCriteria.name.toLowerCase())
      ) {
        return false;
      }
      
      // Filter by city
      if (
        location.city && filterCriteria.city && filterCriteria.city.trim() !== '' && 
        !location.city
        .toLowerCase()
        .includes(filterCriteria.city.toLowerCase())
      ) {
        return false;
      }
      
      // Filter by state
      if (
        location.state && filterCriteria.state &&
        !location.state.includes(filterCriteria.state)
      ) {
        return false;
      }
      
      // Filter by accepting new patients
      if (
        location.acceptNewPatients === 100000001 && !filterCriteria.acceptingNewPatients
      ) {
        return false;
      }
      
      // TODO: pull in specialties & status

      // Filter by specialty
      // if (
      //   filterCriteria.specialty &&
      //   location.specialty.toLowerCase() !==
      //     filterCriteria.specialty.toLowerCase()
      // ) {
      //   return false;
      // }

      // Filter by status (active/inactive)
      // if (
      //   !filterCriteria.includeInactive &&
      //   location.status.toLowerCase() === 'inactive'
      // ) {
      //   return false;
      // }

      return true;
    });
  }, [filterCriteria, locationData]);

  // Memoize the filter change handler to prevent recreating it on every render
  const handleFilterChange = useCallback((filters: FilterCriteria) => {
    setFilterCriteria(filters);
  }, []);

  return (
    <Box className="mt-4">
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
              Showing {filteredData.length} of {locationData.length} practitioners
            </p>
          </div>

          {/* Virtualized Table Component */}
          <DynamicVirtualizedTable
            data={filteredData}
            excludeKeys={[
            "acceptNewPatients",
            "addressLine2",
            "city",
            "state",
            "zip",
            "firstName",
            "lastName",
            "latitude",
            "locationCount",
            "longitude",
            "officeFaxNumber",
            "officePhoneExtension",
            "officeType",
            "participatingOrganizationId",
            "practiceLocationId",
            "practitionerId",
            "providerCount",
            "providerTypeId",
            "providerType",
            "providerTypeIdName",
            "rosterId"]}
            
            columnOrder={['fullName', 'practiceLocationName', 'addressLine1', 'officePhoneNumber']}
            columnConfig={{
              fullName: {
     
                label: 'Practitioner Name',
                renderCell: (value, row) => (
                  <Link to={`/profile/${row.practitionerId}`} className="hover:underline" viewTransition>{value}</Link>
                )
              },
              addressLine1: {
       
                label: 'Address',
                width: 'auto',
                renderCell: (value, row) => (
                  <div><p>{`${row.addressLine1} ${row.addressLine2 ? row.addressLine2 : ''}`}</p><p>{`${row.city}, ${row.state} ${formatZip(row.zip)}`}</p>
                  </div>
                )
              },
              // acceptNewPatients: {
              //   label: 'Accepting New Patients',
              //   renderCell: (value) => (
              //     <div>{value === 100000001 ? 'Yes' : 'No'}</div>
              //   ) 
              // },
              practiceLocationName: {
         
                label: 'Location Name'
              },
              officePhoneNumber: {
        
                label: 'Phone Number',
                renderCell: (value) => (
                  <div>{formatPhoneNumber(value)}</div>
                ) 
              }
            }}
          />
        </Box>
      )}
    </Box>
  );
}