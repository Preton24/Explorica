'use client';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';


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
  const position: LatLngExpression = [23.3441, 85.3096]; // Ranchi, Jharkhand

  return (
    <div className="relative aspect-video mt-4 rounded-lg overflow-hidden z-0">
      <MapContainer center={position} zoom={10} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${mapOverlays[mapType]}`}>
          <h2 className="text-3xl font-bold text-white font-headline">{mapTitles[mapType]}</h2>
      </div>
    </div>
  );
}
