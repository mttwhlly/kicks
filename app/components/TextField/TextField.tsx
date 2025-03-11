import { useFieldContext } from '~/hooks/use-form-context';
import { TextField as MuiTextField } from '@mui/material';

export default function TextField({ label }: { label: string }) {
  const field = useFieldContext<string>();

  return (
    <label>
      <MuiTextField
        label={label}
        variant="standard"
        className="flex-1"
        id={field.name}
        name={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </label>
  );
}
