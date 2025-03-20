import React, { Suspense, useState, useEffect } from 'react';
import {
  Autocomplete,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { usStates } from '~/constants/constants';
import { z } from 'zod';
import type { USStateType } from '~/types/usStates';
import { useAppForm } from '~/hooks/use-form';
import useDebounce from '~/hooks/use-debounce';

// Filter props interface
interface FilterProps {
  onFilterChange: (filters: FilterCriteria) => void;
}

// Define filter criteria interface
export interface FilterCriteria {
  name: string;
  city: string;
  state: string;
  specialty: string;
  providerType: string;
  acceptingNewPatients: boolean;
  includeInactive: boolean;
}

export default function Filter({ onFilterChange }: FilterProps) {
  // Form state for each field
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [stateValue, setStateValue] = useState<USStateType | null>(null);
  const [stateInputValue, setStateInputValue] = useState('');
  const [specialty, setSpecialty] = useState<string>('');
  const [specialtyInput, setSpecialtyInput] = useState('');
  const [providerType, setProviderType] = useState<string>('');
  const [providerTypeInput, setProviderTypeInput] = useState('');
  const [acceptingNewPatients, setAcceptingNewPatients] = useState(false);
  const [includeInactive, setIncludeInactive] = useState(false);

  // Debounce the filter inputs
  const debouncedName = useDebounce(name, 500);
  const debouncedCity = useDebounce(city, 500);
  const debouncedState = useDebounce(stateValue?.id, 500);
  const debouncedSpecialty = useDebounce(specialty, 500);
  const debouncedProviderType = useDebounce(providerType, 500);
  const debouncedAcceptingNewPatients = useDebounce(acceptingNewPatients, 500);
  const debouncedIncludeInactive = useDebounce(includeInactive, 500);

  // Sample specialty options - replace with actual data
  const specialtyOptions = [
    { id: 'cardiology', label: 'Cardiology' },
    { id: 'dermatology', label: 'Dermatology' },
    { id: 'neurology', label: 'Neurology' },
    { id: 'orthopedics', label: 'Orthopedic Surgery' },
    { id: 'pediatrics', label: 'Pediatrics' },
    { id: 'psychiatry', label: 'Psychiatry' },
    { id: 'gynecology', label: 'Gynecology' },
  ];

  // Sample provider type options - replace with actual data
  const providerTypeOptions = [
    { id: 'individual', label: 'Individual' },
    { id: 'group', label: 'Group' },
    { id: 'facility', label: 'Facility' },
  ];

  // Initialize form
  const form = useAppForm({
    defaultValues: {
      name: '',
      city: '',
      state: '',
      specialty: '',
      providerType: '',
    },
    validators: {
      onChange: z.object({
        name: z.string(),
        city: z.string(),
        state: z.string(),
        specialty: z.string(),
        providerType: z.string(),
      }),
    },
    onSubmit: () => {
      // Form submission is not needed as we're using debounced values
    },
  });

  // Effect to trigger filter updates when debounced values change
  useEffect(() => {
    const filters: FilterCriteria = {
      name: debouncedName,
      city: debouncedCity,
      state: debouncedState || '',
      specialty: debouncedSpecialty,
      providerType: debouncedProviderType,
      acceptingNewPatients: debouncedAcceptingNewPatients,
      includeInactive: debouncedIncludeInactive,
    };

    onFilterChange(filters);
  }, [
    debouncedName,
    debouncedCity,
    debouncedState,
    debouncedSpecialty,
    debouncedProviderType,
    debouncedAcceptingNewPatients,
    debouncedIncludeInactive,
    onFilterChange,
  ]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="max-w-7xl mx-auto p-4 pt-0 mb-4 sticky top-0 z-[1001] bg-white border border-gray-200 rounded-lg shadow-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <Box className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <TuneIcon /> Filter
            </h3>
            <Box className="flex justify-end">
              <FormGroup aria-label="position" className="justify-end" row>
                <FormControlLabel
                  value="bottom"
                  control={
                    <Checkbox
                      checked={acceptingNewPatients}
                      onChange={(e) =>
                        setAcceptingNewPatients(e.target.checked)
                      }
                    />
                  }
                  label="Accepting new patients"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="end"
                  control={
                    <Checkbox
                      checked={includeInactive}
                      onChange={(e) => setIncludeInactive(e.target.checked)}
                    />
                  }
                  label="Include inactive locations"
                  labelPlacement="end"
                />
              </FormGroup>
            </Box>
          </Box>
          <Box className="flex gap-2 flex-wrap md:flex-nowrap">
            {/* Provider Name Field */}
            <form.AppField
              name="name"
              children={(field) => {
                return (
                  <Box className="flex flex-1 min-w-[200px]">
                    <TextField
                      label="Provider Name"
                      placeholder='e.g. "John Doe"'
                      variant="outlined"
                      size="small"
                      fullWidth
                      id={field.name}
                      name={field.name}
                      value={name}
                      onChange={(e) => {
                        const value = e.target.value;
                        setName(value);
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

            {/* City Field */}
            <form.AppField
              name="city"
              children={(field) => {
                return (
                  <Box className="flex flex-1 min-w-[200px]">
                    <TextField
                      label="City"
                      placeholder='e.g. "San Francisco"'
                      variant="outlined"
                      size="small"
                      fullWidth
                      id={field.name}
                      name={field.name}
                      value={city}
                      onChange={(e) => {
                        const value = e.target.value;
                        setCity(value);
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
                  <Box className="flex flex-1 min-w-[200px]">
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
                          placeholder='e.g. "California"'
                          variant="outlined"
                          size="small"
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

            {/* Specialty Field */}
            <form.AppField
              name="specialty"
              children={(field) => {
                return (
                  <Box className="flex flex-1 min-w-[200px]">
                    <Autocomplete
                      disablePortal
                      options={specialtyOptions}
                      value={
                        specialtyOptions.find((opt) => opt.id === specialty) ||
                        null
                      }
                      onChange={(event, newValue) => {
                        setSpecialty(newValue?.id || '');
                        field.handleChange(newValue?.id || '');
                      }}
                      inputValue={specialtyInput}
                      onInputChange={(event, newInputValue) => {
                        setSpecialtyInput(newInputValue);
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value?.id
                      }
                      getOptionLabel={(option) => option.label}
                      className="flex-1"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Specialty"
                          placeholder='e.g. "Cardiology"'
                          variant="outlined"
                          size="small"
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

            {/* Provider Type Field */}
            <form.AppField
              name="providerType"
              children={(field) => {
                return (
                  <Box className="flex flex-1 min-w-[200px]">
                    <Autocomplete
                      disablePortal
                      options={providerTypeOptions}
                      value={
                        providerTypeOptions.find(
                          (opt) => opt.id === providerType
                        ) || null
                      }
                      onChange={(event, newValue) => {
                        setProviderType(newValue?.id || '');
                        field.handleChange(newValue?.id || '');
                      }}
                      inputValue={providerTypeInput}
                      onInputChange={(event, newInputValue) => {
                        setProviderTypeInput(newInputValue);
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value?.id
                      }
                      getOptionLabel={(option) => option.label}
                      className="flex-1"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Provider Type"
                          placeholder='e.g. "Individual"'
                          variant="outlined"
                          size="small"
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
        </form>
      </div>
    </Suspense>
  );
}
