import React, { Suspense } from 'react';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { usStates } from '~/constants/constants';
import VirtualizedTable from '~/components/VirtualizedTable/VirtualizedTable';
import { z } from 'zod';
import type { USStateType } from '~/types/usStates';
import { useAppForm } from '~/hooks/use-form';
import type { Route } from './+types/home';
import { useMutation } from '@tanstack/react-query';

export default function Home({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {
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
      mutation.mutate(value);
    },
  });

  const mutation = useMutation({
    mutationFn: async (value: {
      firstName: String;
      lastName: String;
      city: String;
      state: String;
    }) => {
      const response = await fetch(
        `https://occ8ko8kw44kckgk8sw8wk84.mttwhlly.cc/providers?firstName=${value.firstName}&lastName=${value.lastName}&city=${value.city}&state=${value.state}`,
        // `https://npiregistry.cms.hhs.gov/api/?number=&enumeration_type=&taxonomy_description=&name_purpose=&first_name=${value.firstName}&use_first_name_alias=&last_name=${value.lastName}&organization_name=&address_purpose=&city=${value.city}&state=${value.state}&postal_code=&country_code=&limit=&skip=&pretty=&version=2.1`,
        {
          method: 'GET',
          mode: 'no-cors', // no-cors added to avoid CORS error
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Handle successful submission
      console.log('Submission successful:', data);
      setSubmissionResult(data); // Store the result in state instead of navigating

      // Optionally reset the form
      form.reset();
    },
    onError: (error) => {
      // Handle submission error
      console.error('Submission error:', error);
    },
  });

  const [submissionResult, setSubmissionResult] = React.useState({
    firstName: '',
    lastName: '',
    city: '',
    state: '',
  });

  const [stateValue, setStateValue] = React.useState<USStateType | null>(null);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Box className="mt-8 p-4 flex flex-col gap-4 max-w-3xl mx-auto border border-gray-200 rounded-md">
        <h1 className="text-3xl font-bold">Provider Search</h1>
        <p>
          Search for a US healthcare provider on the{' '}
          <a className="underline" href="https://npiregistry.cms.hhs.gov/">
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
            <form.AppForm>
              <Button type="submit" variant="contained" className="w-1/2">
                {mutation.isPending ? 'Submitting...' : 'Submit'}
              </Button>
              <Button
                type="reset"
                variant="outlined"
                onClick={() => {
                  form.reset();
                  setStateValue(null);
                  setInputValue('');
                }}
                className="w-1/2"
              >
                Reset
              </Button>
            </form.AppForm>
          </Box>
        </form>
      </Box>
      <Box className="mt-8 p-4 flex flex-col gap-4 max-w-3xl mx-auto border border-gray-200 rounded-md">
        <h2 className="text-2xl font-bold">Search Results</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Field</th>
              <th className="border border-gray-300 p-2 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(submissionResult).map(([key, value]) => (
              <tr key={key}>
                <td className="border border-gray-300 p-2 font-medium">
                  {key}
                </td>
                <td className="border border-gray-300 p-2">
                  {typeof value === 'object'
                    ? JSON.stringify(value)
                    : String(value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <VirtualizedTable /> */}
      </Box>
    </Suspense>
  );
}
