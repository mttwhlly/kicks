import type { FilterCriteria } from "./filter";

export interface LocationData {
  acceptNewPatients?: number;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  firstName?: string;
  fullName?: string;
  lastName?: string;
  latitude: number;
  locationCount?: number;
  longitude: number;
  officeFaxNumber: string;
  officePhoneExtension: string;
  officePhoneNumber: string;
  officeType: string;
  participatingOrganizationId: string;
  practiceLocationId: string;
  practiceLocationName: string;
  practitionerId: number | string;
  providerCount: number;
  rosterId: string;
  state?: string;
  stateCode?: number;
  zip?: string;
}

export interface MapComponentProps {
  locations: LocationData[];
  selectedLocation: number;
  setSelectedLocation: (index: number) => void;
  selectedLocationId?: number | string | null;
  setSelectedLocationId?: (id: number | string | null) => void;
  selectedPracticeLocationId?: number | string | null;
  setSelectedPracticeLocationId?: (id: number | string | null) => void;
}

export interface InteractiveMapWithCardsProps {
  filterCriteria?: FilterCriteria;
  initialData?: LocationData[];
}

export interface FitBoundsToMarkersProps {
  locations: LocationData[];
}

export interface FlyToHandlerProps {
  map: any; // You might want to use the proper Leaflet map type here
  selectedLocation: number;
  locations: LocationData[];
}