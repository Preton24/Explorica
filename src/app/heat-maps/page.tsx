
'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AreaChart, ShieldCheck, Thermometer, Wind, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import dynamic from 'next/dynamic';

const HeatMap = dynamic(() => import('@/components/maps/HeatMap'), {
  ssr: false,
  loading: () => (
    <div className="flex aspect-video mt-4 rounded-lg items-center justify-center bg-muted">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  ),
});


function PersonalExposureScore() {
  return (
    <Card className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <ShieldCheck className="text-primary" />
          Personal Exposure Score
        </CardTitle>
        <CardDescription>
          Your composite risk based on current conditions in Ranchi.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Overall Risk</span>
            <span className="text-sm font-bold text-yellow-500">Moderate</span>
          </div>
          <Progress value={55} className="h-2" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
            <Wind className="w-8 h-8 text-primary mb-2" />
            <span className="font-bold text-lg">68</span>
            <span className="text-xs text-muted-foreground">AQI</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
            <Thermometer className="w-8 h-8 text-primary mb-2" />
            <span className="font-bold text-lg">28°C</span>
            <span className="text-xs text-muted-foreground">Temperature</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
            <ShieldCheck className="w-8 h-8 text-primary mb-2" />
            <span className="font-bold text-lg">Low</span>
            <span className="text-xs text-muted-foreground">Safety Index</span>
          </div>
        </div>
        <Alert>
          <AlertDescription>
            Tip: Air quality is moderate. Consider wearing a mask if you have respiratory sensitivities. Stay hydrated.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}

type MapType = 'aqi' | 'weather' | 'safety';

export default function HeatMapsPage() {
  const [mapType, setMapType] = useState<MapType>('aqi');

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <AreaChart className="mx-auto h-16 w-16 text-primary" />
        <h1 className="font-headline text-5xl font-bold mt-4">Environmental Heat Maps</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Stay informed with real-time AQI, weather, and safety data for your travel destinations.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="glass-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
            <CardContent className="p-4">
              <Tabs defaultValue="aqi" onValueChange={(value) => setMapType(value as MapType)} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="aqi">AQI</TabsTrigger>
                  <TabsTrigger value="weather">Weather</TabsTrigger>
                  <TabsTrigger value="safety">Safety Index</TabsTrigger>
                </TabsList>
              </Tabs>
              <HeatMap mapType={mapType} />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <PersonalExposureScore />
        </div>
      </div>
    </div>
  );
}
