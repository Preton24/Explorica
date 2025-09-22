import {
  Map,
  Plane,
  Bot,
  AreaChart,
  Leaf,
  LayoutDashboard,
  Home,
  User,
  Star,
  MountainSnow,
  ShoppingCart,
} from 'lucide-react';
import type { NavLink, Destination, Testimonial } from './types';

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/destinations', label: 'Destinations', icon: Map },
  { href: '/bookings', label: 'Bookings', icon: Plane },
  { href: '/cart', label: 'Cart', icon: ShoppingCart },
  { href: '/smart-planner', label: 'Smart Planner', icon: Bot },
  { href: '/heat-maps', label: 'Heat Maps', icon: AreaChart },
  { href: '/sustainability-tips', label: 'Sustainability', icon: Leaf },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export const destinations: Destination[] = [
  {
    id: 'netarhat',
    name: 'Netarhat',
    slug: 'netarhat',
    description: "Known as the 'Queen of Chotanagpur', famous for its glorious sunrises and sunsets.",
    image: 'dest-netarhat',
    rating: 4.8,
    category: 'Eco-tourism',
  },
  {
    id: 'patratu-valley',
    name: 'Patratu Valley',
    slug: 'patratu-valley',
    description: 'A mesmerizing valley with winding roads, lush greenery, and a dam at its base.',
    image: 'dest-patratu',
    rating: 4.7,
    category: 'Adventure',
  },
  {
    id: 'betla-national-park',
    name: 'Betla National Park',
    slug: 'betla-national-park',
    description: 'A diverse wildlife sanctuary, home to elephants, tigers, and a variety of bird species.',
    image: 'dest-betla',
    rating: 4.6,
    category: 'Eco-tourism',
  },
  {
    id: 'hundru-falls',
    name: 'Hundru Falls',
    slug: 'hundru-falls',
    description: 'A spectacular waterfall where the Subarnarekha River falls from a height of 98 meters.',
    image: 'dest-hundru',
    rating: 4.9,
    category: 'Eco-tourism',
  },
  {
    id: 'deoghar',
    name: 'Deoghar',
    slug: 'deoghar',
    description: 'A major Hindu pilgrimage site, home to the Baidyanath Temple, one of the twelve Jyotirlingas.',
    image: 'dest-deoghar',
    rating: 4.5,
    category: 'Spiritual',
  },
   {
    id: 'ranchi',
    name: 'Ranchi',
    slug: 'ranchi',
    description: 'The capital city, offering a blend of urban culture and natural rock formations.',
    image: 'dest-ranchi',
    rating: 4.4,
    category: 'Cultural',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    avatar: 'avatar-1',
    location: 'Mumbai, India',
    text: 'The AI trip planner was a game-changer! It created a perfect itinerary for our family trip to Netarhat. The homestay recommendations were spot on.',
  },
  {
    id: '2',
    name: 'Alex Johnson',
    avatar: 'avatar-2',
    location: 'London, UK',
    text: "An incredible experience exploring Jharkhand's cultural heritage. The platform made booking guides and activities so seamless. The sustainability tips were a great touch!",
  },
  {
    id: '3',
    name: 'Rohan Gupta',
    avatar: 'avatar-3',
    location: 'Delhi, India',
    text: 'I loved the focus on eco-tourism. Betla National Park was breathtaking. The app is super easy to use and looks amazing. Highly recommended for conscious travelers.',
  },
];
