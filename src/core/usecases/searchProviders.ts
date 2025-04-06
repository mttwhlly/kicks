import { Provider } from '../domain/provider';
import { ProviderRepository, ProviderSearchCriteria } from '../repositories/providerRepository';

/**
 * Use case for searching providers
 * This encapsulates the business logic for the search functionality
 */
export class SearchProvidersUseCase {
  constructor(private providerRepository: ProviderRepository) {}

  /**
   * Execute the search based on provided criteria
   */
  async execute(criteria: ProviderSearchCriteria): Promise<Provider[]> {
    // Here we could add business logic that's not directly related to data access
    // For example, validation, transformation, or additional business rules
    
    return this.providerRepository.searchProviders(criteria);
  }
}