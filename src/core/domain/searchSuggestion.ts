/**
 * Domain entity for search suggestions
 */
export interface NameSuggestion {
  id: string;
  name: string;
  type: string;
}

export interface OrganizationSuggestion {
  participatingOrganizationId: string;
  name: string;
  type: string;
}

export interface StateSuggestion {
  stateId: string;
  stateCode: string;
  stateName: string;
}