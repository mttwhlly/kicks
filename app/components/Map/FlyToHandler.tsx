import { useEffect } from "react";
import L from 'leaflet';

export const FlyToHandler = ({ map, selectedLocation, locations }) => {
  useEffect(() => {
    if (!map || selectedLocation === null || !locations || locations.length === 0) {
      return; 
    }
    
    try {
      // Since selectedLocation is the index, directly access the location
      const selected = locations[selectedLocation];
      
      if (selected && !isNaN(selected.latitude) && !isNaN(selected.longitude)) {
        // Open the popup after flying to the location
        const markerPosition = [selected.latitude, selected.longitude];
        
        map.flyTo(markerPosition, 15, {
          duration: 1.5,
        });
        
        // Find the marker at this position and open its popup after the flyTo animation completes
        setTimeout(() => {
          map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
              const latLng = layer.getLatLng();
              if (latLng.lat === markerPosition[0] && latLng.lng === markerPosition[1]) {
                layer.openPopup();
              }
            }
          });
        }, 1600); // Set timeout slightly longer than flyTo duration
      }
    } catch (error) {
      console.error("Error in FlyToHandler:", error);
    }
  }, [selectedLocation, map, locations]);

  return null;
};