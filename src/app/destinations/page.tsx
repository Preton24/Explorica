'use client';
import { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { destinations } from '@/lib/constants';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star, MapPin, View } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Category = 'All' | 'Eco-tourism' | 'Cultural' | 'Adventure' | 'Spiritual';

export default function DestinationsPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('All');

  const filters: Category[] = ['All', 'Eco-tourism', 'Cultural', 'Adventure', 'Spiritual'];
  const mapImage = PlaceHolderImages.find(img => img.id === 'map-placeholder');

  const filteredDestinations = destinations.filter(dest => 
    activeFilter === 'All' || dest.category === activeFilter
  );

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold">Explore Jharkhand</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Find your next adventure among the rich natural and cultural landscapes.
        </p>
      </div>

      <Card className="mb-12 glass-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
        <CardContent className="p-4">
          <div className="relative h-[500px] w-full rounded-lg overflow-hidden">
            {mapImage && (
              <Image
                src={mapImage.imageUrl}
                alt="Map of Jharkhand"
                data-ai-hint={mapImage.imageHint}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Button size="lg">View Interactive Map</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center flex-wrap gap-2 mb-8">
        {filters.map(filter => (
          <Button
            key={filter}
            variant={activeFilter === filter ? 'default' : 'outline'}
            onClick={() => setActiveFilter(filter)}
            className="rounded-full"
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDestinations.map(dest => {
          const destImage = PlaceHolderImages.find(img => img.id === dest.image);
          return (
            <Card key={dest.id} className="overflow-hidden group flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
              <CardHeader className="p-0 relative h-56">
                {destImage && (
                  <Image
                    src={destImage.imageUrl}
                    alt={dest.name}
                    data-ai-hint={destImage.imageHint}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                 <div className="absolute top-2 right-2 z-10">
                    <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50" aria-label="AR/VR Preview">
                        <View className="h-4 w-4" />
                        <span className="sr-only">AR/VR Preview</span>
                    </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 flex flex-col flex-grow">
                <CardTitle as="h3" className="font-headline text-xl mb-1">{dest.name}</CardTitle>
                <CardDescription className="text-sm flex-grow">{dest.description}</CardDescription>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-sm">{dest.rating}</span>
                  </div>
                  <Button asChild variant="secondary" size="sm">
                    <Link href={`/destinations/${dest.slug}`}>Explore</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}