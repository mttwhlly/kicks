import { useEffect } from 'react';
import { useMap } from 'react-leaflet'

// Create a component to fit the map to bounds of markers
export const FitBoundsToMarkers = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      try {
        const validPositions = locations.filter(loc =>
          !isNaN(loc.latitude) && !isNaN(loc.longitude)
        );

        if(validPositions.length > 0) {
          const bounds = L.latLngBounds(validPositions.map(loc => [loc.latitude, loc.longitude]));

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