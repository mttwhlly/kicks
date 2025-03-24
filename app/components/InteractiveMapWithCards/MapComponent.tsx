import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerIcon from './Icon';

// Import this here because this component only runs client-side
import L from 'leaflet';

// Type definition for location data
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

interface MapComponentProps {
  locations: LocationData[];
  selectedLocation: number;
  setSelectedLocation: (id: number) => void;
  profileId: string;
}

// Create a custom FlyTo component
const FlyToHandler = ({ map, selectedLocation, locations }) => {
  useEffect(() => {
    if (!map || selectedLocation === null || selectedLocation === 0 || !locations || locations.length === 0){
      return; 
    }
    try {
    const selected = locations.find((loc) => loc.id === selectedLocation);
    if (selected && Array.isArray(selected.position) && 
        selected.position.length === 2 &&
        !isNaN(selected.position[0]) && !isNaN(selected.position[1])) {

        map.flyTo(selected.position, 15, {
          duration: 1.5,
        });
      }
    } catch (error) {
      console.error("Error in FlyToHandler:", error);
    }
  }, [selectedLocation, map, locations]);

  return null;
};

// Create a component to fit the map to bounds of markers
const FitBoundsToMarkers = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      try {
        const validPositions = locations.filter(loc =>
          Array.isArray(loc.position) && loc.position.length === 2 &&
          !isNaN(loc.position[0]) && !isNaN(loc.position[1])
        );

        if(validPositions.length > 0) {
          const bounds = L.latLngBounds(validPositions.map(loc => loc.position));

          if (bounds.isValid()) {
            map.fitBounds(bounds, { padding: [50, 50] });
          }
        }
      } catch (error) {
        console.error("Error fitting bounds:", error);
      }
    }
  }, [locations]);

  return null;
};

const MapComponent = ({
  locations,
  selectedLocation,
  setSelectedLocation,
  profileId
}: MapComponentProps) => {
  const [map, setMap] = useState(null);
  const markersRef = useRef({});
  const defaultCenter: [number, number] = [37.7749, -122.4194]; // San Francisco

  // Set up Leaflet icons
  useEffect(() => {
    // Fix the icon issue
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    });
  }, []);

  // Function to handle marker click
  const handleMarkerClick = (locationId: number) => {
    setSelectedLocation(locationId);
    // Auto-scroll to the card
    const cardElement = document.getElementById(`card-${locationId}`);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <MapContainer
      center={defaultCenter}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
      ref={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.length === 0 ? (
        <div className="leaflet-top leaflet-center">
          <div className="leaflet-control bg-white p-2 rounded shadow-md">
            No locations match your current filters
          </div>
        </div>
      ) : (
        <>
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={location.position}
              icon={MarkerIcon}
              eventHandlers={{
                click: () => handleMarkerClick(location.id),
              }}
              ref={(markerRef) => {
                if (markerRef) {
                  markersRef.current[location.id] = markerRef;
                }
              }}
            >
              <Popup>
                <div>
                  <h3 className="font-bold mb-1">{location.name}</h3>
                  <p className="my-0">{location.address}</p>
                  <p className="text-sm text-gray-600 my-0">
                    {location.specialty}
                  </p>
                  <p className="text-sm text-gray-600 my-0">{location.status}</p>
                  <Link to={`/profile/${profileId}`} viewTransition>View Profile</Link>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Automatically fit bounds when locations change */}
          {locations.length > 1 && <FitBoundsToMarkers locations={locations} />}

          {/* Handle flying to selected location */}
          {map && selectedLocation !== 0 && (
            <FlyToHandler
              map={map}
              selectedLocation={selectedLocation}
              locations={locations}
            />
          )}
        </>
      )}
    </MapContainer>
  );
};

export default MapComponent;
