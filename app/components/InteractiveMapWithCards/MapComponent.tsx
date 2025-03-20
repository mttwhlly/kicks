import React, { useEffect, useState, useRef } from 'react';
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
}

// Create a custom FlyTo component
const FlyToHandler = ({ map, selectedLocation, locations }) => {
  useEffect(() => {
    if (selectedLocation !== null && selectedLocation !== 0) {
      const selected = locations.find((loc) => loc.id === selectedLocation);
      if (selected && map) {
        map.flyTo(selected.position, 15, {
          duration: 1.5,
        });
      }
    }
  }, [selectedLocation, map, locations]);

  return null;
};

// Create a component to fit the map to bounds of markers
const FitBoundsToMarkers = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      // Create bounds from marker positions
      const bounds = L.latLngBounds(locations.map((loc) => loc.position));

      // Add some padding to the bounds
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);

  return null;
};

const MapComponent = ({
  locations,
  selectedLocation,
  setSelectedLocation,
}: MapComponentProps) => {
  const [map, setMap] = useState(null);
  const markersRef = useRef({});
  const defaultCenter: [number, number] = [37.7749, -122.4194]; // San Francisco

  // Set up Leaflet icons
  useEffect(() => {
    // Fix the icon issue
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
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

  // Save marker references for highlight effect
  useEffect(() => {
    if (selectedLocation !== null && markersRef.current[selectedLocation]) {
      // You could add highlight effect to the marker here if needed
    }
  }, [selectedLocation]);

  return (
    <MapContainer
      center={defaultCenter}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
      whenCreated={setMap}
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
                  <h3 className="font-bold">{location.name}</h3>
                  <p>{location.address}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {location.specialty}
                  </p>
                  <p className="text-sm text-gray-600">{location.status}</p>
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
