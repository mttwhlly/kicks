import React, { Suspense } from 'react';
import {
  Box,
  Checkbox,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import Filter from '~/components/Filter/Filter';
import { Outlet } from 'react-router';
import InteractiveMapWithCards from '~/components/InteractiveMapWithCards/InteractiveMapWithCards';
import DynamicVirtualizedTable from '~/components/DynamicVirtualizedTable/DynamicVirtualizedTable';

// Sample location data
const locationData = [
  {
    id: 1,
    name: 'Dr. Alice Auburn',
    description: '',
    address: '501 Stanyan St, San Francisco, CA 94117',
    position: [37.7694, -122.4862],
    specialty: 'Orthopedic Surgery',
    locations: '2',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Dr. Bob Blue',
    description: '',
    address: '123 Main St, San Francisco, CA 94105',
    position: [37.7749, -122.4194],
    specialty: 'Cardiology',
    locations: '3',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Dr. Carol Crimson',
    description: '',
    address: '456 Elm St, San Francisco, CA 94107',
    position: [37.7849, -122.4094],
    specialty: 'Neurology',
    locations: '1',
    status: 'Inactive',
  },
  {
    id: 4,
    name: 'Dr. David Emerald',
    description: '',
    address: '789 Oak St, San Francisco, CA 94108',
    position: [37.7949, -122.3994],
    specialty: 'Pediatrics',
    locations: '4',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Dr. Eva Emerald',
    description: '',
    address: '321 Maple St, San Francisco, CA 94109',
    position: [37.7649, -122.4094],
    specialty: 'Dermatology',
    locations: '2',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Dr. Frank Fuchsia',
    description: '',
    address: '654 Pine St, San Francisco, CA 94110',
    position: [37.7749, -122.3994],
    specialty: 'Gynecology',
    locations: '3',
    status: 'Inactive',
  },
  {
    id: 7,
    name: 'Dr. Grace Green',
    description: '',
    address: '321 Birch St, San Francisco, CA 94111',
    position: [37.7849, -122.3894],
    specialty: 'Psychiatry',
    locations: '1',
    status: 'Active',
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Index() {
  const [type, setType] = React.useState('practitioner');
  const [view, setView] = React.useState('list');

  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newTabValue: number
  ) => {
    setTabValue(newTabValue);
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setType(newAlignment);
  };

  const data = {
    insurance: 'Centene',
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Box className="flex justify-between max-w-6xl mx-auto p-5">
        <Box>
          <h1 className="text-4xl font-bold">{data.insurance}</h1>
          <p>2,432,218 Providers</p>
          <p>1,004,352 Locations</p>
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
        <Box className=" rounded-lg pt-8 max-w-8xl mx-auto">
          <Box className="flex flex-col gap-2 max-w-6xl mx-auto px-8">
            <h2 className="text-2xl font-bold">
              Browse providers in-network with {data.insurance}
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
                  <Tab label="Map View" {...a11yProps(0)} />
                  <Tab label="List View" {...a11yProps(1)} />
                </Tabs>
              </Box>
            </Box>
            <CustomTabPanel value={tabValue} index={0}>
              <Filter />
              <InteractiveMapWithCards />
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={1}>
              <Filter />
              <DynamicVirtualizedTable
                data={locationData}
                excludeKeys={['id', 'description', 'position']}
              />
            </CustomTabPanel>
          </Box>
          <Outlet />
        </Box>
      </Box>
    </Suspense>
  );
}
