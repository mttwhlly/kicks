import React, { Suspense } from 'react';
import {
  Autocomplete as MuiAutocomplete,
  Box as MuiBox,
  Button as MuiButton,
  TextField as MuiTextField,
} from '@mui/material';
import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { usStates } from '~/constants/constants';
import VirtualizedTable from '~/components/VirtualizedTable/VirtualizedTable';
import { z } from 'zod';
import type { USStateType } from '~/types/usStates';

const { fieldContext, formContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    MuiTextField,
    MuiAutocomplete,
  },
  formComponents: {
    MuiButton,
  },
  fieldContext,
  formContext,
});

export default function Home() {
  const form = useAppForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      city: '',
      state: '',
    },
    validators: {
      onChange: z.object({
        firstName: z
          .string()
          .min(3, 'First name must be at least 3 characters'),
        lastName: z.string().min(3),
        city: z.string().min(3),
        state: z.string(),
      }),
    },
    onSubmit: ({ value }) => {
      alert(JSON.stringify(value, null, 2));
    },
  });

  // Fix the state types to match the Autocomplete options
  const [stateValue, setStateValue] = React.useState<USStateType | null>(null);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MuiBox className="mt-8 p-4 flex flex-col gap-4 max-w-3xl mx-auto border border-gray-200 rounded-md">
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
            form.handleSubmit();
          }}
        >
          <MuiBox className="flex gap-4 mb-4">
            <MuiBox className="flex flex-col flex-1">
              <form.AppField
                name="firstName"
                children={(field) => {
                  return (
                    <>
                      <MuiTextField
                        label="First Name"
                        variant="standard"
                        className="flex-1"
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
            </MuiBox>
            <MuiBox className="flex flex-col flex-1">
              <form.AppField
                name="lastName"
                children={(field) => {
                  return (
                    <>
                      <MuiTextField
                        label="Last Name"
                        variant="standard"
                        className="flex-1"
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
            </MuiBox>
          </MuiBox>
          <MuiBox className="flex gap-4 mb-4">
            <form.AppField
              name="city"
              children={(field) => {
                return (
                  <MuiBox className="flex flex-col flex-1">
                    <MuiTextField
                      label="City"
                      variant="standard"
                      className="flex-1"
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
                  </MuiBox>
                );
              }}
            />
            <form.AppField
              name="state"
              children={(field) => {
                return (
                  <MuiBox className="flex flex-col flex-1">
                    <MuiAutocomplete
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
                        <MuiTextField
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
                  </MuiBox>
                );
              }}
            />
          </MuiBox>
          <MuiBox className="flex gap-4">
            <form.AppForm>
              <MuiButton type="submit" variant="contained" className="w-1/2">
                Submit
              </MuiButton>
              <MuiButton
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
              </MuiButton>
            </form.AppForm>
          </MuiBox>
        </form>
      </MuiBox>
      <MuiBox className="mt-8 p-4 flex flex-col gap-4 max-w-3xl mx-auto border border-gray-200 rounded-md">
        <h2 className="text-2xl font-bold">Search Results</h2>
        <VirtualizedTable />
      </MuiBox>
    </Suspense>
  );
}
