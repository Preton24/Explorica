import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MoveRight, View } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-1');

  return (
    <section className="relative h-[80vh] w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 via-purple-500/80 to-yellow-500/80"></div>
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        
        <div className="absolute top-8 right-8">
            <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10 rounded-full" aria-label="AR/VR Preview">
                <View className="h-6 w-6" />
                <span className="sr-only">AR/VR Preview</span>
            </Button>
        </div>

        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight drop-shadow-2xl">
          Explore the Heart of India
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90 drop-shadow-lg">
          Discover Jharkhand's hidden gems, from breathtaking waterfalls to ancient temples.
          Your unforgettable journey begins here.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="rounded-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/smart-planner">
              Plan My Trip
              <MoveRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="rounded-full h-12 text-base font-semibold bg-white/10 border border-white/30 text-white backdrop-blur-sm hover:bg-white/20"
          >
            <Link href="/destinations">
              Explore Destinations
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
