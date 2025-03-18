import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerIcon from './Icon';

// Import this here because this component only runs client-side
import L from 'leaflet';

// Create a custom FlyTo component
const FlyToHandler = ({ map, selectedLocation, locations }) => {
  useEffect(() => {
    if (selectedLocation !== null) {
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

const MapComponent = ({ locations, selectedLocation, setSelectedLocation }) => {
  const [map, setMap] = useState(null);
  const markersRef = useRef({});

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
  const handleMarkerClick = (locationId) => {
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
      center={[37.7749, -122.4194]}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
      whenCreated={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

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
            </div>
          </Popup>
        </Marker>
      ))}

      {map && (
        <FlyToHandler
          map={map}
          selectedLocation={selectedLocation}
          locations={locations}
        />
      )}
    </MapContainer>
  );
};

export default MapComponent;
