import { MountainSnow } from 'lucide-react';

export function Logo() {
  return (
    <a href="/" className="flex items-center gap-2" aria-label="Back to homepage">
      <MountainSnow className="h-7 w-7 text-primary" />
      <span className="font-headline text-2xl font-bold text-foreground">
        Jharkhand Journey
      </span>
    </a>
  );
}
