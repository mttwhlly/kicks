// Mock versions of our services for Storybook
// Define types locally to avoid issues with imports in Storybook
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

// API service mock
export const mockApiService = {
  search: {
    getPractitionerOrSpecialty: async (): Promise<PractitionerOrSpecialtyResult[]> => {
      return [
        { id: '1', name: 'Dr. John Smith', type: 'Practitioner' },
        { id: '2', name: 'Dr. Jane Doe', type: 'Practitioner' },
        { id: '3', name: 'Cardiology', type: 'Specialty' },
        { id: '4', name: 'Pediatrics', type: 'Specialty' },
      ];
    },
    
    getOrganizations: async (): Promise<ParticipatingOrganizationResult[]> => {
      return [
        { participatingOrganizationId: '1', name: 'Aetna', type: 'Organization' },
        { participatingOrganizationId: '2', name: 'Blue Cross', type: 'Organization' },
        { participatingOrganizationId: '3', name: 'Cigna', type: 'Organization' },
      ];
    },
    
    getStates: async (): Promise<StateResult[]> => {
      return [
        { stateId: 'NY', stateCode: 'NY', stateName: 'New York' },
        { stateId: 'CA', stateCode: 'CA', stateName: 'California' },
        { stateId: 'TX', stateCode: 'TX', stateName: 'Texas' },
      ];
    },
    
    searchParticipatingOrganizations: async (): Promise<ParticipatingOrganizationResult[]> => {
      return [
        { participatingOrganizationId: '1', name: 'Aetna', type: 'Organization' },
        { participatingOrganizationId: '2', name: 'Blue Cross', type: 'Organization' },
      ];
    }
  },
  
  organization: {
    getProvidersAndLocations: async (): Promise<OrganizationDetail> => {
      return {
        participatingOrganizationId: '1',
        participatingOrganizationName: 'Aetna',
        totalProviderCount: 120,
        totalLocationCount: 45,
        participatingOrganizationDetails: [
          {
            practitionerId: '101',
            practiceLocationId: '201',
            fullName: 'Dr. John Smith',
            addressLine1: '123 Main St',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            latitude: 40.7128,
            longitude: -74.0060,
            stateCode: 0,
            acceptNewPatients: 100000000,
            locationCount: 2
          },
          {
            practitionerId: '102',
            practiceLocationId: '202',
            fullName: 'Dr. Jane Doe',
            addressLine1: '456 Park Ave',
            city: 'New York',
            state: 'NY',
            zip: '10022',
            latitude: 40.7624,
            longitude: -73.9738,
            stateCode: 0,
            acceptNewPatients: 100000001,
            locationCount: 1
          }
        ]
      };
    },
    
    checkDataExists: async (): Promise<boolean> => {
      return true;
    }
  }
};

// Mock for React Query hooks
export const mockQueryResult = {
  isLoading: false,
  isError: false,
  error: null,
  isSuccess: true,
  data: []
};