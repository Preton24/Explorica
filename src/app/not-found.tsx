import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center text-center py-20">
      <MapPin className="w-24 h-24 text-primary/50 mb-4" />
      <h1 className="text-6xl font-headline font-bold">404</h1>
      <h2 className="text-2xl font-semibold mt-4 mb-2">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        Oops! It seems you've taken a wrong turn. The page you're looking for doesn't exist.
      </p>
      <Button asChild>
        <Link href="/">Go Back Home</Link>
      </Button>
    </div>
  );
}
