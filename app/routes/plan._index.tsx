import React, { Suspense } from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Search from '~/components/Search/Search';

export default function Index() {
  const [alignment, setAlignment] = React.useState('practitioner');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Box className="flex justify-between max-w-full mx-auto p-5">
        <Box>
          <h1 className="text-3xl font-bold">Plan Name</h1>
          <p>Plan details will be displayed here.</p>
        </Box>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Type"
        >
          <ToggleButton value="practitioner">Practitioner</ToggleButton>
          <ToggleButton value="location">Location</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Search />
    </Suspense>
  );
}
