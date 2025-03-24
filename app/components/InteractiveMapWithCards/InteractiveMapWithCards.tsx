import { useState, useEffect, Suspense, lazy, useMemo } from 'react';
import { Link } from 'react-router';
import { Chip } from '@mui/material';
import type { FilterCriteria } from '../Filter/Filter';
import { formatZip } from '~/utils/formatters'

// Type for location data
interface LocationData {
  id: number;
  name: string;
  description: string;
  address: string;
  position: [number, number];
  specialty: string;
  locations: string;
  status: string;
}

interface TestLocationData {
  acceptNewPatients: 100000000 | 100000001 | null;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  firstName: string;
  fullName: string;
  lastName: string;
  latitude: number;
  locationCount: number;
  longitude: number;
  officeFaxNumber: string;
  officePhoneExtension: string;
  officePhoneNumber: string;
  officeType: string;
  participatingOrganizationId: string;
  practiceLocationId: string;
  practiceLocationName: string;
  practitionerId: string;
  providerCount: number;
  rosterId: string;
  state: string;
  zip: string;
}

// Props for the component
interface InteractiveMapWithCardsProps {
  filterCriteria?: FilterCriteria;
  initialData?: LocationData[];
}

// const profile = {
//   id: '889A9D5F-4690-ED11-A896-000D3A8A723F'
// }

// Sample location data
// const defaultLocationData: LocationData[] = [
//   {
//     id: 1,
//     name: 'Michael P White NP',
//     description: '',
//     address: '123 Cool Kid Street, San Francisco, CA 94117',
//     position: [37.7684, -122.4362],
//     specialty: 'Registered Nurse, Medical-Surgical',
//     locations: '5',
//     status: 'Active',
//   },
//   {
//     id: 2,
//     name: 'Dr. Alice Auburn',
//     description: '',
//     address: '501 Stanyan St, San Francisco, CA 94117',
//     position: [37.7694, -122.4862],
//     specialty: 'Orthopedic Surgery',
//     locations: '2',
//     status: 'Active',
//   },
//   {
//     id: 3,
//     name: 'Dr. Bob Blue',
//     description: '',
//     address: '123 Main St, San Francisco, CA 94105',
//     position: [37.7749, -122.4194],
//     specialty: 'Cardiology',
//     locations: '3',
//     status: 'Active',
//   },
//   {
//     id: 4,
//     name: 'Dr. Carol Crimson',
//     description: '',
//     address: '456 Elm St, San Francisco, CA 94107',
//     position: [37.7849, -122.4094],
//     specialty: 'Neurology',
//     locations: '1',
//     status: 'Inactive',
//   },
//   {
//     id: 5,
//     name: 'Dr. David Emerald',
//     description: '',
//     address: '789 Oak St, San Francisco, CA 94108',
//     position: [37.7949, -122.3994],
//     specialty: 'Pediatrics',
//     locations: '4',
//     status: 'Active',
//   },
//   {
//     id: 6,
//     name: 'Dr. Eva Emerald',
//     description: '',
//     address: '321 Maple St, San Francisco, CA 94109',
//     position: [37.7649, -122.4094],
//     specialty: 'Dermatology',
//     locations: '2',
//     status: 'Active',
//   },
//   {
//     id: 7,
//     name: 'Dr. Frank Fuchsia',
//     description: '',
//     address: '654 Pine St, San Francisco, CA 94110',
//     position: [37.7749, -122.3994],
//     specialty: 'Gynecology',
//     locations: '3',
//     status: 'Inactive',
//   },
//   {
//     id: 8,
//     name: 'Dr. Grace Green',
//     description: '',
//     address: '321 Birch St, San Francisco, CA 94111',
//     position: [37.7849, -122.3894],
//     specialty: 'Psychiatry',
//     locations: '1',
//     status: 'Active',
//   },
// ];



// Lazy load the map component to ensure it only loads on the client
const MapComponent = lazy(() => import('./MapComponent'));

const InteractiveMapWithCards = ({
  filterCriteria,
  initialData,
}: InteractiveMapWithCardsProps) => {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [isBrowser, setIsBrowser] = useState(false);
  const [locationData, setLocationData] = useState<TestLocationData[]>(initialData);

  // Check if we're in the browser environment
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Function to handle card click
  const handleCardClick = (locationId: number) => {
    setSelectedLocation(locationId);
  };

  // Filter data based on criteria
  const filteredData = useMemo(() => {
    if (!filterCriteria || !locationData || locationData.length === 0) {
      return locationData || [];
    }

    return locationData.filter((location) => {
      // Filter by provider name
      if (
        location.fullName && filterCriteria.name && filterCriteria.name.trim() !== '' &&
        !location.fullName.toLowerCase().includes(filterCriteria.name.toLowerCase())
      ) {
        return false;
      }

      // Filter by city
      if (
        location.city && filterCriteria.city && filterCriteria.city.trim() !== '' && 
        !location.city
          .toLowerCase()
          .includes(filterCriteria.city.toLowerCase())
      ) {
        return false;
      }

      // Filter by state
      if (
        location.state && filterCriteria.state &&
        !location.state.includes(filterCriteria.state)
      ) {
        return false;
      }

      // Filter by accepting new patients
      if (
        location.acceptNewPatients === 100000001 && !filterCriteria.acceptingNewPatients
      ) {
        return false;
      }

      // TODO: pull in specialties & status

      // Filter by specialty
      // if (
      //   filterCriteria.specialty &&
      //   location.specialty.toLowerCase() !==
      //     filterCriteria.specialty.toLowerCase()
      // ) {
      //   return false;
      // }

      // Filter by status (active/inactive)
      // if (
      //   !filterCriteria.includeInactive &&
      //   location.status.toLowerCase() === 'inactive'
      // ) {
      //   return false;
      // }

      return true;
    });
  }, [filterCriteria, locationData]);

  return (
    <>
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto max-h-svh h-[40rem] bg-gray-100">
      {/* Card Stack Section */}
      <div className="w-full md:w-1/3 h-1/2 md:h-full overflow-y-auto p-4 bg-white border border-neutral-200">
    <div className="mb-4">
      <p className="font-medium text-gray-700">
        Showing {filteredData.length} of {locationData.length} practitioners
      </p>
    </div>
        {filteredData.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No providers match your current filters
          </div>
        ) : (
          <div className="space-y-4">
            {filteredData.map((location, index) => (
              <div
                key={index}
                id={`card-${index}`}
                className={`p-4 rounded-lg shadow-md cursor-pointer transition-all duration-100 ${
                  selectedLocation === index
                    ? 'outline-blue-400 outline bg-blue-50'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleCardClick(index)}
              >
                <div className="flex justify-between mb-2">
                  <Link to={`/profile/${location.practitionerId}`} viewTransition><h3 className="text-md font-semibold hover:underline">{location.practiceLocationName}</h3></Link>
       {/* TODO: update with status data */}
                  {/* <Chip
                    label={location.status}
                    variant="outlined"
                    color={
                      location.status.toLowerCase() === 'inactive'
                        ? 'error'
                        : 'primary'
                    }
                    size="small"
                  /> */}
                </div>
                {location.addressLine1 && <p className="my-0">{location.addressLine1}</p>}
                {location.addressLine2 && <p className="my-0">{location?.addressLine2}</p>}
                {(location.city && location.state && location.zip) && <p className="my-0">{location.city + ', ' + location.state + ' ' + formatZip(location.zip)}</p>}
                {/* <p className="text-xs text-gray-500 mt-2">
                  {location.specialty}
                </p> */}
                <p className="text-xs text-gray-500 mt-2">
                  {location.locationCount} Locations
                </p>
                
              </div>
            ))}
          </div>
        )}
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
              locations={filteredData}
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
    </>
  );
};

export default InteractiveMapWithCards;
