import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FitBoundsToMarkers } from './FitsBoundsToMarkers';
import { FlyToHandler } from './FlyToHandler';
import 'leaflet/dist/leaflet.css';
import MarkerIcon from './Icon';
import { formatZip } from '~/utils/formatters';
import type { MapComponentProps } from '~/types/map';
import L from 'leaflet';

const MapComponent = ({
  locations,
  selectedLocation,
  setSelectedLocation,
}: MapComponentProps) => {
  const [map, setMap] = useState(null);
  const markersRef = useRef({});

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
      scrollWheelZoom={false}
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
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={[location.latitude, location.longitude]}
              icon={MarkerIcon}
              eventHandlers={{
                click: () => handleMarkerClick(index),
              }}
              ref={(markerRef) => {
                if (markerRef) {
                  markersRef.current[index] = markerRef;
                }
              }}
            >
              <Popup>
                <div>
                  {location.fullName && <h3 className="font-bold mb-2">{location.fullName}</h3>}
                  {location.addressLine1 && <p className="my-0">{location.addressLine1}</p>}
                  {location.addressLine2 && <p className="my-0">{location.addressLine2}</p>}
                  {(location.city && location.state && location.zip) && <p className="my-0 mb-2">{location.city + ', ' + location.state + ' ' + formatZip(location.zip)}</p>}
                  <Link to={`/profile/${location.practitionerId}`} viewTransition>View Profile</Link>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Automatically fit bounds when locations change */}
          {locations.length > 1 && <FitBoundsToMarkers locations={locations} />}

          {/* Handle flying to selected location */}
          {map && (
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