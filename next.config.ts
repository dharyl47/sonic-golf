// next.config.ts
import withPWA from 'next-pwa';
import type { NextConfig } from 'next';
import runtimeCaching from 'next-pwa/cache'; // ✅ built-in defaults

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
      },
    ],
  },
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching, // ✅ use next-pwa's default smart caching
})(nextConfig);
