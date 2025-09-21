'use client';
import Hero from '@/components/sections/Hero';
import HighlightedDestinations from '@/components/sections/HighlightedDestinations';
import Testimonials from '@/components/sections/Testimonials';
import SearchBar from '@/components/sections/SearchBar';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <SearchBar />
      <HighlightedDestinations />
      <Testimonials />
    </div>
  );
}
