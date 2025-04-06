import { Provider } from '../../core/domain/provider';
import { ProviderRepository, ProviderSearchCriteria } from '../../core/repositories/providerRepository';
import { ApiClient } from '../api/apiClient';

/**
 * Implementation of the Provider Repository using API
 */
export class ApiProviderRepository implements ProviderRepository {
  constructor(private apiClient: ApiClient) {}

  async getProviderById(id: string): Promise<Provider | null> {
    try {
      return await this.apiClient.get<Provider>(`/providers/${id}`);
    } catch (error) {
      console.error(`Failed to fetch provider with ID ${id}:`, error);
      return null;
    }
  }

  async searchProviders(criteria: ProviderSearchCriteria): Promise<Provider[]> {
    try {
      // Convert criteria to query parameters
      const queryParams = new URLSearchParams();
      
      Object.entries(criteria).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(item => queryParams.append(`${key}[]`, item));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });

      const queryString = queryParams.toString();
      const endpoint = `/providers/search${queryString ? `?${queryString}` : ''}`;
      
      return await this.apiClient.get<Provider[]>(endpoint);
    } catch (error) {
      console.error('Provider search failed:', error);
      return [];
    }
  }

  async getProvidersByLocation(
    latitude: number, 
    longitude: number, 
    radius: number
  ): Promise<Provider[]> {
    try {
      const endpoint = `/providers/near?lat=${latitude}&lng=${longitude}&radius=${radius}`;
      return await this.apiClient.get<Provider[]>(endpoint);
    } catch (error) {
      console.error('Failed to fetch providers by location:', error);
      return [];
    }
  }
}