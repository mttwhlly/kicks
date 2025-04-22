import { ReactNode, createContext, useContext, useMemo } from 'react';
import { ApiClient } from '../../infrastructure/api/apiClient';
import { ApiSuggestionRepository } from '../../infrastructure/repositories/suggestionRepositoryImpl';
import { ApiProviderRepository } from '../../infrastructure/repositories/providerRepositoryImpl';
import { GetNameSuggestionsUseCase, GetOrganizationSuggestionsUseCase, GetStatesUseCase, CheckOrganizationDataUseCase } from '../../core/usecases/getSuggestions';
import { SearchProvidersUseCase } from '../../core/usecases/searchProviders';

interface SearchProviderContext {
  nameSuggestionsUseCase: GetNameSuggestionsUseCase;
  orgSuggestionsUseCase: GetOrganizationSuggestionsUseCase;
  statesUseCase: GetStatesUseCase;
  checkOrgDataUseCase: CheckOrganizationDataUseCase;
  searchProvidersUseCase: SearchProvidersUseCase;
}

const SearchContext = createContext<SearchProviderContext | null>(null);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
  apiConfig?: {
    baseUrl: string;
    timeout: number;
  };
}

export const SearchProvider = ({ 
  children, 
  apiConfig = { baseUrl: '/api', timeout: 10000 } 
}: SearchProviderProps) => {
  // Create dependencies
  const value = useMemo(() => {
    // Create API client
    const apiClient = new ApiClient(apiConfig);
    
    // Create repositories
    const suggestionRepository = new ApiSuggestionRepository(apiClient);
    const providerRepository = new ApiProviderRepository(apiClient);
    
    // Create use cases
    const nameSuggestionsUseCase = new GetNameSuggestionsUseCase(suggestionRepository);
    const orgSuggestionsUseCase = new GetOrganizationSuggestionsUseCase(suggestionRepository);
    const statesUseCase = new GetStatesUseCase(suggestionRepository);
    const checkOrgDataUseCase = new CheckOrganizationDataUseCase(suggestionRepository);
    const searchProvidersUseCase = new SearchProvidersUseCase(providerRepository);
    
    // For server-side rendering compatibility,
    // we've removed the window references
    
    return {
      nameSuggestionsUseCase,
      orgSuggestionsUseCase,
      statesUseCase,
      checkOrgDataUseCase,
      searchProvidersUseCase
    };
  }, [apiConfig]);
  
  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

// Window extensions have been removed for server-side rendering compatibility