import { Suspense, useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Autocomplete, Box, Chip, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { z } from 'zod';
import type { USStateType } from '~/common/types/usStates';
import { useAppForm } from '~/presentation/hooks/useForm';
import { useMutation } from '@tanstack/react-query';
import { useDebounce } from '~/presentation/hooks/useDebounce';
import {
  useNameSuggestions,
  useOrganizationSuggestions,
  useStates,
  useCheckOrganizationData,
} from '~/presentation/hooks/useSuggestions';
import { ProviderSearchCriteria } from '~/core/repositories/providerRepository';
import { useSearchContext } from '~/presentation/providers/SearchProvider';

// Props interface for ProviderSearchForm
interface ProviderSearchFormProps {
  onSearch?: (criteria: ProviderSearchCriteria) => void;
  isLoading?: boolean;
}

export default function ProviderSearchForm({
  onSearch,
  isLoading = false,
}: ProviderSearchFormProps) {
  // Use React Router's navigate
  const navigateTo = (url: string) => {
    // We'll use the callback passed from parent components
    if (url.startsWith('/')) {
      // For relative URLs, we'll keep this as a no-op for now
      // and rely on Link components or parent-provided handlers
    } else {
      // For absolute URLs, we'll log a warning (client-side only)
      if (typeof console !== 'undefined') {
        console.warn('External navigation not supported in this component');
      }
    }
  };

  // Get use cases from search context
  const {
    nameSuggestionsUseCase,
    orgSuggestionsUseCase,
    statesUseCase,
    checkOrgDataUseCase,
  } = useSearchContext();

  // State for Name Autocomplete
  const [nameInputValue, setNameInputValue] = useState('');
  const [nameOptions, setNameOptions] = useState<
    Array<{ name: string; guid: string; type: string }>
  >([]);
  const [selectedName, setSelectedName] = useState<{
    name: string;
    guid: string;
    type: string;
  } | null>(null);

  // Reset search state when inputs are cleared
  const resetSearchState = () => {
    // Only reset if all selection fields are empty
    if (!selectedName?.guid && !stateValue?.guid && !selectedOrg?.guid) {
      setSearchResults([]);
      setError(null);
      setHasSearched(false);
      // Clear any mutation errors as well
      searchMutation.reset();
      checkOrgDataMutation.reset();
    }
  };

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
  const [checkingOrgData, setCheckingOrgData] = useState(false);

  // Setup React Query mutation for search
  const searchMutation = useMutation({
    mutationFn: async (searchData: Record<string, string>) => {
      // Build query parameters for other fields if they have values
      const queryParams = new URLSearchParams();

      if (searchData.specialtyGuid) {
        queryParams.append('specialtyGuid', searchData.specialtyGuid);
      }

      if (searchData.nameGuid) {
        queryParams.append('practitionerGuid', searchData.nameGuid);
      }

      if (searchData.stateGuid) {
        queryParams.append('stateGuid', searchData.stateGuid);
      }

      // Construct URL with dynamic route and query parameters
      const queryString = queryParams.toString();

      console.log(queryString);

      const response = await fetch(
        `${import.meta.env.VITE_NOVA_API_URL}/api/search/po${
          queryString ? `?${queryString}` : ''
        }`,
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

  // Setup React Query mutation for checking organization data using our hook
  const checkOrgDataMutation = useCheckOrganizationData(checkOrgDataUseCase);

  // Update local state when the mutation status changes
  useEffect(() => {
    setCheckingOrgData(checkOrgDataMutation.isPending);

    if (checkOrgDataMutation.isSuccess && checkOrgDataMutation.data) {
      navigateTo(checkOrgDataMutation.data);
    }

    if (checkOrgDataMutation.isError) {
      setError(
        checkOrgDataMutation.error instanceof Error
          ? checkOrgDataMutation.error
          : new Error('An unknown error occurred')
      );
      setSearchResults([]);
    }
  }, [
    checkOrgDataMutation.isPending,
    checkOrgDataMutation.isSuccess,
    checkOrgDataMutation.isError,
    checkOrgDataMutation.data,
    checkOrgDataMutation.error,
  ]);

  // Debounce the search inputs to prevent excessive API calls
  const debouncedNameInput = useDebounce(nameInputValue, 300);
  const debouncedOrgInput = useDebounce(orgInputValue, 300);

  // State to track if a search has been performed
  const [hasSearched, setHasSearched] = useState(false);

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
      // Clear any previous errors and results
      setError(null);
      searchMutation.reset();
      checkOrgDataMutation.reset();
      setSearchResults([]);
      setHasSearched(true);

      // CASE 1: If organization is selected, check data exists before navigating
      if (selectedOrg?.guid) {
        // Build query parameters for other fields if they have values
        const queryParams = new URLSearchParams();

        if (selectedName?.guid) {
          queryParams.append('name', selectedName.guid);
        }

        if (stateValue?.guid) {
          queryParams.append('state', stateValue.guid);
        }

        // Check if selected org has data before navigating
        checkOrgDataMutation.mutate({
          orgId: selectedOrg.guid,
          queryParams,
        });

        return;
      }

      // CASE 2: If customer is not selected, use onSearch callback or default to search mutation
      const criteria: ProviderSearchCriteria = {};

      // Add name/specialty if available
      if (
        selectedName?.guid &&
        selectedName.type.toLowerCase() === 'practitioner'
      ) {
        criteria.name = selectedName.guid;
      }

      if (
        selectedName?.guid &&
        selectedName.type.toLowerCase() === 'specialty'
      ) {
        criteria.specialty = selectedName.guid;
      }

      // Add state if available
      if (stateValue?.guid) {
        criteria.location = stateValue.guid;
      }

      // Only proceed if we have at least one parameter
      if (Object.keys(criteria).length === 0) {
        setError(new Error('Please provide at least one search parameter'));
        return;
      }

      // Use the provided onSearch callback or fall back to the existing behavior
      if (onSearch) {
        onSearch(criteria);
      } else {
        // Legacy implementation (temporary until all code is migrated)
        const requestData: Record<string, string> = {};
        if (criteria.name) requestData.nameGuid = criteria.name;
        if (criteria.specialty) requestData.specialtyGuid = criteria.specialty;
        if (criteria.location) requestData.stateGuid = criteria.location;

        searchMutation.mutate(requestData);
      }
    },
  });

  // Fetch name/specialty suggestions using the hook
  const { data: nameSuggestions, isLoading: nameSuggestionsLoading } =
    useNameSuggestions(nameSuggestionsUseCase, debouncedNameInput);

  // Fetch organization suggestions using the hook
  const { data: orgSuggestions, isLoading: orgSuggestionsLoading } =
    useOrganizationSuggestions(orgSuggestionsUseCase, debouncedOrgInput);

  // Fetch states using the hook
  const { data: statesData, isLoading: statesLoading } =
    useStates(statesUseCase);

  // Update the name options when suggestions are received
  useEffect(() => {
    if (nameSuggestions) {
      // Transform the API response to include name and guid
      const providers = Array.isArray(nameSuggestions)
        ? nameSuggestions.map((provider) => ({
            name: provider.name || '',
            guid: provider.id || '',
            type: provider.type || '',
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
            type: org.type || '',
          }))
        : [];

      // Filter out items with empty names or guids
      const validOrgs = organizations.filter(
        (org) => org.name.trim() !== '' && org.guid
      );

      setOrgOptions(validOrgs);
    }
  }, [orgSuggestions]);

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
        <Box className="my-18 mx-auto p-8 max-w-6xl">
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
                          setHasSearched(false);
                          if (typeof newValue === 'string') {
                            // Handle free text input
                            // Don't set a guid for free text input
                            setSelectedName({
                              name: newValue,
                              guid: '',
                              type: '',
                            });
                          } else if (newValue) {
                            // Handle selection from dropdown with proper guid
                            setSelectedName(newValue);
                          } else {
                            // Handle clearing the selection
                            setSelectedName(null);
                            // Reset search state if all fields are empty
                            setTimeout(resetSearchState, 0);
                          }

                          // Update the form field with just the name
                          field.handleChange(
                            typeof newValue === 'string'
                              ? newValue
                              : newValue?.name || ''
                          );
                        }}
                        getOptionLabel={(option: {
                          name: string;
                          guid: string;
                          type: string;
                        }) => {
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
                        loadingText="Loading practitioners..."
                        noOptionsText="No practitioners found"
                        className="flex-1"
                        renderOption={(props, option) => (
                          <li {...props} key={option.guid}>
                            <Box className="flex justify-between w-full">
                              <Box>{option.name}</Box>
                              <Chip
                                variant="outlined"
                                size="small"
                                label={
                                  option.type.toLowerCase() === 'practitioner'
                                    ? 'Practitioner'
                                    : 'Specialty'
                                }
                                className="text-neutral-500"
                              />
                            </Box>
                          </li>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Name or Specialty"
                            placeholder='e.g. "John Doe" or "Cardiology"'
                            variant="outlined"
                            className="bg-white rounded-sm"
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
                          // When a selection changes, we should consider the search state invalid
                          setHasSearched(false);

                          setStateValue(newValue);
                          field.handleChange(newValue?.id || '');

                          // Handle clearing the selection
                          if (!newValue) {
                            setSearchResults([]);
                            setError(null);
                            // Check if all fields are now empty
                            if (!selectedName?.guid && !selectedOrg?.guid) {
                              setHasSearched(false);
                            }
                          }
                        }}
                        inputValue={stateInputValue}
                        onInputChange={(event, newInputValue) => {
                          setHasSearched(false);
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
                            className="bg-white rounded-sm"
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
                          // When a selection changes, we should consider the search state invalid
                          setHasSearched(false);

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
                            // Reset search results immediately when clearing a field
                            setSearchResults([]);
                            setError(null);
                            // Check if all fields are now empty
                            if (!selectedName?.guid && !stateValue?.guid) {
                              setHasSearched(false);
                            }
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
                            label="Customer"
                            placeholder='e.g. "Centene"'
                            variant="outlined"
                            className="bg-white rounded-sm"
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
                disabled={
                  searchMutation.isPending || checkOrgDataMutation.isPending
                }
                className="rounded-l-none rounded-r-md p-4 bg-neutral-400 text-white text-xl hover:bg-neutral-800"
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </form>
        </Box>

        {/* Display search results */}
        <Box className="mx-auto p-8 max-w-6xl">
          <Box className="mb-8 p-8 min-h-[190px] bg-white border rounded-lg flex flex-col">
            {/* Apply priority-based rendering to ensure only one state is shown */}
            {(() => {
              // Priority 1: Loading state
              if (searchMutation.isPending || checkingOrgData) {
                return (
                  <div className="mt-8 rounded-lg p-4 text-center justify-self-center">
                    <p>Searching... Please wait.</p>
                  </div>
                );
              }

              // Priority 2: Initial state (no search performed)
              if (!hasSearched) {
                return (
                  <div className="mt-8 rounded-lg p-4 text-center text-neutral-500 justify-self-center">
                    <p>Search above to find customers.</p>
                  </div>
                );
              }

              // Priority 3: Results state
              if (
                searchResults.length > 0 &&
                !error &&
                !searchMutation.error &&
                !checkOrgDataMutation.error
              ) {
                return (
                  <>
                    <h2 className="text-xl font-bold">Results</h2>
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {searchResults.map((result, index) => (
                        <Link
                          key={result.id || index}
                          to={`/organization/${result.id}/map`}
                        >
                          <div className="p-4 bg-neutral-100 rounded text-center hover:bg-neutral-200 transition-colors">
                            <h3 className="font-semibold">{result.name}</h3>
                            {result.specialty && (
                              <p>Specialty: {result.specialty}</p>
                            )}
                            {result.organization && (
                              <p>Organization: {result.organization}</p>
                            )}
                            {result.address && <p>Address: {result.address}</p>}
                            {result.phone && <p>Phone: {result.phone}</p>}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                );
              }

              // Priority 4: Error state
              if (error || searchMutation.error || checkOrgDataMutation.error) {
                return (
                  <div className="mt-8 rounded-lg p-4 text-center bg-neutral-100 justify-self-center">
                    <p>
                      No data available. Please try different search criteria.
                    </p>
                  </div>
                );
              }

              // Priority 5: No results state
              if (searchResults.length === 0) {
                return (
                  <div className="mt-8 rounded-lg p-4 text-center bg-neutral-100 justify-self-center">
                    <p>
                      No results found. Please try different search criteria.
                    </p>
                  </div>
                );
              }

              // Default state (should never happen, but just in case)
              return null;
            })()}
          </Box>
        </Box>
      </Suspense>
    </>
  );
}
