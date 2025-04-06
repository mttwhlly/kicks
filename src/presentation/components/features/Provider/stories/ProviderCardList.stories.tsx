import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from '@mui/material';
import { ProviderCard } from '../ProviderCard';
import { mockProviders } from '../../../../../../.storybook/mocks/mockProviders';

/**
 * Component to display a list of provider cards
 */
const ProviderCardList = ({ providers, selectedId = null }) => {
  return (
    <Grid container spacing={3} sx={{ p: 2, maxWidth: '1200px' }}>
      {providers.map(provider => (
        <Grid item xs={12} md={6} lg={4} key={provider.id}>
          <ProviderCard 
            provider={provider} 
            isSelected={provider.id === selectedId}
            onClick={() => console.log(`Selected provider: ${provider.id}`)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const meta = {
  title: 'Features/Provider/ProviderCardList',
  component: ProviderCardList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    selectedId: {
      control: 'select',
      options: [null, ...mockProviders.map(p => p.id)],
      description: 'ID of the selected provider',
    },
  },
} satisfies Meta<typeof ProviderCardList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    providers: mockProviders,
    selectedId: null,
  },
};

export const WithSelection: Story = {
  args: {
    providers: mockProviders,
    selectedId: '1',
  },
};