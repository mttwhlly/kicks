export interface FilterProps {
  onFilterChange: (filters: FilterCriteria) => void;
}

export interface FilterCriteria {
  name: string;
  city: string;
  state: string;
  specialty: string;
  providerType: string;
  acceptingNewPatients: boolean;
  includeInactive: boolean;
}