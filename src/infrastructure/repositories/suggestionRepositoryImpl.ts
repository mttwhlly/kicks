import { NameSuggestion, OrganizationSuggestion, StateSuggestion } from '../../core/domain/searchSuggestion';
import { SuggestionRepository } from '../../core/repositories/suggestionRepository';
import { ApiClient } from '../api/apiClient';

/**
 * Implementation of the Suggestion Repository using API
 */
export class ApiSuggestionRepository implements SuggestionRepository {
  constructor(private apiClient: ApiClient) {}
  
  async getNameSuggestions(searchTerm: string): Promise<NameSuggestion[]> {
    try {
      if (!searchTerm || searchTerm.length < 2) {
        return [];
      }
      
      return await this.apiClient.get<NameSuggestion[]>(
        `/suggestions/names?term=${encodeURIComponent(searchTerm)}`
      );
    } catch (error) {
      console.error('Failed to fetch name suggestions:', error);
      return [];
    }
  }
  
  async getOrganizationSuggestions(searchTerm: string): Promise<OrganizationSuggestion[]> {
    try {
      if (!searchTerm || searchTerm.length < 2) {
        return [];
      }
      
      return await this.apiClient.get<OrganizationSuggestion[]>(
        `/suggestions/organizations?term=${encodeURIComponent(searchTerm)}`
      );
    } catch (error) {
      console.error('Failed to fetch organization suggestions:', error);
      return [];
    }
  }
  
  async getStates(): Promise<StateSuggestion[]> {
    try {
      return await this.apiClient.get<StateSuggestion[]>('/states');
    } catch (error) {
      console.error('Failed to fetch states:', error);
      return [];
    }
  }
  
  async checkOrganizationDataExists(orgId: string): Promise<boolean> {
    try {
      if (!orgId) {
        return false;
      }
      
      const result = await this.apiClient.get<{ exists: boolean }>(
        `/organizations/${orgId}/exists`
      );
      
      return result.exists;
    } catch (error) {
      console.error(`Failed to check if organization ${orgId} exists:`, error);
      return false;
    }
  }
}