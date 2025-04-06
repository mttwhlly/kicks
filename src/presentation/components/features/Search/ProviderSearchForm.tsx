import { useState } from 'react';
import { 
  Autocomplete, 
  Grid, 
  TextField,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { Button } from '../../ui/Button';
import { ProviderSearchCriteria } from '../../../../core/repositories/providerRepository';
import { useDebounce } from '../../../hooks/useDebounce';

// This would come from the API or be defined elsewhere
const SPECIALTIES = [
  'Primary Care', 
  'Cardiology', 
  'Dermatology', 
  'Neurology', 
  'Pediatrics', 
  'Psychiatry'
];

interface ProviderSearchFormProps {
  onSearch: (criteria: ProviderSearchCriteria) => void;
  isLoading?: boolean;
}

/**
 * Provider search form component
 */
export const ProviderSearchForm = ({ 
  onSearch, 
  isLoading = false 
}: ProviderSearchFormProps) => {
  const [criteria, setCriteria] = useState<ProviderSearchCriteria>({
    specialty: '',
    location: '',
    acceptingNewPatients: false
  });
  
  // Debounce location changes to avoid too many API calls if this triggers suggestions
  const debouncedLocation = useDebounce(criteria.location, 300);

  const handleInputChange = (field: keyof ProviderSearchCriteria, value: string | boolean) => {
    setCriteria(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(criteria);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Autocomplete
            id="specialty"
            options={SPECIALTIES}
            freeSolo
            value={criteria.specialty || null}
            onChange={(_, newValue) => 
              handleInputChange('specialty', newValue || '')
            }
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Specialty" 
                variant="outlined" 
                placeholder="e.g. Cardiology"
                fullWidth
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} md={5}>
          <TextField
            id="location"
            label="Location"
            variant="outlined"
            placeholder="City, State or ZIP"
            fullWidth
            value={criteria.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
          />
        </Grid>
        
        <Grid item xs={12} md={2}>
          <Button 
            type="submit"
            variant="primary"
            disabled={isLoading}
            fullWidth
            className="h-14"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </Grid>
        
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={criteria.acceptingNewPatients || false}
                onChange={(e) => 
                  handleInputChange('acceptingNewPatients', e.target.checked)
                }
              />
            }
            label="Accepting new patients"
          />
        </Grid>
      </Grid>
    </form>
  );
};