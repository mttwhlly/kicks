import React from 'react';
import { SearchSkeleton, HomePageSkeleton, ProfilePageSkeleton, FilterSkeleton, ProviderCardSkeleton, CardStackSkeleton, MapSkeleton, InteractiveMapWithCardsSkeleton, TableSkeleton, PlanHeaderSkeleton, PlanIntroSkeleton, TabsSkeleton, PlanPageSkeleton } from './SkeletonComponents'; // Adjust the import according to your file structure

export default {
  title: 'Skeletons',
  component: SearchSkeleton,
  parameters: {
    layout: 'centered', // Centers the skeleton in the Storybook view
  },
};

export const Search = () => <SearchSkeleton />;

export const HomePage = () => <HomePageSkeleton />;

export const ProfilePage = () => <ProfilePageSkeleton />;

export const Filter = () => <FilterSkeleton />;

export const ProviderCard = () => <ProviderCardSkeleton />;

export const CardStack = () => <CardStackSkeleton />;

export const Map = () => <MapSkeleton />;

export const InteractiveMapWithCards = () => <InteractiveMapWithCardsSkeleton />;

export const Table = () => <TableSkeleton />;

export const PlanHeader = () => <PlanHeaderSkeleton />;

export const PlanIntro = () => <PlanIntroSkeleton />;

export const Tabs = () => <TabsSkeleton />;

export const PlanPage = () => <PlanPageSkeleton />;
