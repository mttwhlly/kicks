import React, { Suspense, useState } from 'react';
import { Box, LinearProgress, Tab, Tabs, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router';
import type { Route } from './+types/organization.$id';

export async function clientLoader({
    params,
  }: Route.ClientLoaderArgs) {
    const apiUrl = import.meta.env.VITE_NOVA_API_URL
    const res = await fetch(`${apiUrl}/api/nova/${params.id}/providersandlocations`);
    const data = await res.json();
    return data;
  }


export default function Organization({loaderData}:Route.ComponentProps) {

  const data = loaderData;

  const [type, setType] = useState('practitioner');
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const planId = params.id;

  // Determine which tab is active based on the URL path
  const isMapView = location.pathname.includes('/map');
  const isListView = location.pathname.includes('/list');
  const tabValue = isMapView ? 0 : isListView ? 1 : 0;


  const handleTabChange = (
    event: React.SyntheticEvent,
    newTabValue: number
  ) => {
    // Navigate to the appropriate route based on tab selection
    if (newTabValue === 0) {
      navigate(`/organization/${planId}/map`);
    } else if (newTabValue === 1) {
      navigate(`/organization/${planId}/list`);
    }
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setType(newAlignment);
  };

  return (
    <Suspense fallback={<LinearProgress color="inherit" />}>
      <Box className="flex justify-between max-w-6xl mx-auto p-5 mt-[120px]">
        <Box>
          <h1 className="text-5xl font-bold mb-6">{data && data.participatingOrganizationName}</h1>
          <p>{data.totalProviderCount?.toLocaleString()} Practitioners</p>
          <p>{data.totalLocationCount?.toLocaleString()} Locations</p>
        </Box>
        <Box className="h-6">
          <ToggleButtonGroup
            color="primary"
            value={type}
            exclusive
            onChange={handleChange}
            aria-label="Type"
          >
            <ToggleButton value="practitioner">Practitioners</ToggleButton>
            <ToggleButton value="location">Locations</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Box className="max-w-6xl mx-auto p-5">
        <Box className="rounded-lg max-w-8xl mx-auto">
          <Box className="flex flex-col gap-2 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold">
              Browse practitioners in-network with {data && data.participatingOrganizationName}
            </h2>
            <p>Filter and browse our directory for accurate practitioner data</p>
          </Box>
        </Box>
        <Box className="flex justify-end">
          <Box className="w-full max-w-6xl">
            <Box className="border-b border-gray-200 flex flex-row justify-end">
              <Box>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    label="Map View"
                    component={Link}
                    to={`/organization/${data.participatingOrganizationId}/map`}
                  />
                  <Tab
                    label="List View"
                    component={Link}
                    to={`/organization/${data.participatingOrganizationId}/list`}
                  />
                </Tabs>
              </Box>
            </Box>
            <Suspense fallback={<LinearProgress color="inherit" />}>
              <Outlet context={data.participatingOrganizationDetails} />
            </Suspense>
          </Box>
        </Box>
      </Box>
    </Suspense>
  );
}
