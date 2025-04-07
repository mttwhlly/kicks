import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import type { LocationData } from '~/types/map';
import type { FilterCriteria } from '~/types/filter';

// Types for organization context
interface OrganizationContextState {
  // Organization data
  organizationName: string;
  providerCount: number;
  locationCount: number;
  locationData: LocationData[];
  
  // Filtered data state
  filterCriteria: FilterCriteria | undefined;
  filteredData: LocationData[];
  
  // Selected location state
  selectedLocationId: string | null;
  selectedPracticeLocationId: string | null;
  selectedLocationIndex: number;
  
  // Actions
  setFilterCriteria: (criteria: FilterCriteria | undefined) => void;
  setSelectedLocation: (id: string | null, practiceLocationId: string | null, index: number) => void;
}

// Create context with default value
const OrganizationContext = createContext<OrganizationContextState | undefined>(undefined);

// Props for provider
interface OrganizationProviderProps {
  children: React.ReactNode;
  organizationData: {
    participatingOrganizationName: string;
    totalProviderCount: number;
    totalLocationCount: number;
    participatingOrganizationDetails: LocationData[];
  };
}

// Provider component
export const OrganizationProvider: React.FC<OrganizationProviderProps> = ({ 
  children, 
  organizationData 
}) => {
  // Extract data from props
  const { 
    participatingOrganizationName: organizationName, 
    totalProviderCount: providerCount, 
    totalLocationCount: locationCount,
    participatingOrganizationDetails: locationData 
  } = organizationData;

  // State for filter criteria
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria | undefined>(undefined);
  
  // State for selected location
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [selectedPracticeLocationId, setSelectedPracticeLocationId] = useState<string | null>(null);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState<number>(0);
  
  // Compute filtered data based on criteria
  const filteredData = useMemo(() => {
    if (!filterCriteria || !locationData || locationData.length === 0) {
      return locationData || [];
    }

    return locationData.filter((location) => {
      // Filter by provider name
      if (
        location.fullName && 
        filterCriteria.name && 
        filterCriteria.name.trim() !== '' &&
        !location.fullName.toLowerCase().includes(filterCriteria.name.toLowerCase())
      ) {
        return false;
      }

      // Filter by city
      if (
        location.city && 
        filterCriteria.city && 
        filterCriteria.city.trim() !== '' && 
        !location.city.toLowerCase().includes(filterCriteria.city.toLowerCase())
      ) {
        return false;
      }

      // Filter by state
      if (
        location.state && 
        filterCriteria.state &&
        !location.state.includes(filterCriteria.state)
      ) {
        return false;
      }

      // Filter by accepting new patients
      if (
        location.acceptNewPatients === 100000001 && 
        !filterCriteria.acceptingNewPatients
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
  }, [filterCriteria, locationData]);
  
  // Set selected location with all related values
  const setSelectedLocation = (
    id: string | null, 
    practiceLocationId: string | null, 
    index: number
  ) => {
    setSelectedLocationId(id);
    setSelectedPracticeLocationId(practiceLocationId);
    setSelectedLocationIndex(index);
  };
  
  // Initialize first location as selected if none is selected
  useEffect(() => {
    if (filteredData.length > 0 && selectedLocationId === null) {
      setSelectedLocation(
        filteredData[0].practitionerId, 
        filteredData[0].practiceLocationId, 
        0
      );
    }
  }, [filteredData, selectedLocationId]);
  
  // Context value
  const value: OrganizationContextState = {
    organizationName,
    providerCount,
    locationCount,
    locationData,
    filterCriteria,
    filteredData,
    selectedLocationId,
    selectedPracticeLocationId,
    selectedLocationIndex,
    setFilterCriteria,
    setSelectedLocation
  };
  
  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
};

// Custom hook to use organization context
export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
};