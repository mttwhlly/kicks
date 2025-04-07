import { useState, useEffect, Suspense, useMemo } from 'react';
import { Link } from 'react-router';
import { Chip } from '@mui/material';
import { formatZip } from '~/utils/formatters';
import type { InteractiveMapWithCardsProps, LocationData } from '~/types/map';
import MapComponent from './MapComponent';  // Import directly instead of lazy loading

const InteractiveMapWithCards = ({
  filterCriteria,
  initialData,
}: InteractiveMapWithCardsProps) => {
  // Change to track by ID instead of index for more reliable synchronization
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [selectedPracticeLocationId, setSelectedPracticeLocationId] = useState(null);
  
  // Keep the selectedLocation index for backward compatibility with existing components
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [locationData, setLocationData] = useState<LocationData[]>(initialData);

  // Function to handle card click
  const handleCardClick = (locationId, index, practiceLocationId) => {
    setSelectedLocationId(locationId);
    setSelectedPracticeLocationId(practiceLocationId);
    setSelectedLocation(index);
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

      // Filter by status (active/inactive)
      if (
        !filterCriteria.includeInactive &&
        location.stateCode === 1
      ) {
        return false;
      }

      return true;
    });
  }, [filterCriteria, locationData]);

  // Set the first location as selected by default if none is selected
  useEffect(() => {
    if (filteredData.length > 0 && selectedLocationId === null) {
      setSelectedLocationId(filteredData[0].practitionerId);
      setSelectedPracticeLocationId(filteredData[0].practiceLocationId);
      setSelectedLocation(0);
    }
  }, [filteredData, selectedLocationId]);

  // Find the index of the currently selected location in the filtered data
  const selectedLocationIndex = useMemo(() => {
    return filteredData.findIndex(location => location.practitionerId === selectedLocationId);
  }, [filteredData, selectedLocationId]);

  // Scroll the selected card into view when it changes
  useEffect(() => {
    if (selectedLocationIndex >= 0) {
      const cardElement = document.getElementById(`card-${filteredData.indexOf(filteredData[selectedLocationIndex])}`);
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [selectedLocationId, selectedLocationIndex, filteredData]);

  return (
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
            No practitioners match your current filters
          </div>
        ) : (
          <div className="space-y-4">
            {filteredData.map((location, index) => (
              <div
                key={`card-${location.practitionerId}-${location.practiceLocationId}-${location.latitude}-${location.longitude}`}
                id={`card-${index}`}
                className={`p-4 rounded-lg shadow-md cursor-pointer transition-all duration-100 ${
                  selectedLocationId === location.practitionerId && 
                  selectedPracticeLocationId === location.practiceLocationId
                    ? 'outline-blue-400 outline bg-blue-50'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleCardClick(location.practitionerId, index, location.practiceLocationId)}
              >
                <div className="flex justify-between mb-2">
                  <Link to={`/profile/${location.practitionerId}`}><h3 className="text-md font-semibold hover:underline">{location.fullName}</h3></Link>
                  <Chip
                    label={location.stateCode === 0 ? 'Active' : 'Inactive'}
                    variant="outlined"
                    color={
                      location.stateCode === 1
                        ? 'error'
                        : 'primary'
                    }
                    size="small"
                    className='ml-1'
                  />
                </div>
                {location.addressLine1 && <p className="my-0">{location.addressLine1}</p>}
                {location.addressLine2 && <p className="my-0">{location?.addressLine2}</p>}
                {(location.city && location.state && location.zip) && <p className="my-0">{location.city + ', ' + location.state + ' ' + formatZip(location.zip)}</p>}
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
            selectedLocationId={selectedLocationId}
            setSelectedLocationId={setSelectedLocationId}
            selectedPracticeLocationId={selectedPracticeLocationId}
            setSelectedPracticeLocationId={setSelectedPracticeLocationId}
          />
        </Suspense>
      </div>
    </div>
  );
};

// Export the regular component without any wrapper
export default InteractiveMapWithCards;