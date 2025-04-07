import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { formatZip } from '~/utils/formatters';

// Import the Leaflet marker icon directly to avoid the icon issue
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix the Leaflet icon issue once
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow
});

const MapComponent = ({
  locations,
  selectedLocation,
  setSelectedLocation,
  selectedLocationId,
  setSelectedLocationId,
  selectedPracticeLocationId,
  setSelectedPracticeLocationId
}) => {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef({});
  
  // Initialize map when component mounts
  useEffect(() => {
    console.log("MapComponent mounted, initializing map");
    
    // Only initialize map once
    if (!leafletMapRef.current && mapRef.current) {
      console.log("Creating Leaflet map");
      
      // Create map
      leafletMapRef.current = L.map(mapRef.current).setView([39.8283, -98.5795], 4);
      
      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(leafletMapRef.current);
      
      // Add markers
      addMarkers();
    }
    
    // Cleanup function
    return () => {
      console.log("MapComponent unmounting, cleaning up map");
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []); // Empty dependency array - only run once on mount
  
  // Update markers when locations change
  useEffect(() => {
    console.log("Locations changed, updating markers");
    if (leafletMapRef.current) {
      addMarkers();
    }
  }, [locations]);
  
  // Handle selected location changes
  useEffect(() => {
    console.log("Selected location changed:", selectedLocation);
    if (leafletMapRef.current && selectedLocation !== null && selectedLocation !== undefined) {
      const selected = locations[selectedLocation];
      if (selected && !isNaN(selected.latitude) && !isNaN(selected.longitude)) {
        console.log("Flying to:", [selected.latitude, selected.longitude]);
        
        // Fly to location
        leafletMapRef.current.flyTo([selected.latitude, selected.longitude], 14);
        
        // Open popup
        if (markersRef.current[selectedLocation]) {
          setTimeout(() => {
            markersRef.current[selectedLocation].openPopup();
          }, 500);
        }
      }
    }
  }, [selectedLocation, locations]);
  
  // Function to add markers to the map
  const addMarkers = () => {
    console.log("Adding markers for", locations?.length || 0, "locations");
    
    // Remove existing markers
    Object.values(markersRef.current).forEach(marker => {
      if (marker) {
        marker.remove();
      }
    });
    
    // Reset markers reference
    markersRef.current = {};
    
    // If no map or no locations, return
    if (!leafletMapRef.current || !locations || locations.length === 0) {
      return;
    }
    
    // Create bounds for zooming
    const bounds = L.latLngBounds();
    
    // Add new markers
    locations.forEach((location, index) => {
      if (!location || isNaN(location.latitude) || isNaN(location.longitude)) {
        return;
      }
      
      // Create marker
      const marker = L.marker([location.latitude, location.longitude])
        .addTo(leafletMapRef.current);
      
      // Create popup content
      const popupContent = document.createElement('div');
      
      if (location.fullName) {
        const name = document.createElement('h3');
        name.style.fontWeight = 'bold';
        name.style.marginBottom = '8px';
        name.textContent = location.fullName;
        popupContent.appendChild(name);
      }
      
      if (location.addressLine1) {
        const addr1 = document.createElement('p');
        addr1.style.margin = '0';
        addr1.textContent = location.addressLine1;
        popupContent.appendChild(addr1);
      }
      
      if (location.addressLine2) {
        const addr2 = document.createElement('p');
        addr2.style.margin = '0';
        addr2.textContent = location.addressLine2;
        popupContent.appendChild(addr2);
      }
      
      if (location.city && location.state && location.zip) {
        const cityState = document.createElement('p');
        cityState.style.margin = '0 0 8px 0';
        cityState.textContent = `${location.city}, ${location.state} ${formatZip(location.zip)}`;
        popupContent.appendChild(cityState);
      }
      
      const link = document.createElement('a');
      link.href = `/profile/${location.practitionerId}`;
      link.textContent = 'View Profile';
      link.addEventListener('click', (e) => {
        // Use React Router programmatically if needed
        e.preventDefault();
        window.location.href = `/profile/${location.practitionerId}`;
      });
      popupContent.appendChild(link);
      
      // Bind popup to marker
      marker.bindPopup(popupContent);
      
      // Add click handler
      marker.on('click', () => {
        console.log("Marker clicked:", index);
        setSelectedLocation(index);
        setSelectedLocationId(location.practitionerId);
        setSelectedPracticeLocationId(location.practiceLocationId);
      });
      
      // Store reference
      markersRef.current[index] = marker;
      
      // Extend bounds
      bounds.extend([location.latitude, location.longitude]);
    });
    
    // Fit map to bounds if multiple markers
    if (locations.length > 1) {
      console.log("Fitting map to bounds");
      leafletMapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
    
    // If there's a selected location, fly to it
    if (selectedLocation !== null && selectedLocation !== undefined) {
      const selected = locations[selectedLocation];
      if (selected && !isNaN(selected.latitude) && !isNaN(selected.longitude)) {
        console.log("Initial fly to selected location:", [selected.latitude, selected.longitude]);
        leafletMapRef.current.flyTo([selected.latitude, selected.longitude], 14);
        
        // Open popup
        setTimeout(() => {
          if (markersRef.current[selectedLocation]) {
            markersRef.current[selectedLocation].openPopup();
          }
        }, 500);
      }
    }
  };
  
  return (
    <div 
      ref={mapRef}
      style={{ width: '100%', height: '100%' }}
      className="leaflet-map-container"
    ></div>
  );
};

export default MapComponent;