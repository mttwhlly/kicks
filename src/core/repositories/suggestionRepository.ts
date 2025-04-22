import { NameSuggestion, OrganizationSuggestion, StateSuggestion } from '../domain/searchSuggestion';

/**
 * Repository interface for search suggestions
 */
export interface SuggestionRepository {
  /**
   * Get name or specialty suggestions based on search term
   */
  getNameSuggestions(searchTerm: string): Promise<NameSuggestion[]>;
  
  /**
   * Get organization suggestions based on search term
   */
  getOrganizationSuggestions(searchTerm: string): Promise<OrganizationSuggestion[]>;
  
  /**
   * Get list of all states
   */
  getStates(): Promise<StateSuggestion[]>;
  
  /**
   * Check if organization data exists
   */
  checkOrganizationDataExists(orgId: string): Promise<boolean>;
}