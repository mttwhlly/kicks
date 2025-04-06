import type { Meta, StoryObj } from '@storybook/react';
import { ProviderCard } from '../ProviderCard';
import { Provider } from '../../../../../core/domain/provider';

// Sample provider data for stories
const sampleProvider: Provider = {
  id: '1',
  name: 'Dr. Sarah Johnson',
  specialty: 'Cardiology',
  address: {
    street: '123 Medical Center Dr',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060
    }
  },
  phone: '(555) 123-4567',
  email: 'sarah.johnson@example.com',
  networks: ['Blue Cross', 'Aetna'],
  acceptingNewPatients: true,
  verificationStatus: 'verified'
};

const meta = {
  title: 'Features/Provider/ProviderCard',
  component: ProviderCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isSelected: {
      control: 'boolean',
      description: 'Whether the card is selected',
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof ProviderCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    provider: sampleProvider,
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    provider: sampleProvider,
    isSelected: true,
  },
};

export const NotAcceptingPatients: Story = {
  args: {
    provider: {
      ...sampleProvider,
      acceptingNewPatients: false,
    },
    isSelected: false,
  },
};

export const Unverified: Story = {
  args: {
    provider: {
      ...sampleProvider,
      verificationStatus: 'unverified',
    },
    isSelected: false,
  },
};