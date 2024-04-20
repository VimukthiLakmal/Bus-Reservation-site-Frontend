import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MultipleLocationsMap = ({ locations }) => {
  
  // Calculate the average latitude and longitude of all locations
  const totalLocations = locations.length;
  const averageLatitude = locations.reduce(
    (sum, location) => sum + location.latitude,
    0
  ) / totalLocations;
  const averageLongitude = locations.reduce(
    (sum, location) => sum + location.longitude,
    0
  ) / totalLocations;

  return (
  <MapContainer
      center={[averageLatitude, averageLongitude]}
      zoom={8}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={[location.latitude, location.longitude]}
          icon={getCustomIcon(location.busNumber, [32, 32])} // Set default icon size here (e.g., [32, 32])
        >
          <Popup autoOpen={true} closeButton={false}>
            <div>
              <h4>{location.busNumber}</h4>
              <p>
                Latitude: {location.latitude}, Longitude: {location.longitude}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

// Function to get the custom icon with location name below the marker
function getCustomIcon(locationName, iconSize) {
  return L.divIcon({
    html: `<div><center><img src="../img/bus-school.png" alt="Custom Icon" style="width:130%" /><h6 style="font-weight:600; color:red;">${locationName}</h6></center></div>`,
    iconSize: iconSize, // Use the provided icon siz
    iconAnchor: [iconSize[0] / 2, iconSize[1]], // Set the anchor point of the icon (center bottom)
  });
}

export default MultipleLocationsMap;
