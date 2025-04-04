import { useEffect, useRef } from "react";
import L from 'leaflet';

export const FlyToHandler = ({ map, selectedLocation, locations }) => {
  // Keep track of previous markers to avoid popup conflicts
  const previousMarkerRef = useRef(null);
  
  useEffect(() => {
    if (!map || selectedLocation === null || !locations || locations.length === 0) {
      return; 
    }
    
    try {
      // Since selectedLocation is the index, directly access the location
      const selected = locations[selectedLocation];
      
      if (selected && !isNaN(selected.latitude) && !isNaN(selected.longitude)) {
        // Store selected location ID to ensure we're working with the correct data
        const selectedId = selected.practitionerId;
        
        // Fly to the location
        const markerPosition = [selected.latitude, selected.longitude];
        
        map.flyTo(markerPosition, 15, {
          duration: 1.5,
        });
        
        // Clear any previous popup
        if (previousMarkerRef.current) {
          previousMarkerRef.current.closePopup();
        }
        
        // Find the marker at this position and open its popup after the flyTo animation completes
        setTimeout(() => {
          let targetMarker = null;
          
          // First try to find the marker by position
          map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
              const latLng = layer.getLatLng();
              if (
                Math.abs(latLng.lat - markerPosition[0]) < 0.0001 && 
                Math.abs(latLng.lng - markerPosition[1]) < 0.0001
              ) {
                targetMarker = layer;
              }
            }
          });
          
          if (targetMarker) {
            // Store reference to this marker
            previousMarkerRef.current = targetMarker;
            
            // Get the content from our selected data to ensure consistency
            const popupContent = createPopupContent(selected);
            
            // Close any existing popup first
            targetMarker.closePopup();
            
            // Set new popup content
            targetMarker.bindPopup(popupContent);
            
            // Open the popup
            targetMarker.openPopup();
          }
        }, 1600); // Set timeout slightly longer than flyTo duration
      }
    } catch (error) {
      console.error("Error in FlyToHandler:", error);
    }
  }, [selectedLocation, map, locations]);
  
  // Function to create consistent popup content
  const createPopupContent = (location) => {
    // Create a DOM element for the popup content
    const container = document.createElement('div');
    
    // Add name
    if (location.fullName) {
      const nameElement = document.createElement('h3');
      nameElement.className = 'font-bold mb-2';
      nameElement.textContent = location.fullName;
      container.appendChild(nameElement);
    }
    
    // Add address line 1
    if (location.addressLine1) {
      const addr1Element = document.createElement('p');
      addr1Element.className = 'my-0';
      addr1Element.textContent = location.addressLine1;
      container.appendChild(addr1Element);
    }
    
    // Add address line 2
    if (location.addressLine2) {
      const addr2Element = document.createElement('p');
      addr2Element.className = 'my-0';
      addr2Element.textContent = location.addressLine2;
      container.appendChild(addr2Element);
    }
    
    // Add city, state, zip
    if (location.city && location.state && location.zip) {
      const cityStateElement = document.createElement('p');
      cityStateElement.className = 'my-0 mb-2';
      
      // Format zip code if needed
      const formattedZip = typeof location.zip === 'string' ? 
        location.zip : 
        String(location.zip).padStart(5, '0');
        
      cityStateElement.textContent = `${location.city}, ${location.state} ${formattedZip}`;
      container.appendChild(cityStateElement);
    }
    
    // Add profile link
    const linkElement = document.createElement('a');
    linkElement.textContent = 'View Profile';
    linkElement.href = `/profile/${location.practitionerId}`;
    
    // Add viewTransition attribute if needed
    linkElement.setAttribute('viewTransition', '');
    
    container.appendChild(linkElement);
    
    return container;
  };
  
  return null;
};
