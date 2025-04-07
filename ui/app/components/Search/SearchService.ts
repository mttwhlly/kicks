import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import apiService from '~/services/api.service';
import { useState, useCallback } from 'react';

// Types for selected items
export interface SelectedName {
  name: string;
  guid: string;
  type: string;
}

export interface SelectedOrg {
  name: string;
  guid: string;
}

export interface SelectedState {
  id: string;
  label: string;
  guid: string;
}

// Hook for search functionality
export function useSearchService() {
  const navigate = useNavigate();
  
  // State for selections and results
  const [selectedName, setSelectedName] = useState<SelectedName | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<SelectedOrg | null>(null);
  const [selectedState, setSelectedState] = useState<SelectedState | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Fetch name/specialty suggestions
  const useNameSuggestions = (inputValue: string) => {
    return useQuery({
      queryKey: ['nameSuggestions', inputValue],
      queryFn: () => apiService.search.getPractitionerOrSpecialty(inputValue),
      enabled: inputValue.length >= 2,
      refetchOnWindowFocus: false,
    });
  };
  
  // Fetch organization suggestions
  const useOrgSuggestions = (inputValue: string) => {
    return useQuery({
      queryKey: ['orgSuggestions', inputValue],
      queryFn: () => apiService.search.getOrganizations(inputValue),
      enabled: inputValue.length >= 2,
      refetchOnWindowFocus: false,
    });
  };
  
  // Fetch states
  const useStates = () => {
    return useQuery({
      queryKey: ['states'],
      queryFn: apiService.search.getStates,
      refetchOnWindowFocus: false,
    });
  };
  
  // Search mutation
  const searchMutation = useMutation({
    mutationFn: async () => {
      // Clear previous results and errors
      setError(null);
      setSearchResults([]);
      
      const requestData: Record<string, string> = {};
      
      // Add practitioner/specialty if available
      if (selectedName?.guid && selectedName.type.toLowerCase() === 'practitioner') {
        requestData.practitionerGuid = selectedName.guid;
      }
      
      if (selectedName?.guid && selectedName.type.toLowerCase() === 'specialty') {
        requestData.specialtyGuid = selectedName.guid;
      }
      
      // Add state if available
      if (selectedState?.guid) {
        requestData.stateGuid = selectedState.guid;
      }
      
      // Only proceed if we have at least one guid to search with
      if (Object.keys(requestData).length === 0) {
        throw new Error('Please provide at least one search parameter');
      }
      
      return apiService.search.searchParticipatingOrganizations(requestData);
    },
    onSuccess: (data) => {
      setSearchResults(data);
      setHasSearched(true);
    },
    onError: (err) => {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      setHasSearched(true);
    },
  });
  
  // Organization data check mutation
  const checkOrgDataMutation = useMutation({
    mutationFn: async (orgId: string) => {
      const dataExists = await apiService.organization.checkDataExists(orgId);
      
      if (!dataExists) {
        throw new Error('No data available for this organization.');
      }
      
      return orgId;
    },
    onSuccess: (orgId) => {
      // Build query parameters
      const queryParams = new URLSearchParams();
      
      if (selectedName?.guid) {
        queryParams.append('name', selectedName.guid);
      }
      
      if (selectedState?.guid) {
        queryParams.append('state', selectedState.guid);
      }
      
      navigateToOrganization(orgId, queryParams);
    },
    onError: (err) => {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      setSearchResults([]);
      setHasSearched(true);
    },
  });
  
  // Reset search state when inputs are cleared
  const resetSearchState = useCallback(() => {
    // Only reset if all selection fields are empty
    if (!selectedName?.guid && !selectedState?.guid && !selectedOrg?.guid) {
      setSearchResults([]);
      setError(null);
      setHasSearched(false);
      // Clear any mutation errors as well
      searchMutation.reset();
      checkOrgDataMutation.reset();
    }
  }, [selectedName, selectedState, selectedOrg]);
  
  // Execute search based on form submission
  const executeSearch = useCallback(() => {
    // Clear previous errors and results
    setError(null);
    searchMutation.reset();
    checkOrgDataMutation.reset();
    setSearchResults([]);
    setHasSearched(true);
    
    // CASE 1: If organization is selected, check data exists before navigating
    if (selectedOrg?.guid) {
      // Check if selected org has data before navigating
      checkOrgDataMutation.mutate(selectedOrg.guid);
      return;
    }
    
    // CASE 2: If customer is not selected, send a POST request
    const requestData: Record<string, string> = {};

    // Add nameGuid if available
    if (selectedName?.guid && selectedName.type.toLowerCase() === 'practitioner') {
      requestData.nameGuid = selectedName.guid;
    }

    if (selectedName?.guid && selectedName.type.toLowerCase() === 'specialty') {
      requestData.specialtyGuid = selectedName.guid;
    }

    // Add stateGuid if available
    if (selectedState?.guid) {
      requestData.stateGuid = selectedState.guid;
    }

    // Only proceed if we have at least one guid to search with
    if (Object.keys(requestData).length === 0) {
      setError(new Error('Please provide at least one search parameter'));
      return;
    }

    // Execute the mutation
    searchMutation.mutate();
  }, [selectedName, selectedOrg, selectedState]);
  
  // Navigate to organization
  const navigateToOrganization = useCallback((orgId: string, queryParams?: URLSearchParams) => {
    const queryString = queryParams?.toString() || '';
    navigate(`/organization/${orgId}/map${queryString ? `?${queryString}` : ''}`);
  }, [navigate]);
  
  return {
    // State
    selectedName,
    selectedOrg,
    selectedState,
    searchResults,
    error,
    hasSearched,
    isLoading: searchMutation.isPending || checkOrgDataMutation.isPending,
    
    // Actions
    setSelectedName,
    setSelectedOrg,
    setSelectedState,
    resetSearchState,
    executeSearch,
    
    // Queries
    useNameSuggestions,
    useOrgSuggestions,
    useStates
  };
}