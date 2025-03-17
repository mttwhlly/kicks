import React, { Suspense } from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Search from '~/components/Search/Search';
import { Outlet } from 'react-router';
import InteractiveMapWithCards from '~/components/InteractiveMapWithCards/InteractiveMapWithCards';

export default function Index() {
  const [type, setType] = React.useState('practitioner');
  const [view, setView] = React.useState('list');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setType(newAlignment);
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
          value={type}
          exclusive
          onChange={handleChange}
          aria-label="Type"
        >
          <ToggleButton value="practitioner">Practitioner</ToggleButton>
          <ToggleButton value="location">Location</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Search />
      <Box>
        <Box className="flex justify-end mt-4">
          <ToggleButtonGroup
            color="primary"
            value={view}
            exclusive
            onChange={handleChange}
            aria-label="View"
          >
            <ToggleButton value="list">List</ToggleButton>
            <ToggleButton value="map">Map</ToggleButton>
          </ToggleButtonGroup>
          <Outlet />
        </Box>
        <InteractiveMapWithCards />
      </Box>
    </Suspense>
  );
}
