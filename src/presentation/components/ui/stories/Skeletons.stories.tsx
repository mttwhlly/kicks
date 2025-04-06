import type { Meta, StoryObj } from '@storybook/react';
import { 
  SearchSkeleton, 
  HomePageSkeleton, 
  ProviderCardSkeleton 
} from '../Skeletons';

// Meta for all skeleton components
const meta = {
  title: 'UI/Skeletons',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

// SearchSkeleton stories
export const SearchSkeletonStory: StoryObj = {
  name: 'Search Skeleton',
  render: () => <SearchSkeleton />,
};

// HomePageSkeleton stories
export const HomePageSkeletonStory: StoryObj = {
  name: 'Home Page Skeleton',
  render: () => <HomePageSkeleton />,
};

// ProviderCardSkeleton stories
export const ProviderCardSkeletonStory: StoryObj = {
  name: 'Provider Card Skeleton',
  render: () => <ProviderCardSkeleton />,
};