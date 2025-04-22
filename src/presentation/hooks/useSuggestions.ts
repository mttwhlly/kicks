import { useQuery, useMutation } from '@tanstack/react-query';
import { GetNameSuggestionsUseCase, GetOrganizationSuggestionsUseCase, GetStatesUseCase, CheckOrganizationDataUseCase } from '../../core/usecases/getSuggestions';

/**
 * Hook to get name suggestions
 */
export const useNameSuggestions = (
  useCase: GetNameSuggestionsUseCase,
  searchTerm: string
) => {
  return useQuery({
    queryKey: ['nameSuggestions', searchTerm],
    queryFn: () => useCase.execute(searchTerm),
    enabled: searchTerm.length >= 2,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook to get organization suggestions
 */
export const useOrganizationSuggestions = (
  useCase: GetOrganizationSuggestionsUseCase,
  searchTerm: string
) => {
  return useQuery({
    queryKey: ['orgSuggestions', searchTerm],
    queryFn: () => useCase.execute(searchTerm),
    enabled: searchTerm.length >= 2,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook to get states list
 */
export const useStates = (useCase: GetStatesUseCase) => {
  return useQuery({
    queryKey: ['states'],
    queryFn: () => useCase.execute(),
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook to check if organization data exists
 */
export const useCheckOrganizationData = (useCase: CheckOrganizationDataUseCase) => {
  return useMutation({
    mutationFn: async ({
      orgId,
      queryParams,
    }: {
      orgId: string;
      queryParams: URLSearchParams;
    }) => {
      const exists = await useCase.execute(orgId);
      
      if (!exists) {
        throw new Error('No data available for this organization.');
      }
      
      // If data exists, return the route we want to navigate to
      const queryString = queryParams.toString();
      return `/organization/${orgId}/map${
        queryString ? `?${queryString}` : ''
      }`;
    },
  });
};