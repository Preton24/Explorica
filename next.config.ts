import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sketchbubble.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bombayantiques.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mediacloud.saffronart.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.ompure.co.in',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
