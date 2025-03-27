// src/presentation/pages/Dashboard.tsx
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { MetricsPanel } from '../components/ui/MetricsPanel';
import { RecentActivityList } from '../components/ui/RecentActivityList';
import { useMetrics } from '../hooks/useMetrics';
import { useActivities } from '../hooks/useActivities';
import { DashboardLayout } from '../components/layouts/DashboardLayout';

const Dashboard: React.FC = () => {
  const { metrics, isLoading: metricsLoading } = useMetrics();
  const { activities, isLoading: activitiesLoading } = useActivities();

  return (
    <DashboardLayout>
      <Box className="p-6">
        <Typography variant="h4" className="mb-6 font-medium">
          Dashboard
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <MetricsPanel 
              metrics={metrics} 
              isLoading={metricsLoading} 
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <RecentActivityList 
              activities={activities} 
              isLoading={activitiesLoading} 
            />
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;