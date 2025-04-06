import { Provider } from '../domain/provider';

export interface ProviderSearchCriteria {
  specialty?: string;
  location?: string;
  radius?: number;
  network?: string;
  acceptingNewPatients?: boolean;
  languages?: string[];
  name?: string;
}

/**
 * Repository interface for Provider data
 * Following the dependency inversion principle, this interface is defined in the
 * core layer but will be implemented in the infrastructure layer
 */
export interface ProviderRepository {
  /**
   * Find a provider by ID
   */
  getProviderById(id: string): Promise<Provider | null>;
  
  /**
   * Search providers by criteria
   */
  searchProviders(criteria: ProviderSearchCriteria): Promise<Provider[]>;
  
  /**
   * Get providers by location
   */
  getProvidersByLocation(latitude: number, longitude: number, radius: number): Promise<Provider[]>;
}