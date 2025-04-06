import { useQuery } from '@tanstack/react-query';
import { SearchProvidersUseCase } from '../../core/usecases/searchProviders';
import { ProviderSearchCriteria } from '../../core/repositories/providerRepository';

/**
 * Hook to search providers
 * @param searchUseCase The use case for searching providers
 * @param criteria The search criteria
 * @returns Query result with providers data
 */
export const useProviderSearch = (
  searchUseCase: SearchProvidersUseCase,
  criteria: ProviderSearchCriteria
) => {
  return useQuery({
    queryKey: ['providers', 'search', criteria],
    queryFn: () => searchUseCase.execute(criteria),
    enabled: Object.values(criteria).some(value => 
      value !== undefined && value !== null && value !== ''
    )
  });
};

/**
 * Hook to get a provider by ID
 * @param getProviderUseCase The use case for getting a provider
 * @param id The provider ID
 * @returns Query result with provider data
 */
export const useProvider = (getProviderUseCase: any, id: string) => {
  return useQuery({
    queryKey: ['provider', id],
    queryFn: () => getProviderUseCase.execute(id),
    enabled: !!id
  });
};