import { NameSuggestion, OrganizationSuggestion, StateSuggestion } from '../domain/searchSuggestion';
import { SuggestionRepository } from '../repositories/suggestionRepository';

/**
 * Use case for getting name suggestions
 */
export class GetNameSuggestionsUseCase {
  constructor(private suggestionRepository: SuggestionRepository) {}
  
  async execute(searchTerm: string): Promise<NameSuggestion[]> {
    if (!searchTerm || searchTerm.length < 2) {
      return [];
    }
    
    return this.suggestionRepository.getNameSuggestions(searchTerm);
  }
}

/**
 * Use case for getting organization suggestions
 */
export class GetOrganizationSuggestionsUseCase {
  constructor(private suggestionRepository: SuggestionRepository) {}
  
  async execute(searchTerm: string): Promise<OrganizationSuggestion[]> {
    if (!searchTerm || searchTerm.length < 2) {
      return [];
    }
    
    return this.suggestionRepository.getOrganizationSuggestions(searchTerm);
  }
}

/**
 * Use case for getting states list
 */
export class GetStatesUseCase {
  constructor(private suggestionRepository: SuggestionRepository) {}
  
  async execute(): Promise<StateSuggestion[]> {
    return this.suggestionRepository.getStates();
  }
}

/**
 * Use case for checking if organization data exists
 */
export class CheckOrganizationDataUseCase {
  constructor(private suggestionRepository: SuggestionRepository) {}
  
  async execute(orgId: string): Promise<boolean> {
    if (!orgId) {
      return false;
    }
    
    return this.suggestionRepository.checkOrganizationDataExists(orgId);
  }
}