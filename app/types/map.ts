import type { FilterCriteria } from "./filter";

export interface LocationData {
  acceptNewPatients: 100000000 | 100000001 | null;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  firstName: string;
  fullName: string;
  lastName: string;
  latitude: number;
  locationCount: number;
  longitude: number;
  officeFaxNumber: string;
  officePhoneExtension: string;
  officePhoneNumber: string;
  officeType: string;
  participatingOrganizationId: string;
  practiceLocationId: string;
  practiceLocationName: string;
  practitionerId: string;
  providerCount: number;
  rosterId: string;
  state: string;
  zip: string;
}

export interface MapComponentProps {
  locations: LocationData[];
  selectedLocation: number;
  setSelectedLocation: (id: number) => void;
}

export interface InteractiveMapWithCardsProps {
  filterCriteria?: FilterCriteria;
  initialData?: LocationData[];
}
