import React, { Suspense, useState, useEffect } from 'react';
import { Autocomplete, Box, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// We'll fetch states from API instead of using the constants
// import { usStates } from '~/constants/constants';
import { z } from 'zod';
import type { USStateType } from '~/types/usStates';
import { useAppForm } from '~/hooks/use-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import useDebounce from '~/hooks/use-debounce';

// Function to fetch providers based on search criteria
const fetchProviders = async (searchParams: Record<string, string>) => {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  const url = `https://occ8ko8kw44kckgk8sw8wk84.mttwhlly.cc/providers?${params.toString()}`;

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

// Function to fetch name/specialty suggestions
const fetchNameSuggestions = async (query: string) => {
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
const fetchOrgSuggestions = async (query: string) => {
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
const fetchStates = async () => {
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

export default function Search() {
  // Navigation hook
  const navigate = (url) => {
    window.location.href = url;
  };
  // State for Name Autocomplete
  const [nameInputValue, setNameInputValue] = useState('');
  const [nameOptions, setNameOptions] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState<string | null>(null);

  // State for Organization Autocomplete
  const [orgInputValue, setOrgInputValue] = useState('');
  const [orgOptions, setOrgOptions] = useState<
    Array<{ name: string; guid: string }>
  >([]);
  const [selectedOrg, setSelectedOrg] = useState<{
    name: string;
    guid: string;
  } | null>(null);

  // State for States dropdown
  const [states, setStates] = useState<USStateType[]>([]);
  const [stateValue, setStateValue] = useState<USStateType | null>(null);
  const [stateInputValue, setStateInputValue] = useState('');

  // Debounce the search inputs to prevent excessive API calls
  const debouncedNameInput = useDebounce(nameInputValue, 300);
  const debouncedSelectedName = useDebounce(selectedName || '', 500);
  const debouncedOrgInput = useDebounce(orgInputValue, 300);
  const debouncedSelectedOrg = useDebounce(selectedOrg || '', 500);
  const debouncedState = useDebounce(stateValue?.id, 500);

  // Initialize form
  const form = useAppForm({
    defaultValues: {
      firstName: '',
      state: '',
      participatingorganization: '',
    },
    validators: {
      onChange: z.object({
        firstName: z.string(),
        state: z.string(),
        participatingorganization: z.string(),
      }),
    },
    onSubmit: ({ value }) => {
      // If organization is selected, navigate to organization-specific URL
      if (selectedOrg?.guid) {
        navigate(`/organization/${selectedOrg.guid}/map`);
        return;
      }

      // Otherwise perform normal search
      mutation.mutateAsync({
        firstName: value.firstName,
        state: value.state,
        participatingorganization: value.participatingorganization,
      });
    },
  });

  // Fetch name/specialty suggestions when input changes
  const { data: nameSuggestions, isLoading: nameSuggestionsLoading } = useQuery(
    {
      queryKey: ['nameSuggestions', debouncedNameInput],
      queryFn: () => fetchNameSuggestions(debouncedNameInput),
      enabled: debouncedNameInput.length >= 2,
      refetchOnWindowFocus: false,
    }
  );

  // Fetch organization suggestions when input changes
  const { data: orgSuggestions, isLoading: orgSuggestionsLoading } = useQuery({
    queryKey: ['orgSuggestions', debouncedOrgInput],
    queryFn: () => fetchOrgSuggestions(debouncedOrgInput),
    enabled: debouncedOrgInput.length >= 2,
    refetchOnWindowFocus: false,
  });

  // Update the name options when suggestions are received
  useEffect(() => {
    if (nameSuggestions) {
      // Extract unique provider names from the response
      // Based on the array of objects with 'name' property
      const providerNames = Array.isArray(nameSuggestions)
        ? nameSuggestions.map((provider) => provider.name || '')
        : [];

      // Filter out duplicates and empty strings
      const uniqueNames = [...new Set(providerNames)].filter(
        (name) => name.trim() !== ''
      );

      setNameOptions(uniqueNames);
    }
  }, [nameSuggestions]);

  // Update the organization options when suggestions are received
  useEffect(() => {
    if (orgSuggestions) {
      // Extract organization data from the response
      const organizations = Array.isArray(orgSuggestions)
        ? orgSuggestions.map((org) => ({
            name: org.name || '',
            guid: org.participatingOrganizationId || '', 
          }))
        : [];

      // Filter out items with empty names
      const validOrgs = organizations.filter((org) => org.name.trim() !== '');

      setOrgOptions(validOrgs);
    }
  }, [orgSuggestions]);

  // Fetch states on component mount
  const { data: statesData, isLoading: statesLoading } = useQuery({
    queryKey: ['states'],
    queryFn: fetchStates,
    refetchOnWindowFocus: false,
  });

  // Process states data when it's loaded
  useEffect(() => {
    if (statesData) {
      // Transform the API response into the format needed for the Autocomplete
      // Assuming the response is an array of state objects with 'code' and 'name' properties
      const formattedStates = Array.isArray(statesData)
        ? statesData.map((state) => ({
            id: state.stateCode || '',
            label: state.stateName || '',
          }))
        : [];

      setStates(formattedStates);
    }
  }, [statesData]);

  // Create a search params object for React Query
  const searchParams = {
    firstName: debouncedSelectedName,
    state: debouncedState || '',
    participatingorganization: selectedOrg?.name || '',
  };

  // Use React Query to fetch data when debounced values change
  const { data, isLoading, error } = useQuery({
    queryKey: ['providers', searchParams],
    queryFn: () => fetchProviders(searchParams),
    // Only run the query if at least one search parameter has a value
    enabled: Object.values(searchParams).some((value) => !!value),
    // Avoid refetching on window focus
    refetchOnWindowFocus: false,
  });

  // Mutation for manual search button
  const mutation = useMutation({
    mutationFn: fetchProviders,
    onSuccess: (data) => {
      console.log('Manual search successful:', data);
    },
    onError: (error) => {
      console.error('Manual search error:', error);
    },
  });

  // Display results when they change
  useEffect(() => {
    if (data) {
      console.log('Search results:', data);
    }
  }, [data]);

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Box className="my-8 py-8 max-w-6xl mx-auto p-8 bg-neutral-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <Box className="flex">
              {/* Name or Specialty Field with Autocomplete */}
              <form.AppField
                name="firstName"
                children={(field) => {
                  return (
                    <Box className="flex flex-1">
                      <Autocomplete
                        freeSolo
                        options={nameOptions}
                        inputValue={nameInputValue}
                        onInputChange={(event, newInputValue) => {
                          setNameInputValue(newInputValue);
                          field.handleChange(newInputValue);
                        }}
                        value={selectedName}
                        onChange={(event, newValue) => {
                          setSelectedName(newValue);
                          field.handleChange(newValue || '');
                        }}
                        loading={nameSuggestionsLoading}
                        loadingText="Loading providers..."
                        noOptionsText="No providers found"
                        className="flex-1"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Name or Specialty"
                            placeholder='e.g. "John Doe" or "Cardiology"'
                            variant="outlined"
                            className="bg-white"
                            fullWidth
                            id={field.name}
                            name={field.name}
                            error={
                              field.state.meta.isTouched &&
                              field.state.meta.errors.length > 0
                            }
                            helperText={
                              field.state.meta.isTouched &&
                              field.state.meta.errors.length > 0
                                ? field.state.meta.errors.map(
                                    (error) => error?.message
                                  )
                                : null
                            }
                          />
                        )}
                      />
                    </Box>
                  );
                }}
              />

              {/* State Field */}
              <form.AppField
                name="state"
                children={(field) => {
                  return (
                    <Box className="flex flex-1">
                      <Autocomplete
                        disablePortal
                        value={stateValue}
                        onChange={(event, newValue) => {
                          setStateValue(newValue);
                          field.handleChange(newValue?.id || '');
                        }}
                        inputValue={stateInputValue}
                        onInputChange={(event, newInputValue) => {
                          setStateInputValue(newInputValue);
                        }}
                        options={states}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value?.id
                        }
                        getOptionLabel={(option) => option.label}
                        className="flex-1"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="State"
                            placeholder='e.g. "New York"'
                            variant="outlined"
                            className="bg-white"
                            id={field.name}
                            name={field.name}
                            error={
                              field.state.meta.isTouched &&
                              field.state.meta.errors.length > 0
                            }
                            helperText={
                              field.state.meta.isTouched &&
                              field.state.meta.errors.length > 0
                                ? field.state.meta.errors.map(
                                    (error) => error?.message
                                  )
                                : null
                            }
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <>
                                  {statesLoading ? (
                                    <div className="mr-2 text-sm text-gray-400">
                                      Loading...
                                    </div>
                                  ) : null}
                                  {params.InputProps.endAdornment}
                                </>
                              ),
                            }}
                          />
                        )}
                      />
                    </Box>
                  );
                }}
              />

              {/* Organization Field with Autocomplete */}
              <form.AppField
                name="participatingorganization"
                children={(field) => {
                  return (
                    <Box className="flex flex-1">
                      <Autocomplete
                        freeSolo
                        options={orgOptions}
                        inputValue={orgInputValue}
                        onInputChange={(event, newInputValue) => {
                          setOrgInputValue(newInputValue);
                          field.handleChange(newInputValue);
                        }}
                        value={selectedOrg}
                        onChange={(event, newValue) => {
                          if (typeof newValue === 'string') {
                            // Handle free text input
                            setSelectedOrg({
                              name: newValue,
                              guid: '',
                            });
                            field.handleChange(newValue);
                          } else {
                            // Handle selection from dropdown
                            setSelectedOrg(newValue);
                            field.handleChange(newValue?.name || '');
                          }
                        }}
                        getOptionLabel={(option) => {
                          // Handle both string and object options
                          if (typeof option === 'string') {
                            return option;
                          }
                          return option.name || '';
                        }}
                        isOptionEqualToValue={(option, value) => {
                          if (!option || !value) return false;
                          return option.guid === value.guid;
                        }}
                        loading={orgSuggestionsLoading}
                        loadingText="Loading organizations..."
                        noOptionsText="No organizations found"
                        className="flex-1"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Participating Organization"
                            placeholder='e.g. "Centene"'
                            variant="outlined"
                            className="bg-white"
                            fullWidth
                            id={field.name}
                            name={field.name}
                            error={
                              field.state.meta.isTouched &&
                              field.state.meta.errors.length > 0
                            }
                            helperText={
                              field.state.meta.isTouched &&
                              field.state.meta.errors.length > 0
                                ? field.state.meta.errors.map(
                                    (error) => error?.message
                                  )
                                : null
                            }
                          />
                        )}
                      />
                    </Box>
                  );
                }}
              />

              <IconButton
                type="submit"
                disabled={isLoading || mutation.isPending}
                className="rounded-l-none rounded-r-md p-4 bg-neutral-400 text-white text-xl"
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </form>

          {/* Display loading state */}
          {(isLoading || mutation.isPending) && <p>Loading results...</p>}

          {/* Display error message */}
          {(error || mutation.error) && (
            <p className="text-red-500">
              Error:{' '}
              {error instanceof Error
                ? error.message
                : mutation.error instanceof Error
                ? mutation.error.message
                : 'Unknown error occurred'}
            </p>
          )}

          {/* Display results */}
          {data && (
            <div className="mt-4">
              <h2 className="text-xl font-bold">Search Results</h2>
              {/* Add your results rendering logic here */}
              <pre className="mt-2 p-4 bg-gray-100 rounded overflow-auto max-h-60">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </Box>
      </Suspense>
    </>
  );
}
