// src/components/maps/JharkhandChoroplethMap.tsx
'use client';

import React from 'react';
import { GoogleMap, useLoadScript, Polygon, Marker } from '@react-google-maps/api';
import { Loader2 } from 'lucide-react';

interface JharkhandChoroplethMapProps {
  mapType: 'aqi' | 'weather' | 'safety';
  center?: { lat: number; lng: number };
  zoom?: number;
}

const libraries: ('geometry' | 'places' | 'visualization')[] = []; // No visualization needed for polygons directly

// --- BEGIN Placeholder Jharkhand District GeoJSON Data (Simplified & Simulated) ---
// In a real app, you would load this from an actual GeoJSON file.
// This data simulates a few districts with placeholder coordinates and various values.
interface DistrictData {
  name: string;
  coordinates: google.maps.LatLngLiteral[][]; // Array of paths, each path is an array of LatLngLiterals
  temperature: number; // Placeholder temperature value for choropleth
  aqi: number;         // Placeholder AQI value
  safetyIndex: number; // Placeholder safety index (higher is safer)
  centroid: { lat: number; lng: number }; // For placing district name markers
}

const getPlaceholderJharkhandDistrictData = (): DistrictData[] => [
  {
    name: 'Ranchi',
    coordinates: [
      [
        { lat: 23.18, lng: 85.16 }, { lat: 23.12, lng: 85.45 }, { lat: 23.35, lng: 85.60 },
        { lat: 23.55, lng: 85.50 }, { lat: 23.50, lng: 85.25 }, { lat: 23.18, lng: 85.16 }
      ],
    ],
    temperature: 28 + Math.random() * 8, // Temp: ~28-36°C
    aqi: 50 + Math.random() * 150,     // AQI: ~50-200
    safetyIndex: 6 + Math.random() * 4, // Safety: ~6-10
    centroid: { lat: 23.3, lng: 85.35 },
  },
  {
    name: 'East Singhbhum',
    coordinates: [
      [
        { lat: 22.45, lng: 86.00 }, { lat: 22.30, lng: 86.40 }, { lat: 22.00, lng: 86.30 },
        { lat: 22.15, lng: 85.90 }, { lat: 22.45, lng: 86.00 }
      ],
    ],
    temperature: 30 + Math.random() * 8, // Temp: ~30-38°C
    aqi: 100 + Math.random() * 200,    // AQI: ~100-300
    safetyIndex: 4 + Math.random() * 4, // Safety: ~4-8
    centroid: { lat: 22.25, lng: 86.15 },
  },
  {
    name: 'Dhanbad',
    coordinates: [
      [
        { lat: 23.65, lng: 86.10 }, { lat: 23.50, lng: 86.50 }, { lat: 23.70, lng: 86.80 },
        { lat: 23.90, lng: 86.45 }, { lat: 23.65, lng: 86.10 }
      ],
    ],
    temperature: 27 + Math.random() * 8, // Temp: ~27-35°C
    aqi: 150 + Math.random() * 150,    // AQI: ~150-300
    safetyIndex: 5 + Math.random() * 4, // Safety: ~5-9
    centroid: { lat: 23.7, lng: 86.45 },
  },
  {
    name: 'Palamu',
    coordinates: [
      [
        { lat: 23.80, lng: 83.80 }, { lat: 23.50, lng: 84.40 }, { lat: 24.00, lng: 84.60 },
        { lat: 24.50, lng: 84.10 }, { lat: 23.80, lng: 83.80 }
      ],
    ],
    temperature: 32 + Math.random() * 8, // Temp: ~32-40°C
    aqi: 70 + Math.random() * 130,     // AQI: ~70-200
    safetyIndex: 7 + Math.random() * 3, // Safety: ~7-10
    centroid: { lat: 24.0, lng: 84.2 },
  },
  {
    name: 'Godda',
    coordinates: [
      [
        { lat: 24.80, lng: 87.00 }, { lat: 24.50, lng: 87.40 }, { lat: 25.10, lng: 87.50 },
        { lat: 25.40, lng: 87.10 }, { lat: 24.80, lng: 87.00 }
      ],
    ],
    temperature: 25 + Math.random() * 8, // Temp: ~25-33°C
    aqi: 30 + Math.random() * 100,     // AQI: ~30-130
    safetyIndex: 8 + Math.random() * 2, // Safety: ~8-10
    centroid: { lat: 24.95, lng: 87.25 },
  },
  {
    name: 'Chatra',
    coordinates: [
      [
        { lat: 23.90, lng: 84.50 }, { lat: 23.60, lng: 84.90 }, { lat: 23.95, lng: 85.30 },
        { lat: 24.30, lng: 85.00 }, { lat: 23.90, lng: 84.50 }
      ],
    ],
    temperature: 29 + Math.random() * 8, // Temp: ~29-37°C
    aqi: 80 + Math.random() * 120,     // AQI: ~80-200
    safetyIndex: 5 + Math.random() * 3, // Safety: ~5-8
    centroid: { lat: 23.9, lng: 84.9 },
  },
  // Add more placeholder districts here to cover Jharkhand more comprehensively
  // with varied lat/lng and values for better visualization.
  {
    name: 'Gumla',
    coordinates: [
      [
        { lat: 22.8, lng: 84.2 }, { lat: 22.5, lng: 84.6 }, { lat: 22.8, lng: 85.0 },
        { lat: 23.1, lng: 84.8 }, { lat: 23.3, lng: 84.5 }, { lat: 22.8, lng: 84.2 }
      ],
    ],
    temperature: 26 + Math.random() * 8, // Temp: ~26-34°C
    aqi: 60 + Math.random() * 100,     // AQI: ~60-160
    safetyIndex: 7 + Math.random() * 3, // Safety: ~7-10
    centroid: { lat: 22.95, lng: 84.6 },
  },
  {
    name: 'Hazaribagh',
    coordinates: [
      [
        { lat: 23.9, lng: 85.3 }, { lat: 23.6, lng: 85.7 }, { lat: 24.0, lng: 86.0 },
        { lat: 24.3, lng: 85.7 }, { lat: 24.2, lng: 85.2 }, { lat: 23.9, lng: 85.3 }
      ],
    ],
    temperature: 27 + Math.random() * 8, // Temp: ~27-35°C
    aqi: 90 + Math.random() * 150,     // AQI: ~90-240
    safetyIndex: 6 + Math.random() * 4, // Safety: ~6-10
    centroid: { lat: 23.95, lng: 85.6 },
  },
];
// --- END Placeholder Jharkhand District GeoJSON Data ---


// --- Color Mapping Functions for different data types ---
const getColorForTemperature = (temp: number): string => {
  // Scale: Blue/Green (lower) -> Yellow/Orange (mid) -> Red (higher)
  const minTemp = 25; // Adjusted min temp for the sample data
  const maxTemp = 35; // Adjusted max temp for the sample data
  const normalizedTemp = Math.max(0, Math.min(1, (temp - minTemp) / (maxTemp - minTemp)));

  if (normalizedTemp < 0.2) return `rgb(0, 150, 200, 0.7)`;   // Dark Cyan-Blue
  if (normalizedTemp < 0.4) return `rgb(0, 200, 100, 0.7)`;   // Green-Blue
  if (normalizedTemp < 0.6) return `rgb(150, 255, 0, 0.7)`;   // Green-Yellow
  if (normalizedTemp < 0.8) return `rgb(255, 150, 0, 0.7)`;   // Orange
  return `rgb(255, 0, 0, 0.7)`;                           // Red
};

const getColorForAqi = (aqi: number): string => {
  // Scale: Dark Blue (Good) -> Light Blue (Moderate) -> Red (Unhealthy/Hazardous)
  const minAqi = 0;
  const maxAqi = 300; // Common max AQI for categories
  const normalizedAqi = Math.max(0, Math.min(1, (aqi - minAqi) / (maxAqi - minAqi)));

  if (normalizedAqi < 0.2) return `rgb(0, 0, 150, 0.7)`;   // Dark Blue (Good)
  if (normalizedAqi < 0.4) return `rgb(100, 200, 255, 0.7)`; // Light Blue (Moderate)
  if (normalizedAqi < 0.6) return `rgb(255, 255, 0, 0.7)`; // Yellow (Unhealthy for Sensitive)
  if (normalizedAqi < 0.8) return `rgb(255, 150, 0, 0.7)`; // Orange (Unhealthy)
  return `rgb(255, 0, 0, 0.7)`;                         // Red (Hazardous)
};

const getColorForSafetyIndex = (safetyIndex: number): string => {
  // Scale: Red (Low Safety) -> Yellow (Moderate Safety) -> Green (High Safety)
  const minSafety = 0;
  const maxSafety = 10; // Assuming 0-10 scale where 10 is safest
  const normalizedSafety = Math.max(0, Math.min(1, (safetyIndex - minSafety) / (maxSafety - minSafety)));

  if (normalizedSafety < 0.3) return `rgb(255, 0, 0, 0.7)`;     // Red (Low Safety)
  if (normalizedSafety < 0.6) return `rgb(255, 165, 0, 0.7)`;   // Orange (Medium-Low Safety)
  if (normalizedSafety < 0.8) return `rgb(255, 255, 0, 0.7)`;   // Yellow (Moderate Safety)
  return `rgb(0, 200, 0, 0.7)`;                               // Green (High Safety)
};

// Main function to get color based on mapType and district data
const getChoroplethFillColor = (district: DistrictData, mapType: JharkhandChoroplethMapProps['mapType']): string => {
  switch (mapType) {
    case 'weather':
      return getColorForTemperature(district.temperature);
    case 'aqi':
      return getColorForAqi(district.aqi);
    case 'safety':
      return getColorForSafetyIndex(district.safetyIndex);
    default:
      return 'rgba(128, 128, 128, 0.5)'; // Default grey
  }
};
// --- End Color Mapping Functions ---


export default function JharkhandChoroplethMap({
  mapType,
  center = { lat: 23.6, lng: 85.5 }, // Approximate geographical center of Jharkhand
  zoom = 8, // A lower zoom level to show more of the state
}: JharkhandChoroplethMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey || '',
    libraries,
  });

  const districtData = React.useMemo(() => getPlaceholderJharkhandDistrictData(), []);

  const mapOptions = React.useMemo(() => ({
    disableDefaultUI: false, // Keep default UI enabled for basic controls like zoom, map type, and scale
    mapTypeControl: true,
    scaleControl: true, // This enables the scale bar
    // The North arrow is typically part of the default UI.
    // If you need more specific control, you'd disableDefaultUI and add custom controls.
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  }), []);


  const renderMap = () => {
    if (loadError) return <div>Error loading maps. Check your API key.</div>;
    if (!isLoaded) return <div className="flex justify-center items-center h-full min-h-[500px]"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

    return (
      <GoogleMap mapContainerStyle={{ width: '100%', height: '500px' }} center={center} zoom={zoom} options={mapOptions}>
        {districtData.map((district, index) => (
          <React.Fragment key={district.name}>
            <Polygon
              paths={district.coordinates}
              options={{
                strokeColor: '#000000', // Black outline for districts
                strokeOpacity: 0.8,
                strokeWeight: 1, // Thinner outline
                fillColor: getChoroplethFillColor(district, mapType),
                fillOpacity: 0.7,
              }}
            />
            {/* Marker to display district name */}
            <Marker
              position={district.centroid}
              label={{
                text: district.name,
                color: 'white', // Choose a color that stands out on the map's colors
                fontWeight: 'bold',
                fontSize: '12px',
              }}
              options={{
                icon: {
                  // Transparent 1x1 pixel image to hide the default marker icon
                  url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
                  scaledSize: new window.google.maps.Size(1, 1),
                },
              }}
            />
          </React.Fragment>
        ))}
      </GoogleMap>
    );
  };

  return <div className="map-container">{renderMap()}</div>;
}