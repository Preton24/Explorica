'use client';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

type HeatMapProps = {
  mapType: 'aqi' | 'weather' | 'safety';
};

const mapTitles = {
  aqi: 'Live AQI Map',
  weather: 'Live Weather Map',
  safety: 'Live Safety Index Map',
};

const mapOverlays = {
  aqi: 'bg-black/30',
  weather: 'bg-blue-900/30',
  safety: 'bg-green-900/30',
};

export default function HeatMap({ mapType }: HeatMapProps) {
  const position = { lat: 23.3441, lng: 85.3096 }; // Ranchi, Jharkhand

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="relative aspect-video mt-4 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
        <div className="text-center text-muted-foreground">
            <p>Google Maps API Key is missing.</p>
            <p className="text-xs">Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env file.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative aspect-video mt-4 rounded-lg overflow-hidden">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map
          defaultCenter={position}
          defaultZoom={10}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapId={`explorica-${mapType}-map`}
        />
      </APIProvider>
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${mapOverlays[mapType]}`}>
          <h2 className="text-3xl font-bold text-white font-headline">{mapTitles[mapType]}</h2>
      </div>
    </div>
  );
}
