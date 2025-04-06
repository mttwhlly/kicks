import { Card, CardContent, Chip, Typography } from '@mui/material';
import { Link } from 'react-router';
import { Provider } from '../../../../core/domain/provider';

interface ProviderCardProps {
  provider: Provider;
  onClick?: () => void;
  isSelected?: boolean;
}

/**
 * Card component to display provider information
 */
export const ProviderCard = ({ provider, onClick, isSelected = false }: ProviderCardProps) => {
  return (
    <Card 
      onClick={onClick} 
      className={`mb-4 cursor-pointer transition-all ${
        isSelected ? 'border-2 border-primary-500' : 'hover:shadow-md'
      }`}
    >
      <CardContent>
        <div className="flex justify-between items-start">
          <Typography variant="h6" component="h2" className="font-bold">
            {provider.name}
          </Typography>
          
          {provider.verificationStatus === 'verified' && (
            <Chip 
              label="Verified" 
              size="small" 
              color="success" 
              variant="outlined" 
              className="ml-2"
            />
          )}
        </div>
        
        <Typography variant="body2" color="text.secondary" className="mt-1">
          {provider.specialty}
        </Typography>
        
        {provider.address && (
          <Typography variant="body2" className="mt-2">
            {provider.address.street}, {provider.address.city}, {provider.address.state} {provider.address.zipCode}
          </Typography>
        )}
        
        {provider.phone && (
          <Typography variant="body2" className="mt-1">
            {provider.phone}
          </Typography>
        )}
        
        <div className="mt-3 flex flex-wrap gap-1">
          {provider.acceptingNewPatients && (
            <Chip 
              label="Accepting New Patients" 
              size="small" 
              color="primary" 
              className="mr-1"
            />
          )}
          
          {provider.networks?.map((network, index) => (
            <Chip 
              key={index} 
              label={network} 
              size="small" 
              variant="outlined" 
              className="mr-1"
            />
          ))}
        </div>
        
        <Link 
          to={`/profile/${provider.id}`}
          className="block mt-3 text-primary-600 hover:underline"
        >
          View Profile
        </Link>
      </CardContent>
    </Card>
  );
};