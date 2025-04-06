import { Provider } from '../../src/core/domain/provider';

/**
 * Mock data for providers to use in Storybook stories
 */
export const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    address: {
      street: '123 Medical Center Dr',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      coordinates: {
        latitude: 40.7128,
        longitude: -74.0060
      }
    },
    phone: '(555) 123-4567',
    email: 'sarah.johnson@example.com',
    npi: '1234567890',
    networks: ['Blue Cross', 'Aetna', 'Cigna'],
    languages: ['English', 'Spanish'],
    acceptingNewPatients: true,
    verificationStatus: 'verified'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    address: {
      street: '456 Health Blvd',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      coordinates: {
        latitude: 34.0522,
        longitude: -118.2437
      }
    },
    phone: '(555) 987-6543',
    email: 'michael.chen@example.com',
    npi: '0987654321',
    networks: ['United Healthcare', 'Kaiser'],
    languages: ['English', 'Mandarin'],
    acceptingNewPatients: true,
    verificationStatus: 'verified'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    address: {
      street: '789 Children's Way',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      coordinates: {
        latitude: 41.8781,
        longitude: -87.6298
      }
    },
    phone: '(555) 456-7890',
    email: 'emily.rodriguez@example.com',
    npi: '5678901234',
    networks: ['Humana', 'Aetna'],
    languages: ['English', 'Spanish'],
    acceptingNewPatients: false,
    verificationStatus: 'verified'
  }
];