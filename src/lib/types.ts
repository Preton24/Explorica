import type { LucideIcon } from 'lucide-react';

export type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type Destination = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  rating: number;
  category: 'Eco-tourism' | 'Cultural' | 'Adventure' | 'Spiritual';
};

export type Testimonial = {
  id: string;
  name: string;
  avatar: string;
  text: string;
  location: string;
};
