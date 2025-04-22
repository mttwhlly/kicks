import { NameSuggestion, OrganizationSuggestion, StateSuggestion } from '../../core/domain/searchSuggestion';

/**
 * Fetches name or specialty suggestions based on search term
 * @deprecated Use SuggestionRepository via GetNameSuggestionsUseCase instead
 */
export async function fetchNameSuggestions(searchTerm: string): Promise<NameSuggestion[]> {
  try {
    if (!searchTerm || searchTerm.length < 2) {
      return [];
    }
    
    const response = await fetch(`/api/suggestions/names?term=${encodeURIComponent(searchTerm)}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch name suggestions:', error);
    return [];
  }
}

/**
 * Fetches organization suggestions based on search term
 * @deprecated Use SuggestionRepository via GetOrganizationSuggestionsUseCase instead
 */
export async function fetchOrgSuggestions(searchTerm: string): Promise<OrganizationSuggestion[]> {
  try {
    if (!searchTerm || searchTerm.length < 2) {
      return [];
    }
    
    const response = await fetch(`/api/suggestions/organizations?term=${encodeURIComponent(searchTerm)}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch organization suggestions:', error);
    return [];
  }
}

/**
 * Fetches list of all states
 * @deprecated Use SuggestionRepository via GetStatesUseCase instead
 */
export async function fetchStates(): Promise<StateSuggestion[]> {
  try {
    const response = await fetch('/api/states');
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch states:', error);
    return [];
  }
}

/**
 * Checks if organization data exists
 * @deprecated Use SuggestionRepository via CheckOrganizationDataUseCase instead
 */
export async function checkOrgDataExists(orgId: string): Promise<boolean> {
  try {
    if (!orgId) {
      return false;
    }
    
    const response = await fetch(`/api/organizations/${orgId}/exists`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.exists;
  } catch (error) {
    console.error(`Failed to check if organization ${orgId} exists:`, error);
    return false;
  }
}