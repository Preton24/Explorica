import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { destinations } from '@/lib/constants';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star } from 'lucide-react';
import Image from 'next/image';

export default function HighlightedDestinations() {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-bold">
            Featured Destinations
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Journey through the most captivating eco-tourism and cultural spots in
            Jharkhand.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.slice(0, 3).map(dest => {
            const destImage = PlaceHolderImages.find(img => img.id === dest.image);
            return (
              <Link href="/destinations" key={dest.id} className="block">
                <Card className="overflow-hidden group h-full">
                  <CardHeader className="p-0 relative h-64">
                     {destImage && (
                      <Image
                        src={destImage.imageUrl}
                        alt={dest.name}
                        data-ai-hint={destImage.imageHint}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <CardTitle as="h3" className="text-white font-headline text-2xl">
                        {dest.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardDescription>{dest.description}</CardDescription>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="font-bold">{dest.rating}</span>
                        <span className="text-sm text-muted-foreground"> (20+ reviews)</span>
                      </div>
                      <span className="text-sm font-medium py-1 px-3 rounded-full bg-primary/10 text-primary">
                        {dest.category}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
