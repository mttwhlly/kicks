import { lazy } from 'react';
import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from '~/hooks/use-form-context';

const TextField = lazy(() => import('../components/TextField/TextField'));

const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
  },
  formComponents: {},
});

export { useAppForm, withForm };
