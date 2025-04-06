import { Suspense } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router';
import { 
  Box, 
  Breadcrumbs, 
  Chip, 
  CircularProgress, 
  Divider, 
  Grid, 
  Paper, 
  Typography 
} from '@mui/material';
import { ArrowBackIos as ArrowBackIcon } from '@mui/icons-material';
import { ProfilePageSkeleton } from '../components/ui/Skeletons';
import { Provider } from '../../core/domain/provider';

// Mock data for demo purposes
// In a real app, this would come from an API call
const mockProvider: Provider = {
  id: '123',
  name: 'Dr. Sarah Johnson',
  specialty: 'Cardiology',
  address: {
    street: '123 Medical Center Dr',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060
    }
  },
  phone: '(555) 123-4567',
  email: 'sarah.johnson@example.com',
  npi: '1234567890',
  networks: ['Blue Cross', 'Aetna', 'Cigna'],
  languages: ['English', 'Spanish'],
  acceptingNewPatients: true,
  verificationStatus: 'verified'
};

/**
 * Provider profile page component
 */
export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, this would use a query hook to fetch the provider data
  const provider = mockProvider;
  const isLoading = false;
  const error = null;

  if (isLoading) {
    return (
      <Box className="flex justify-center my-12">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !provider) {
    return (
      <Box className="text-center my-12">
        <Typography color="error">
          Provider not found or error loading data.
        </Typography>
        <Link to="/" className="block mt-4 text-primary-600">
          Return to Home
        </Link>
      </Box>
    );
  }

  return (
    <Suspense fallback={<ProfilePageSkeleton />}>
      <Box className="max-w-4xl mx-auto p-4 pt-[100px]">
        <Breadcrumbs aria-label="breadcrumb" className="mb-4">
          <Link to="/" className="text-gray-600 hover:underline flex items-center">
            <ArrowBackIcon fontSize="small" className="mr-1" />
            Home
          </Link>
          <Typography color="text.primary">Provider Profile</Typography>
        </Breadcrumbs>
        
        <Box className="flex items-center mb-4">
          <Typography variant="h4" component="h1" className="font-bold">
            {provider.name}
          </Typography>
          
          {provider.verificationStatus === 'verified' && (
            <Chip 
              label="Verified" 
              color="success" 
              variant="outlined" 
              size="small"
              className="ml-3"
            />
          )}
        </Box>
        
        <Typography variant="h6" color="text.secondary" className="mb-6">
          {provider.specialty}
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper className="p-4">
              <Typography variant="h6" className="mb-3">
                Contact Information
              </Typography>
              
              <Box className="mb-2">
                <Typography variant="subtitle2">Address</Typography>
                <Typography>
                  {provider.address?.street}<br />
                  {provider.address?.city}, {provider.address?.state} {provider.address?.zipCode}
                </Typography>
              </Box>
              
              <Box className="mb-2">
                <Typography variant="subtitle2">Phone</Typography>
                <Typography>{provider.phone}</Typography>
              </Box>
              
              <Box className="mb-2">
                <Typography variant="subtitle2">Email</Typography>
                <Typography>{provider.email}</Typography>
              </Box>
            </Paper>
            
            <Paper className="p-4 mt-4">
              <Typography variant="h6" className="mb-3">
                Professional Information
              </Typography>
              
              <Box className="mb-2">
                <Typography variant="subtitle2">NPI Number</Typography>
                <Typography>{provider.npi}</Typography>
              </Box>
              
              <Box className="mb-2">
                <Typography variant="subtitle2">Languages</Typography>
                <Box className="flex flex-wrap gap-1 mt-1">
                  {provider.languages?.map((language, index) => (
                    <Chip 
                      key={index} 
                      label={language} 
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper className="p-4">
              <Typography variant="h6" className="mb-3">
                Network Participation
              </Typography>
              
              <Box className="flex flex-wrap gap-1 mb-4">
                {provider.networks?.map((network, index) => (
                  <Chip 
                    key={index} 
                    label={network} 
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Box>
              
              <Divider className="my-3" />
              
              <Box className="mt-4">
                <Typography variant="subtitle2" className="font-bold">
                  Accepting New Patients
                </Typography>
                <Typography>
                  {provider.acceptingNewPatients ? 'Yes' : 'No'}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Suspense>
  );
}