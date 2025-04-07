import { useMemo, useState, useCallback } from 'react';
import { defer } from '@react-router/server';
import apiService from './api.service';
import type { LocationData } from '~/types/map';
import type { FilterCriteria } from '~/types/filter';

// Type for organization data
export interface OrganizationData {
  participatingOrganizationId: string;
  participatingOrganizationName: string;
  totalProviderCount: number;
  totalLocationCount: number;
  participatingOrganizationDetails: LocationData[];
}

// Loader function for organization data
export async function loadOrganizationData(organizationId: string) {
  if (!organizationId) {
    throw new Response('Organization ID is required', { status: 400 });
  }
  
  try {
    const data = await apiService.organization.getProvidersAndLocations(organizationId);
    
    if (!data) {
      throw new Response('No data found for this organization', { status: 404 });
    }
    
    return data;
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    
    throw new Response(
      error instanceof Error ? error.message : 'Failed to load organization data',
      { status: 500 }
    );
  }
}

// Deferred loader with progressive enhancement
export function loadOrganizationDataDeferred(organizationId: string) {
  return defer({
    // Basic org info loads immediately
    organizationPromise: loadOrganizationData(organizationId)
  });
}

// Hook for filtering and managing location data
export function useOrganizationLocations(locationData: LocationData[] = []) {
  // State for filter criteria
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria | undefined>(undefined);
  
  // State for selected location
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [selectedPracticeLocationId, setSelectedPracticeLocationId] = useState<string | null>(null);
  
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
  
  // Find the index of the currently selected location
  const selectedLocationIndex = useMemo(() => {
    if (!selectedLocationId || !selectedPracticeLocationId) {
      return filteredData.length > 0 ? 0 : -1;
    }
    
    return filteredData.findIndex(
      location => location.practitionerId === selectedLocationId && 
                location.practiceLocationId === selectedPracticeLocationId
    );
  }, [filteredData, selectedLocationId, selectedPracticeLocationId]);
  
  // Set selected location with both IDs
  const setSelectedLocation = useCallback((
    locationId: string | null, 
    practiceLocationId: string | null
  ) => {
    setSelectedLocationId(locationId);
    setSelectedPracticeLocationId(practiceLocationId);
  }, []);
  
  return {
    // Data
    filteredData,
    locationCount: locationData.length,
    filteredCount: filteredData.length,
    
    // Selection state
    selectedLocationId,
    selectedPracticeLocationId,
    selectedLocationIndex,
    
    // Actions
    setFilterCriteria,
    setSelectedLocation
  };
}