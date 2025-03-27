// src/presentation/components/forms/UserForm.tsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { 
  TextField, 
  Button, 
  Box, 
  Stack, 
  FormControl, 
  FormHelperText,
  MenuItem,
  Select
} from '@mui/material';
import { User } from '../../../domain/entities/user';

interface UserFormProps {
  initialData?: Partial<User>;
  onSubmit: (data: Partial<User>) => void;
  isSubmitting?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({ 
  initialData = {}, 
  onSubmit,
  isSubmitting = false
}) => {
  const { 
    control, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<Partial<User>>({
    defaultValues: initialData
  });

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-lg"
    >
      <Stack spacing={3}>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            <FormControl error={!!errors.name}>
              <TextField
                {...field}
                label="Name"
                variant="outlined"
                fullWidth
                error={!!errors.name}
              />
              {errors.name && (
                <FormHelperText>{errors.name.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{ 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          }}
          render={({ field }) => (
            <FormControl error={!!errors.email}>
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                fullWidth
                error={!!errors.email}
              />
              {errors.email && (
                <FormHelperText>{errors.email.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          name="role"
          control={control}
          rules={{ required: 'Role is required' }}
          render={({ field }) => (
            <FormControl error={!!errors.role}>
              <Select
                {...field}
                displayEmpty
                fullWidth
              >
                <MenuItem value="">Select Role</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="editor">Editor</MenuItem>
                <MenuItem value="viewer">Viewer</MenuItem>
              </Select>
              {errors.role && (
                <FormHelperText>{errors.role.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          disabled={isSubmitting}
          className="mt-4"
        >
          {isSubmitting ? 'Saving...' : 'Save User'}
        </Button>
      </Stack>
    </Box>
  );
};