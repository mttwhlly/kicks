import React, { Suspense } from 'react';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { usStates } from '~/constants/constants';
import DynamicVirtualizedTable from '~/components/DynamicVirtualizedTable/DynamicVirtualizedTable';
import { z } from 'zod';
import type { USStateType } from '~/types/usStates';
import { useAppForm } from '~/hooks/use-form';
import { useMutation } from '@tanstack/react-query';

export default function Profile() {
  const form = useAppForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      city: '',
      state: '',
    },
    validators: {
      onChange: z.object({
        firstName: z.string(),
        lastName: z.string(),
        city: z.string(),
        state: z.string(),
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

  // const renderResults = () => {
  //   if (isLoading) {
  //     return <div className="text-center py-4">Loading results...</div>;
  //   }

  //   if (error) {
  //     return (
  //       <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
  //         <p className="font-medium">Request failed</p>
  //         <p>{error}</p>
  //         <p className="text-sm mt-2">
  //           If this is a CORS issue, you may need to:
  //           <ul className="list-disc pl-5 mt-1">
  //             <li>Ensure the API allows requests from your domain</li>
  //             <li>Use a proxy server to make the request</li>
  //             <li>Contact the API administrator to enable CORS</li>
  //           </ul>
  //         </p>
  //       </div>
  //     );
  //   }

  //   if (responseData) {
  //     const hasResults = Array.isArray(responseData) && responseData.length > 0;

  //     if (!hasResults) {
  //       return (
  //         <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
  //           <p>
  //             No results found for your search criteria. Please try different
  //             search terms.
  //           </p>
  //         </div>
  //       );
  //     }

  //     // Render the results table
  //     return (
  //       <div>
  //         <div className="mb-4">
  //           <p className="text-gray-700">Found {responseData.length} results</p>
  //         </div>

  //         {/* <VirtualizedTable data={responseData.results} /> */}

  //         {/* Debug section for development */}
  //         <details className="mt-6 border-t pt-4">
  //           <summary className="cursor-pointer text-gray-500">
  //             Debug: Raw Response Data
  //           </summary>
  //           <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-96">
  //             {JSON.stringify(responseData, null, 2)}
  //           </pre>
  //         </details>
  //       </div>
  //     );
  //   }

  //   return (
  //     <div className="text-gray-500 text-center py-8">
  //       Enter search criteria and submit to see results
  //     </div>
  //   );
  // };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Box className="mt-8 p-4 flex flex-col gap-4 max-w-3xl mx-auto border border-gray-200 rounded-md">
        <h1 className="text-3xl font-bold">Provider Search</h1>
        <p>
          Search for a US healthcare provider on the{' '}
          <a
            className="underline"
            href="https://npiregistry.cms.hhs.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            NPPES NPI Registry
          </a>
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <Box className="flex gap-4 mb-4">
            <Box className="flex flex-col flex-1">
              <form.AppField
                name="firstName"
                children={(field) => {
                  return (
                    <>
                      <TextField
                        label="First Name"
                        variant="standard"
                        className="flex-1 capitalize"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
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
                    </>
                  );
                }}
              />
            </Box>
            <Box className="flex flex-col flex-1">
              <form.AppField
                name="lastName"
                children={(field) => {
                  return (
                    <>
                      <TextField
                        label="Last Name"
                        variant="standard"
                        className="flex-1 capitalize"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
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
                        required
                      />
                    </>
                  );
                }}
              />
            </Box>
          </Box>
          <Box className="flex gap-4 mb-4">
            <form.AppField
              name="city"
              children={(field) => {
                return (
                  <Box className="flex flex-col flex-1">
                    <TextField
                      label="City"
                      variant="standard"
                      className="flex-1 capitalize"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
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
            <form.AppField
              name="state"
              children={(field) => {
                return (
                  <Box className="flex flex-col flex-1">
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
                          label="State"
                          variant="standard"
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
          </Box>
          <Box className="flex gap-4">
            <Button
              type="submit"
              variant="contained"
              className="w-1/2"
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
            <Button
              type="reset"
              variant="outlined"
              onClick={() => {
                form.reset();
                setStateValue(null);
                setInputValue('');
                setResponseData([{}]);
                setError(null);
              }}
              className="w-1/2"
              disabled={isLoading}
            >
              Reset
            </Button>
          </Box>
        </form>
      </Box>
      <Box className="mt-8 p-4 flex flex-col gap-4 max-w-3xl mx-auto border border-gray-200 rounded-md">
        <h2 className="text-2xl font-bold">Search Results</h2>
        {/* {renderResults()} */}
        <DynamicVirtualizedTable data={responseData} />
      </Box>
    </Suspense>
  );
}
