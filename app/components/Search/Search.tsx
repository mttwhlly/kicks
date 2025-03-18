import React, { Suspense, useState, useEffect } from 'react';
import {
  Autocomplete,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { usStates } from '~/constants/constants';
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

export default function Search() {
  // Form state for each field
  const [firstName, setFirstName] = useState('');
  const [stateValue, setStateValue] = useState<USStateType | null>(null);
  const [stateInputValue, setStateInputValue] = useState('');
  const [organization, setOrganization] = useState('');
  const [orgInputValue, setOrgInputValue] = useState('');

  // Debounce the search inputs to prevent excessive API calls
  const debouncedName = useDebounce(firstName, 500);
  const debouncedState = useDebounce(stateValue?.id, 500);
  const debouncedOrg = useDebounce(organization, 500);

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
      // This is still useful for the manual search button
      mutation.mutateAsync({
        firstName: value.firstName,
        state: value.state,
        participatingorganization: value.participatingorganization,
      });
    },
  });

  // Create a search params object for React Query
  const searchParams = {
    firstName: debouncedName,
    state: debouncedState || '',
    participatingorganization: debouncedOrg,
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
        <Box className="p-4 gap-4 max-w-4xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <Box className="flex">
              {/* Name or Specialty Field */}
              <form.AppField
                name="firstName"
                children={(field) => {
                  return (
                    <Box className="flex flex-1">
                      <TextField
                        label="Name or Specialty"
                        placeholder='e.g. "John Doe" or "Cardiology"'
                        variant="outlined"
                        fullWidth
                        id={field.name}
                        name={field.name}
                        value={firstName}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFirstName(value);
                          field.handleChange(value);
                        }}
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
                        options={usStates}
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

              {/* Organization Field */}
              <form.AppField
                name="participatingorganization"
                children={(field) => {
                  return (
                    <Box className="flex flex-1">
                      <TextField
                        label="Participating Organization"
                        placeholder='e.g. "Centene"'
                        variant="outlined"
                        fullWidth
                        id={field.name}
                        name={field.name}
                        value={organization}
                        onChange={(e) => {
                          const value = e.target.value;
                          setOrganization(value);
                          field.handleChange(value);
                        }}
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
