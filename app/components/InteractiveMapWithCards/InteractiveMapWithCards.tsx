import { useState, useEffect, Suspense, lazy } from 'react';
import { Chip } from '@mui/material';

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

// Lazy load the map component to ensure it only loads on the client
const MapComponent = lazy(() => import('./MapComponent'));

const InteractiveMapWithCards = () => {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [isBrowser, setIsBrowser] = useState(false);

  // Check if we're in the browser environment
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Function to handle card click
  const handleCardClick = (locationId: number) => {
    setSelectedLocation(locationId);
  };

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto max-h-svh h-[40rem] bg-gray-100">
      {/* Card Stack Section */}
      <div className="w-full md:w-1/3 h-1/2 md:h-full overflow-y-auto p-4 bg-white">
        <div className="space-y-4">
          {locationData.map((location) => (
            <div
              key={location.id}
              id={`card-${location.id}`}
              className={`p-4 rounded-lg shadow-md cursor-pointer transition-all duration-100 ${
                selectedLocation === location.id
                  ? 'outline-blue-400 outline bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleCardClick(location.id)}
            >
              <div className="flex justify-between mb-2">
                <h3 className="text-lg font-semibold">{location.name}</h3>
                <Chip
                  label={location.status}
                  variant={
                    location.status.toLowerCase() === 'inactive'
                      ? 'outlined'
                      : 'filled'
                  }
                  color={
                    location.status.toLowerCase() === 'inactive'
                      ? 'default'
                      : 'primary'
                  }
                  size="small"
                />
              </div>
              <p className="text-gray-600 text-sm">{location.address}</p>
              <p className="mt-2">{location.description}</p>
              <p className="text-sm text-gray-500 mt-2">{location.specialty}</p>
              <p className="text-sm text-gray-500 mt-2">
                {location.locations} Locations
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Map Section */}
      <div className="w-full md:w-2/3 h-1/2 md:h-full">
        {isBrowser ? (
          <Suspense
            fallback={
              <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded">
                <p className="text-gray-500">Loading map...</p>
              </div>
            }
          >
            <MapComponent
              locations={locationData}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </Suspense>
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded">
            <p className="text-gray-500">Map loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveMapWithCards;
