import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import apiService from '~/services/api.service';

// Types for the context state
interface SearchContextState {
  // Selected values
  selectedName: { name: string; guid: string; type: string } | null;
  selectedOrg: { name: string; guid: string } | null;
  selectedState: { id: string; label: string; guid: string } | null;
  
  // Results
  searchResults: any[];
  error: Error | null;
  isLoading: boolean;
  hasSearched: boolean;
  
  // Actions
  setSelectedName: (name: { name: string; guid: string; type: string } | null) => void;
  setSelectedOrg: (org: { name: string; guid: string } | null) => void;
  setSelectedState: (state: { id: string; label: string; guid: string } | null) => void;
  executeSearch: () => void;
  resetSearch: () => void;
  navigateToOrganization: (orgId: string, queryParams?: URLSearchParams) => void;
}

// Create the context with a default value
const SearchContext = createContext<SearchContextState | undefined>(undefined);

// Provider component
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  
  // State for selections
  const [selectedName, setSelectedName] = useState<{ name: string; guid: string; type: string } | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<{ name: string; guid: string } | null>(null);
  const [selectedState, setSelectedState] = useState<{ id: string; label: string; guid: string } | null>(null);
  
  // State for search results
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  
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
  
  // Execute search based on current selections
  const executeSearch = useCallback(() => {
    // Clear previous errors and results
    setError(null);
    searchMutation.reset();
    checkOrgDataMutation.reset();
    setSearchResults([]);
    setHasSearched(true);
    
    // If organization is selected, check data exists before navigating
    if (selectedOrg?.guid) {
      checkOrgDataMutation.mutate(selectedOrg.guid);
      return;
    }
    
    // Otherwise, execute the search
    searchMutation.mutate();
  }, [selectedName, selectedOrg, selectedState, searchMutation, checkOrgDataMutation]);
  
  // Reset search state
  const resetSearch = useCallback(() => {
    setSelectedName(null);
    setSelectedOrg(null);
    setSelectedState(null);
    setSearchResults([]);
    setError(null);
    setHasSearched(false);
    searchMutation.reset();
    checkOrgDataMutation.reset();
  }, []);
  
  // Navigate to organization
  const navigateToOrganization = useCallback((orgId: string, queryParams?: URLSearchParams) => {
    const queryString = queryParams?.toString() || '';
    navigate(`/organization/${orgId}/map${queryString ? `?${queryString}` : ''}`);
  }, [navigate]);
  
  // Provide the context value
  const value: SearchContextState = {
    selectedName,
    selectedOrg,
    selectedState,
    searchResults,
    error,
    isLoading: searchMutation.isPending || checkOrgDataMutation.isPending,
    hasSearched,
    setSelectedName,
    setSelectedOrg,
    setSelectedState,
    executeSearch,
    resetSearch,
    navigateToOrganization,
  };
  
  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use the search context
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};