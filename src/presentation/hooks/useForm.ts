import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from './useFormContext';
import { Autocomplete, Button, TextField } from '@mui/material';

const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
    Autocomplete,
  },
  formComponents: {
    Button,
  },
  fieldContext,
  formContext,
});

export { useAppForm, withForm };
