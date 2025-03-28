

// Function to fetch name/specialty suggestions
export const fetchNameSuggestions = async (query: string) => {
  if (!query || query.length < 2) return [];

  const url = `http://localhost:5041/api/search/practitionerorspecialty?searchString=${encodeURIComponent(
    query
  )}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      errorText || `Request failed with status ${response.status}`
    );
  }

  return response.json();
};

// Function to fetch organization suggestions
export const fetchOrgSuggestions = async (query: string) => {
  if (!query || query.length < 2) return [];

  const url = `http://localhost:5041/api/search/po?searchString=${encodeURIComponent(
    query
  )}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      errorText || `Request failed with status ${response.status}`
    );
  }

  return response.json();
};

// Function to fetch states from API
export const fetchStates = async () => {
  const url = 'http://localhost:5041/api/search/states';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      errorText || `Request failed with status ${response.status}`
    );
  }

  return response.json();
};

// Function to check if organization has data available
export const checkOrgDataExists = async (orgGuid: string) => {
  const url = `http://localhost:5041/api/nova/${orgGuid}/providersandlocations`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    return false;
  }

  const data = await response.json();
  // Return true if data exists (you may need to adjust this based on the actual API response structure)
  return Array.isArray(data) ? data.length > 0 : !!data;
};