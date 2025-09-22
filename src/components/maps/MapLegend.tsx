// src/components/maps/MapLegend.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wind, Thermometer, ShieldCheck } from 'lucide-react';

interface MapLegendProps {
  mapType: 'aqi' | 'weather' | 'safety';
}

// AQI Legend: Dark Blue (Good) -> Light Blue (Moderate) -> Yellow -> Orange -> Red (Hazardous)
const AqiLegend = () => (
  <div>
    <h3 className="font-semibold text-lg mb-2">AQI Levels:</h3>
    <div className="w-full h-20 bg-gradient-to-r from-blue-900 via-blue-400 via-yellow-400 via-orange-500 to-red-600 rounded-lg mb-2"></div>
    <div className="flex justify-between text-sm">
      <span>0 (Good)</span>
      <span>150 (Unhealthy)</span>
      <span>300 (Hazardous)</span>
    </div>
    <p className="text-xs text-muted-foreground mt-2">
      (Values are illustrative and based on a continuous scale)
    </p>
  </div>
);

// Weather Legend: Blue/Green (Cool) -> Yellow/Orange (Mild) -> Red (Hot)
const WeatherLegend = () => (
  <div>
    <h3 className="font-semibold text-lg mb-2">Max. Temperature (°C):</h3>
    <div className="w-full h-20 bg-gradient-to-r from-cyan-500 via-yellow-500 to-red-500 rounded-lg mb-2"></div>
    <div className="flex justify-between text-sm">
      <span>25 (Cool)</span>
      <span>30 (Mild)</span>
      <span>35 (Hot)</span>
    </div>
    <p className="text-xs text-muted-foreground mt-2">
      (Values are illustrative and based on a continuous scale)
    </p>
  </div>
);

// Safety Legend: Red (Low Safety) -> Yellow (Moderate Safety) -> Green (High Safety)
const SafetyLegend = () => (
  <div>
    <h3 className="font-semibold text-lg mb-2">Safety Index:</h3>
    <div className="w-full h-20 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 rounded-lg mb-2"></div>
    <div className="flex justify-between text-sm">
      <span>0 (Low)</span>
      <span>5 (Moderate)</span>
      <span>10 (High)</span>
    </div>
    <p className="text-xs text-muted-foreground mt-2">
      (Values are illustrative and based on a continuous scale)
    </p>
  </div>
);

export default function MapLegend({ mapType }: MapLegendProps) {
  let title = '';
  let icon = null;
  let content = null;

  switch (mapType) {
    case 'aqi':
      title = 'AQI Map Legend';
      icon = <Wind className="text-primary" />;
      content = <AqiLegend />;
      break;
    case 'weather':
      title = 'Temperature Map Legend';
      icon = <Thermometer className="text-primary" />;
      content = <WeatherLegend />;
      break;
    case 'safety':
      title = 'Safety Map Legend';
      icon = <ShieldCheck className="text-primary" />;
      content = <SafetyLegend />;
      break;
    default:
      return null;
  }

  return (
    <Card className="glass-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
    </Card>
  );
}