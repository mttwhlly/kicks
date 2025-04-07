import { useRouteError, isRouteErrorResponse } from 'react-router';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router';

export default function OrganizationErrorBoundary() {
  const error = useRouteError();
  
  let title = 'An error occurred';
  let message = 'Sorry, something went wrong while loading the organization data.';
  let errorCode = 500;
  
  // Handle different error types
  if (isRouteErrorResponse(error)) {
    errorCode = error.status;
    
    if (error.status === 404) {
      title = 'Organization not found';
      message = 'We couldn\'t find the organization you were looking for.';
    } else if (error.status === 400) {
      title = 'Invalid request';
      message = 'The organization ID provided is invalid.';
    } else {
      title = `Error ${error.status}`;
      message = error.statusText || message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }
  
  return (
    <Box className="mt-24 max-w-6xl mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg mb-8">{message}</p>
      <p className="text-sm text-gray-500 mb-4">Error code: {errorCode}</p>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        className="mt-4"
      >
        Return to home
      </Button>
    </Box>
  );
}