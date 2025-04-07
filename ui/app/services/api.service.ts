import { QueryClient } from '@tanstack/react-query';

// Configuration object for API settings
const API_CONFIG = {
  baseUrl: import.meta.env.VITE_NOVA_API_URL || '',
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
};

// Error handling class
export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Base API request handler with error handling
const apiRequest = async <T>(
  url: string, 
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(url, {
      headers: API_CONFIG.defaultHeaders,
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new ApiError(
        errorText || `Request failed with status ${response.status}`,
        response.status
      );
    }

    return await response.json() as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Unknown error occurred',
      500
    );
  }
};

// Type definitions for API responses
export interface PractitionerOrSpecialtyResult {
  id: string;
  name: string;
  type: string;
}

export interface ParticipatingOrganizationResult {
  participatingOrganizationId: string;
  name: string;
  type: string;
}

export interface StateResult {
  stateId: string;
  stateCode: string;
  stateName: string;
}

export interface OrganizationDetail {
  participatingOrganizationId: string;
  participatingOrganizationName: string;
  totalProviderCount: number;
  totalLocationCount: number;
  participatingOrganizationDetails: any[];
}

// API service with methods for each endpoint
export const apiService = {
  // Search endpoints
  search: {
    /**
     * Fetch practitioner or specialty suggestions based on search string
     */
    getPractitionerOrSpecialty: (searchString: string): Promise<PractitionerOrSpecialtyResult[]> => {
      if (!searchString || searchString.length < 2) return Promise.resolve([]);
      return apiRequest<PractitionerOrSpecialtyResult[]>(
        `${API_CONFIG.baseUrl}/api/search/practitionerorspecialty?searchString=${encodeURIComponent(searchString)}`
      );
    },

    /**
     * Fetch organization suggestions based on search string
     */
    getOrganizations: (searchString: string): Promise<ParticipatingOrganizationResult[]> => {
      if (!searchString || searchString.length < 2) return Promise.resolve([]);
      return apiRequest<ParticipatingOrganizationResult[]>(
        `${API_CONFIG.baseUrl}/api/search/po?searchString=${encodeURIComponent(searchString)}`
      );
    },

    /**
     * Fetch all available states
     */
    getStates: (): Promise<StateResult[]> => {
      return apiRequest<StateResult[]>(`${API_CONFIG.baseUrl}/api/search/states`);
    },

    /**
     * Search for participating organizations based on criteria
     */
    searchParticipatingOrganizations: (params: {
      practitionerGuid?: string;
      specialtyGuid?: string;
      stateGuid?: string;
    }): Promise<ParticipatingOrganizationResult[]> => {
      // Build query parameters
      const queryParams = new URLSearchParams();
      
      if (params.practitionerGuid) {
        queryParams.append('practitionerGuid', params.practitionerGuid);
      }
      
      if (params.specialtyGuid) {
        queryParams.append('specialtyGuid', params.specialtyGuid);
      }
      
      if (params.stateGuid) {
        queryParams.append('stateGuid', params.stateGuid);
      }

      const queryString = queryParams.toString();
      
      return apiRequest<ParticipatingOrganizationResult[]>(
        `${API_CONFIG.baseUrl}/api/search/po${queryString ? `?${queryString}` : ''}`,
        { method: 'POST' }
      );
    }
  },

  // Nova endpoints
  organization: {
    /**
     * Get providers and locations for an organization
     */
    getProvidersAndLocations: (organizationId: string): Promise<OrganizationDetail> => {
      return apiRequest<OrganizationDetail>(
        `${API_CONFIG.baseUrl}/api/nova/${organizationId}/providersandlocations`
      );
    },

    /**
     * Check if organization data exists
     */
    checkDataExists: async (organizationId: string): Promise<boolean> => {
      try {
        const data = await apiRequest<any>(
          `${API_CONFIG.baseUrl}/api/nova/${organizationId}/providersandlocations`
        );
        return Array.isArray(data) ? data.length > 0 : !!data;
      } catch (error) {
        return false;
      }
    }
  }
};

// Configure React Query client with defaults
export const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export default apiService;