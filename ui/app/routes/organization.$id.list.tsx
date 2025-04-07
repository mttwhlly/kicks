import { useState, useMemo, useCallback } from 'react';
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
  const [filterCriteria, setFilterCriteria] = useState<
    FilterCriteria | undefined
  >();
  
  // Get data directly from context instead of maintaining duplicate state
  const contextData: LocationData[] = useOutletContext();
  
  // Determine if data is still loading - simplified approach
  const isLoading = !contextData || contextData.length === 0;

  // Filter data based on criteria
  const filteredData = useMemo(() => {
    if (!filterCriteria || !contextData || contextData.length === 0) {
      return contextData || [];
    }
    
    return contextData.filter((location) => {
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

      // Filter by status (active/inactive)
      if (
        !filterCriteria.includeInactive &&
        location.stateCode === 1
      ) {
        return false;
      }

      return true;
    });
  }, [filterCriteria, contextData]);

  // Memoize the filter change handler
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
              Showing {filteredData.length} of {contextData.length} practitioners
            </p>
          </div>

          {/* Virtualized Table Component */}
          <DynamicVirtualizedTable
            height={800}
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
                  <Link to={`/profile/${row.practitionerId}`} className="hover:underline">
                    {value !== null ? value : `${row.firstName} ${row.lastName}`}
                  </Link>
                )
              },
              addressLine1: {
                label: 'Address',
                width: 'auto',
                renderCell: (value, row) => (
                  <>
                    <p>{`${row.addressLine1} ${row.addressLine2 ? row.addressLine2 : ''}`}</p>
                    <p>{`${row.city}, ${row.state} ${formatZip(row.zip)}`}</p>
                  </>
                )
              },
              practiceLocationName: {
                label: 'Location Name'
              },
              officePhoneNumber: {
                label: 'Phone Number',
                renderCell: (value) => (
                  <>{formatPhoneNumber(value)}</>
                ) 
              },
              stateCode: {
                label: 'Status',
                renderCell: (value) => (
                  <>{value === 0 ? 'Active' : 'Inactive'}</>
                )
              }
            }}
          />
        </Box>
      )}
    </Box>
  );
}