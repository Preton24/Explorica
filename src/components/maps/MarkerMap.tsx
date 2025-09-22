// src/components/maps/MarkerMap.tsx
'use client';

import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Loader2 } from 'lucide-react';

interface MarkerData {
  lat: number;
  lng: number;
  title: string;
  icon?: string | google.maps.Icon | google.maps.Symbol; // Optional custom icon path or Google Maps Symbol
}

interface MarkerMapProps {
  markers: MarkerData[];
  center?: { lat: number; lng: number };
  zoom?: number;
}

const libraries: ('geometry' | 'places')[] = []; // Only geometry and places might be useful, no visualization

export default function MarkerMap({
  markers,
  center = { lat: 23.6, lng: 85.5 }, // Approximate geographical center of Jharkhand
  zoom = 8, // A lower zoom level to show more of the state
}: MarkerMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey || '',
    libraries,
  });

  const mapOptions = React.useMemo(() => ({
    disableDefaultUI: false, // Keep default UI enabled for basic controls
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  }), []);

  const renderMap = () => {
    if (loadError) return <div>Error loading maps. Check your API key.</div>;
    if (!isLoaded) return <div className="flex justify-center items-center h-full min-h-[500px]"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

    return (
      <GoogleMap mapContainerStyle={{ width: '100%', height: '500px' }} center={center} zoom={zoom} options={mapOptions}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            label={{
              text: marker.title,
              color: 'white', // Text color for the label
              fontWeight: 'bold',
              fontSize: '14px', // Larger font size for prominence
            }}
            options={{
              // Using a default Google Maps pin icon with a custom color if needed
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE, // Or leave default for standard pin
                fillColor: 'red', // Example fill color for the pin
                fillOpacity: 1,
                strokeWeight: 1,
                scale: 10, // Size of the pin icon
              },
              title: marker.title, // Title for hover tooltip
            }}
          />
        ))}
      </GoogleMap>
    );
  };

  return <div className="map-container">{renderMap()}</div>;
}