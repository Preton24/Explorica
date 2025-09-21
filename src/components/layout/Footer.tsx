import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Logo } from '../Logo';

export function Footer() {
  return (
    <footer className="bg-muted/40 border-t mt-16">
      <div className="container py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-muted-foreground text-sm">
              Discover the soul of India. Your journey into the heart of
              Jharkhand's nature and culture starts here.
            </p>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/destinations" className="text-sm text-muted-foreground hover:text-primary">Destinations</a></li>
              <li><a href="/smart-planner" className="text-sm text-muted-foreground hover:text-primary">Smart Planner</a></li>
              <li><a href="/bookings" className="text-sm text-muted-foreground hover:text-primary">My Bookings</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">About Us</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Contact</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Sustainability Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary"><Twitter /></a>
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary"><Facebook /></a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Explorica. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
