import { Suspense, useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Autocomplete, Box, Chip, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { z } from 'zod';
import type { USStateType } from '~/types/usStates';
import { useAppForm } from '~/hooks/use-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import useDebounce from '~/hooks/use-debounce';

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
  // Navigation helper
  const navigate = (url: string) => {
    window.location.href = url;
  };

  // State for Name Autocomplete
  const [nameInputValue, setNameInputValue] = useState('');
  const [nameOptions, setNameOptions] = useState<
    Array<{ name: string; guid: string; type: string }>
  >([]);
  const [selectedName, setSelectedName] = useState<{
    name: string;
    guid: string;
  } | null>(null);

  // State for Organization Autocomplete
  const [orgInputValue, setOrgInputValue] = useState('');
  const [orgOptions, setOrgOptions] = useState<
    Array<{ name: string; guid: string; type: string }>
  >([]);
  const [selectedOrg, setSelectedOrg] = useState<{
    name: string;
    guid: string;
  } | null>(null);

  // State for States dropdown
  const [states, setStates] = useState<Array<USStateType & { guid: string }>>(
    []
  );
  const [stateValue, setStateValue] = useState<
    (USStateType & { guid: string }) | null
  >(null);
  const [stateInputValue, setStateInputValue] = useState('');

  // State for search results
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);

  // Debugging state to track values
  const [debugValues, setDebugValues] = useState({
    nameGuid: '',
    stateGuid: '',
    orgGuid: '',
  });

  // Setup React Query mutation for search
  const searchMutation = useMutation({
    mutationFn: async (searchData: Record<string, string>) => {
      const specialtyOrPractitioner = searchData.nameGuid || null;
      const stateGuid = searchData.stateGuid || null;
      const participatingOrganization = searchData.orgGuid || null;

      const response = await fetch(
        `http://localhost:5041/api/search/po?specialtyOrPractitioner=${specialtyOrPractitioner}&state=${stateGuid}&participantingOrganization=${participatingOrganization}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          errorText || `Request failed with status ${response.status}`
        );
      }

      return response.json();
    },
    onSuccess: (data) => {
      setSearchResults(data);
    },
    onError: (err) => {
      setError(
        err instanceof Error ? err : new Error('An unknown error occurred')
      );
      console.error('Search error:', err);
    },
  });

  // Debounce the search inputs to prevent excessive API calls
  const debouncedNameInput = useDebounce(nameInputValue, 300);
  const debouncedOrgInput = useDebounce(orgInputValue, 300);

  // Initialize form
  const form = useAppForm({
    defaultValues: {
      nameOrSpecialty: '',
      state: '',
      participatingorganization: '',
    },
    validators: {
      onChange: z.object({
        nameOrSpecialty: z.string(),
        state: z.string(),
        participatingorganization: z.string(),
      }),
    },
    onSubmit: ({ value }) => {
      setError(null);

      // CASE 1: If organization is selected, navigate to organization-specific URL with query params
      if (selectedOrg?.guid) {
        // Build query parameters for other fields if they have values
        const queryParams = new URLSearchParams();

        if (selectedName?.guid) {
          queryParams.append('name', selectedName.guid);
        }

        if (stateValue?.guid) {
          queryParams.append('state', stateValue.guid);
        }

        // Construct URL with dynamic route and query parameters
        const queryString = queryParams.toString();
        const route = `/organization/${selectedOrg.guid}/map${
          queryString ? `?${queryString}` : ''
        }`;

        navigate(route);
        return;
      }

      // CASE 2: If participating organization is not selected, send a POST request
      const requestData: Record<string, string> = {};

      // Add nameGuid if available - using selectedName.guid directly
      if (selectedName?.guid) {
        requestData.nameGuid = selectedName.guid;
      }

      // Add stateGuid if available
      if (stateValue?.guid) {
        requestData.stateGuid = stateValue.guid;
      }

      // Update debug values
      setDebugValues({
        nameGuid: selectedName?.guid || '',
        stateGuid: stateValue?.guid || '',
        orgGuid: selectedOrg?.guid || '',
      });

      // Only proceed if we have at least one guid to search with
      if (Object.keys(requestData).length === 0) {
        setError(new Error('Please provide at least one search parameter'));
        return;
      }

      // Execute the mutation
      searchMutation.mutate(requestData);
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
      // Transform the API response to include name and guid
      const providers = Array.isArray(nameSuggestions)
        ? nameSuggestions.map((provider) => ({
            name: provider.name || '',
            guid: provider.id || '',
            type: provider.type || ''
          }))
        : [];

      // Filter out items with empty names or guids
      const validProviders = providers.filter(
        (provider) => provider.name.trim() !== '' && provider.guid
      );

      setNameOptions(validProviders);
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

      // Filter out items with empty names or guids
      const validOrgs = organizations.filter(
        (org) => org.name.trim() !== '' && org.guid
      );

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
      // Transform the API response to include guid
      const formattedStates = Array.isArray(statesData)
        ? statesData.map((state) => ({
            id: state.stateCode || '',
            label: state.stateName || '',
            guid: state.stateId || '',
          }))
        : [];

      setStates(formattedStates);
    }
  }, [statesData]);

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
                name="nameOrSpecialty"
                children={(field) => {
                  return (
                    <Box className="flex flex-1">
                      <Autocomplete
                        options={nameOptions}
                        inputValue={nameInputValue}
                        onInputChange={(event, newInputValue) => {
                          setNameInputValue(newInputValue);
                          field.handleChange(newInputValue);
                        }}
                        value={selectedName}
                        onChange={(event, newValue) => {
                          if (typeof newValue === 'string') {
                            // Handle free text input
                            // Don't set a guid for free text input
                            setSelectedName({
                              name: newValue,
                              guid: '',
                            });
                          } else if (newValue) {
                            // Handle selection from dropdown with proper guid
                            setSelectedName(newValue);
                          } else {
                            // Handle clearing the selection
                            setSelectedName(null);
                          }

                          // Update the form field with just the name
                          field.handleChange(
                            typeof newValue === 'string'
                              ? newValue
                              : newValue?.name || ''
                          );
                        }}
                        getOptionLabel={(option: {name: string; guid: string; type: string;}) => {
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
                        loading={nameSuggestionsLoading}
                        loadingText="Loading providers..."
                        noOptionsText="No providers found"
                        className="flex-1"
                        renderOption={(props, option) => (
                          <li {...props} key={option.guid}>
                            <Box className='flex justify-between w-full'>
                              <Box>{option.name}</Box>
                              <Chip variant='outlined' size="small" label={option.type.toLowerCase() === 'practitioner' ? 'Practitioner' : 'Specialty'} className='text-neutral-500'/>
                            </Box>
                          </li>
                        )}
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
                          } else if (newValue) {
                            // Handle selection from dropdown
                            setSelectedOrg(newValue);
                          } else {
                            // Handle clearing the selection
                            setSelectedOrg(null);
                          }

                          field.handleChange(
                            typeof newValue === 'string'
                              ? newValue
                              : newValue?.name || ''
                          );
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
                disabled={searchMutation.isPending}
                className="rounded-l-none rounded-r-md p-4 bg-neutral-400 text-white text-xl hover:bg-neutral-800"
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </form>

          {/* Display loading state */}
          {searchMutation.isPending && <p>Loading results...</p>}

          {/* Display error message */}
          {(error || searchMutation.error) && (
            <p className="text-red-500">
              Error:{' '}
              {error?.message ||
                (searchMutation.error instanceof Error
                  ? searchMutation.error.message
                  : 'Unknown error occurred')}
            </p>
          )}
        </Box>

        {/* Display search results */}
        <Box className="mt-2 mb-8 py-8 max-w-6xl mx-auto p-8 bg-white">
          {searchResults.length > 0 && (
            <div className="mt-8 border rounded-lg p-8">
              <h2 className="text-xl font-bold">Results</h2>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {searchResults.map((result, index) => (
                  <Link
                    key={result.id || index}
                    to={`/organization/${result.id}/map`}
                    viewTransition
                  >
                    <div className="p-4 bg-neutral-100 rounded text-center hover:bg-neutral-200 transition-colors">
                      <h3 className="font-semibold">{result.name}</h3>
                      {result.specialty && <p>Specialty: {result.specialty}</p>}
                      {result.organization && (
                        <p>Organization: {result.organization}</p>
                      )}
                      {result.address && <p>Address: {result.address}</p>}
                      {result.phone && <p>Phone: {result.phone}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Box>
      </Suspense>
    </>
  );
}
