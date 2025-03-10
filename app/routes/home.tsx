import { Suspense } from 'react';
import type { Route } from './+types/home';
import {
  Autocomplete as MuiAutocomplete,
  Box as MuiBox,
  Button as MuiButton,
  TextField as MuiTextField,
} from '@mui/material';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { AnyFieldApi } from '@tanstack/react-form';
import { usStates } from '~/constants/constants';
import VirtualizedTable from '~/components/VirtualizedTable/VirtualizedTable';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'React Router Starter' },
    {
      name: 'description',
      content:
        'React + TypeScript + Vite + Tanstack Router/Query/Form + Material UI + Tailwind CSS',
    },
  ];
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
}

class DB {
  private data: { firstName: string; lastName: string };

  constructor() {
    this.data = { firstName: 'FirstName', lastName: 'LastName' };
  }

  getData(): { firstName: string; lastName: string } {
    return { ...this.data };
  }

  async saveUser(value: { firstName: string; lastName: string }) {
    this.data = value;
    return value;
  }
}

// Dummy Database to emulate server-side actions
const db = new DB();

export default function Home() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return db.getData();
    },
  });

  const saveUserMutation = useMutation({
    mutationFn: async (value: { firstName: string; lastName: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      db.saveUser(value);
    },
  });

  const form = useForm({
    defaultValues: {
      firstName: data?.firstName ?? '',
      lastName: data?.lastName ?? '',
      city: '',
      state: '',
    },
    onSubmit: async ({ formApi, value }) => {
      // Do something with form data
      await saveUserMutation.mutateAsync(value);

      // Invalidating query to recheck fresh data
      await refetch();

      // Reset the form to start-over with a clean state
      formApi.reset();
    },
  });

  if (isLoading) return <p>Loading..</p>;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MuiBox
        component="form"
        noValidate
        autoComplete="off"
        className="mt-8 p-4 flex flex-col gap-4 max-w-3xl mx-auto border border-gray-200 rounded-md"
      >
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
          <MuiBox className="flex gap-4">
            <form.Field
              name="firstName"
              validators={{
                onChange: ({ value }) =>
                  value.length < 3
                    ? 'First name must be at least 3 characters'
                    : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return (
                    value.includes('error') &&
                    'No "error" allowed in first name'
                  );
                },
              }}
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
                    />
                    <FieldInfo field={field} />
                  </>
                );
              }}
            />
            <form.Field
              name="lastName"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'A last name is required'
                    : value.length < 3
                    ? 'Last name must be at least 3 characters'
                    : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return (
                    value.includes('error') &&
                    'No "error" allowed in first name'
                  );
                },
              }}
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
                      required
                    />
                    <FieldInfo field={field} />
                  </>
                );
              }}
            />
          </MuiBox>
          <MuiBox className="flex gap-4">
            <form.Field
              name="city"
              validators={{
                onChange: ({ value }) =>
                  value.length < 3
                    ? 'City must be at least 3 characters'
                    : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return (
                    value.includes('error') && 'No "error" allowed in city'
                  );
                },
              }}
              children={(field) => {
                return (
                  <>
                    <MuiTextField
                      label="City"
                      variant="standard"
                      className="flex-1"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                  </>
                );
              }}
            />
            <form.Field
              name="state"
              validators={{
                onChange: ({ value }) =>
                  value.length < 3
                    ? 'State must be at least 3 characters'
                    : undefined,
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return (
                    value.includes('error') && 'No "error" allowed in state'
                  );
                },
              }}
              children={(field) => {
                return (
                  <>
                    <MuiAutocomplete
                      disablePortal
                      options={usStates}
                      className="flex-1"
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          label="State"
                          variant="standard"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    />
                    <FieldInfo field={field} />
                  </>
                );
              }}
            />
          </MuiBox>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <>
                <MuiButton
                  type="submit"
                  variant="contained"
                  disabled={!canSubmit}
                >
                  {isSubmitting ? '...' : 'Submit'}
                </MuiButton>
                <MuiButton
                  type="reset"
                  variant="outlined"
                  onClick={() => form.reset()}
                >
                  Reset
                </MuiButton>
              </>
            )}
          />
        </form>
      </MuiBox>
      <MuiBox className="mt-8 p-4 flex flex-col gap-4 max-w-3xl mx-auto border border-gray-200 rounded-md">
        <h2 className="text-2xl font-bold">Search Results</h2>
        <p>Provider search results will appear here</p>
        <VirtualizedTable />
      </MuiBox>
    </Suspense>
  );
}
