// src/components/maps/InteractiveMap.tsx
'use client';

import React from 'react';
import { GoogleMap, useLoadScript, HeatmapLayer, Marker } from '@react-google-maps/api';
import { Loader2 } from 'lucide-react';

interface InteractiveMapProps {
  mapType: 'aqi' | 'weather' | 'safety';
  center?: { lat: number; lng: number };
  zoom?: number;
}

const libraries: ('drawing' | 'geometry' | 'localContext' | 'places' | 'visualization')[] = [
  'visualization', // Required for HeatmapLayer
];

// Define specific colors for consistency (for AQI)
const DARK_BLUE_AQI = 'rgb(0, 0, 150)';
const LIGHT_BLUE_AQI = 'rgb(100, 200, 255)';
const RED_AQI = 'rgb(255, 0, 0)';

export default function InteractiveMap({
  mapType,
  center = { lat: 23.6, lng: 85.5 }, // Approximate geographical center of Jharkhand
  zoom = 8, // A lower zoom level to show more of the state
}: InteractiveMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey || '',
    libraries,
  });

  // Helper function to generate random coordinates within Jharkhand's approximate bounds
  const generateRandomJharkhandCoordinate = (minLat: number, maxLat: number, minLng: number, maxLng: number, weight?: number) => {
    const lat = minLat + Math.random() * (maxLat - minLat);
    const lng = minLng + Math.random() * (maxLng - minLng);
    return { lat, lng, weight: weight !== undefined ? weight : Math.random() };
  };

  // Generate AQI data with 3 distinct categories for weights (0.1, 0.5, 0.9)
  const rawAqiData = React.useMemo(() => {
    const data = [];
    const minLat = 21.9;
    const maxLat = 25.5;
    const minLng = 83.5;
    const maxLng = 87.9;

    for (let i = 0; i < 70; i++) {
      const category = Math.floor(Math.random() * 3); // 0, 1, or 2
      let weight;
      if (category === 0) weight = 0.1; // Corresponds to DARK_BLUE_AQI
      else if (category === 1) weight = 0.5; // Corresponds to LIGHT_BLUE_AQI
      else weight = 0.9; // Corresponds to RED_AQI
      data.push(generateRandomJharkhandCoordinate(minLat, maxLat, minLng, maxLng, weight));
    }
    return data;
  }, []);

  // Generate Weather data with random weights
  const rawWeatherData = React.useMemo(() => {
    const data = [];
    const minLat = 21.9;
    const maxLat = 25.5;
    const minLng = 83.5;
    const maxLng = 87.9;

    for (let i = 0; i < 70; i++) {
      data.push(generateRandomJharkhandCoordinate(minLat, maxLat, minLng, maxLng, Math.random()));
    }
    return data;
  }, []);

  // Placeholder safety markers (unchanged)
  const rawSafetyMarkers = React.useMemo(() => [
    { lat: 23.348, lng: 85.312, title: 'High Traffic Area', icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' },
    { lat: 23.335, lng: 85.300, title: 'Quiet Neighborhood', icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' },
    { lat: 23.352, lng: 85.308, title: 'Market Area (Moderate Risk)', icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png' },
  ], []);


  const renderMap = () => {
    if (loadError) return <div>Error loading maps. Check your API key.</div>;
    if (!isLoaded) return <div className="flex justify-center items-center h-full min-h-[500px]"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

    const aqiHeatmapData = rawAqiData.map(data =>
      new window.google.maps.LatLng(data.lat, data.lng, data.weight)
    );

    const weatherHeatmapData = rawWeatherData.map(data =>
      new window.google.maps.LatLng(data.lat, data.lng, data.weight)
    );

    return (
      <GoogleMap mapContainerStyle={{ width: '100%', height: '500px' }} center={center} zoom={zoom}>
        {mapType === 'aqi' && (
          <HeatmapLayer
            data={aqiHeatmapData}
            options={{
              radius: 30, // Slightly larger radius for clearer bands
              opacity: 0.7,
              // Gradient for AQI: Dark Blue (Good) -> Light Blue (Moderate) -> Red (Unhealthy)
              gradient: [
                'rgba(0, 0, 150, 0)', // Transparent dark blue (start low)
                'rgba(0, 0, 150, 0.9)', // Dark Blue (Good)
                'rgba(100, 200, 255, 0.9)', // Light Blue (Moderate)
                'rgba(255, 0, 0, 0.9)', // Red (Unhealthy)
              ],
            }}
          />
        )}
        {mapType === 'weather' && (
             <HeatmapLayer
             data={weatherHeatmapData}
             options={{
               radius: 20,
               opacity: 0.7,
               // Gradient for Weather (e.g., Temperature): Transparent Green (cooler) -> Yellow (moderate) -> Red (hotter)
               gradient: [
                 'rgba(0, 255, 0, 0)',   // Transparent Green
                 'rgba(0, 255, 0, 0.7)', // Green
                 'rgba(255, 255, 0, 0.8)',// Yellow
                 'rgba(255, 0, 0, 0.9)',  // Red
               ],
             }}
           />
        )}
        {mapType === 'safety' && rawSafetyMarkers.map((marker, index) => (
            <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} title={marker.title} icon={marker.icon} />
        ))}
      </GoogleMap>
    );
  };

  return <div className="map-container">{renderMap()}</div>;
}