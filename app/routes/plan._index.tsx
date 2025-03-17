import React, { Suspense } from 'react';
import { Box, Tab, Tabs, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Search from '~/components/Search/Search';
import { Outlet } from 'react-router';
import InteractiveMapWithCards from '~/components/InteractiveMapWithCards/InteractiveMapWithCards';

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
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Box className="flex justify-between max-w-6xl mx-auto p-5">
        <Box>
          <h1 className="text-3xl font-bold">Centene</h1>
          <p>2,432,218 Providers</p>
          <p>1,004,352 Locations</p>
        </Box>
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
      <Search />
      <Box className="max-w-6xl mx-auto p-5">
        <h2 className="text-2xl font-bold">Results</h2>
        <Box className="flex justify-end mt-4">
          <Box className="w-full max-w-6xl">
            <Box className="border-b border-gray-200 flex flex-row justify-end">
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="basic tabs example"
              >
                <Tab label="Map View" {...a11yProps(0)} />
                <Tab label="List View" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={tabValue} index={0}>
              Map View
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={1}>
              List View
            </CustomTabPanel>
          </Box>
          <Outlet />
        </Box>
        <InteractiveMapWithCards />
      </Box>
    </Suspense>
  );
}
