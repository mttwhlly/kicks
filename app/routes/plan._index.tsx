import React, { Suspense, useState, useEffect } from 'react';
import {
  Box,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  LinearProgress,
} from '@mui/material';
import {
  Outlet,
  useParams,
  Link,
  useLocation,
  useNavigate,
} from 'react-router';
import {
  PlanHeaderSkeleton,
  PlanIntroSkeleton,
  PlanPageSkeleton,
  TabsSkeleton,
} from '~/components/Skeletons/Skeletons';

export default function PlanDetail() {
  const [type, setType] = useState('practitioner');
  const [isLoading, setIsLoading] = useState(true);
  const [planData, setPlanData] = useState(null);
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const planId = params.id;

  // Determine which tab is active based on the URL path
  const isMapView = location.pathname.includes('/map');
  const isListView = location.pathname.includes('/list');
  const tabValue = isMapView ? 0 : isListView ? 1 : 0;

  // Fetch plan data
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    // Simulated API call to fetch plan data
    const timer = setTimeout(() => {
      if (isMounted) {
        // Mock data - in a real app this would come from an API
        setPlanData({
          insurance: 'Centene',
          planId: planId,
          providerCount: 2432218,
          locationCount: 1004352,
        });
        setIsLoading(false);
      }
    }, 1000); // Simulate network delay

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [planId]);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newTabValue: number
  ) => {
    // Navigate to the appropriate route based on tab selection
    if (newTabValue === 0) {
      navigate(`/plan/${planId}/map`);
    } else if (newTabValue === 1) {
      navigate(`/plan/${planId}/list`);
    }
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setType(newAlignment);
  };

  // If still loading the main plan data, show a full-page skeleton
  if (isLoading) {
    return <PlanPageSkeleton />;
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Box className="flex justify-between max-w-6xl mx-auto p-5">
        <Box>
          <h1 className="text-4xl font-bold">{planData?.insurance}</h1>
          <p>Plan ID: {planId}</p>
          <p>{planData?.providerCount?.toLocaleString()} Providers</p>
          <p>{planData?.locationCount?.toLocaleString()} Locations</p>
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
        <Box className="rounded-lg pt-8 max-w-8xl mx-auto">
          <Box className="flex flex-col gap-2 max-w-6xl mx-auto px-8">
            <h2 className="text-2xl font-bold">
              Browse providers in-network with {planData?.insurance}
            </h2>
            <p>Filter and browse our directory for accurate provider data</p>
          </Box>
        </Box>
        <Box className="flex justify-end mt-4">
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
                    to={`/plan/${planId}/map`}
                  />
                  <Tab
                    label="List View"
                    component={Link}
                    to={`/plan/${planId}/list`}
                  />
                </Tabs>
              </Box>
            </Box>
            {/* The Outlet will render the appropriate child route */}
            <Suspense fallback={<LinearProgress />}>
              <Outlet />
            </Suspense>
          </Box>
        </Box>
      </Box>
    </Suspense>
  );
}
