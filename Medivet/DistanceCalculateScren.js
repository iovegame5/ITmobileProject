import React from 'react';
import { View, Text } from 'react-native';
import * as geolib from 'geolib';

export default function App() {
  const distance = calculateDistance(37.786145805131405, -122.43755355477333, 37.77470113873802, -122.41976480931044); // Berlin to Paris

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Distance: {distance} km</Text>
    </View>
  );
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const distance = geolib.getDistance(
    { latitude: lat1, longitude: lon1 },
    { latitude: lat2, longitude: lon2 }
  );

  // Manually convert meters to kilometers (or other units as needed)
  const distanceInKm = distance / 1000;

  return distanceInKm;
}
