/**
 * Domain entity for healthcare providers
 */
export interface Provider {
  id: string;
  name: string;
  specialty?: string;
  address?: Address;
  phone?: string;
  email?: string;
  npi?: string; // National Provider Identifier
  networks?: string[];
  languages?: string[];
  acceptingNewPatients?: boolean;
  verificationStatus?: 'verified' | 'unverified' | 'pending';
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}