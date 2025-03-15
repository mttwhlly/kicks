import React, { Suspense } from 'react';
import { Autocomplete, Box, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { usStates } from '~/constants/constants';
import { z } from 'zod';
import type { USStateType } from '~/types/usStates';
import { useAppForm } from '~/hooks/use-form';
import { useMutation } from '@tanstack/react-query';

export default function Search() {
  const form = useAppForm({
    defaultValues: {
      search: '',
      location: '',
      insurance: '',
    },
    validators: {
      onChange: z.object({
        search: z.string(),
        location: z.string(),
        insurance: z.string(),
      }),
    },
    onSubmit: ({ value }) => {
      mutation.mutateAsync(value);
    },
  });

  const [responseData, setResponseData] = React.useState([{}]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [stateValue, setStateValue] = React.useState<USStateType | null>(null);
  const [inputValue, setInputValue] = React.useState('');

  const mutation = useMutation({
    mutationFn: async (value: {
      firstName: string;
      lastName: string;
      city: string;
      state: string;
    }) => {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (value.firstName) params.append('firstName', value.firstName);
        if (value.lastName) params.append('lastName', value.lastName);
        if (value.city) params.append('city', value.city);
        if (value.state) params.append('state', value.state);

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

        const data = await response.json();

        setResponseData(data);
        return data;
      } catch (err) {
        if (err instanceof TypeError && err.message.includes('NetworkError')) {
          setError(
            'Network error: This might be due to CORS restrictions. Please check the console for more details.'
          );
        } else {
          setError(
            `Error: ${
              err instanceof Error ? err.message : 'Unknown error occurred'
            }`
          );
        }
        console.error('API request failed:', err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: (data) => {
      console.log('Submission successful:', data);
    },
    onError: (error) => {
      console.error('Submission error:', error);
    },
  });

  return (
    <>
      <Box className="text-center gap-4 mt-12 mb-8 flex flex-col">
        <h1 className="text-2xl font-bold">Find providers in your network</h1>
        <h2 className="text-md">Verified Provider & Facility Data</h2>
      </Box>
      <Suspense fallback={<p>Loading...</p>}>
        <Box className="p-4 gap-4 max-w-3xl mx-auto ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <Box className="flex">
              <form.AppField
                name="search"
                children={(field) => {
                  return (
                    <Box className="flex flex-1">
                      <Autocomplete
                        disablePortal
                        value={stateValue}
                        onChange={(event, newValue) => {
                          setStateValue(newValue);
                          // Update the form field with the state code
                          field.handleChange(newValue?.id || '');
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                          setInputValue(newInputValue);
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
                            label="Search"
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
              <form.AppField
                name="location"
                children={(field) => {
                  return (
                    <Box className="flex flex-1">
                      <Autocomplete
                        disablePortal
                        value={stateValue}
                        onChange={(event, newValue) => {
                          setStateValue(newValue);
                          // Update the form field with the state code
                          field.handleChange(newValue?.id || '');
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                          setInputValue(newInputValue);
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
                            label="Location"
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
              <form.AppField
                name="insurance"
                children={(field) => {
                  return (
                    <Box className="flex flex-1">
                      <Autocomplete
                        disablePortal
                        value={stateValue}
                        onChange={(event, newValue) => {
                          setStateValue(newValue);
                          // Update the form field with the state code
                          field.handleChange(newValue?.id || '');
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                          setInputValue(newInputValue);
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
                            label="Insurance"
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

              <IconButton
                type="submit"
                disabled={isLoading}
                className="rounded-none p-4 bg-neutral-400 text-white text-xl"
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </form>
        </Box>
      </Suspense>
    </>
  );
}
