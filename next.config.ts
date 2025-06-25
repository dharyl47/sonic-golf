// next.config.ts
import withPWA from 'next-pwa';
import type { NextConfig } from 'next';
import runtimeCaching from 'next-pwa/cache';

const customRuntimeCaching = [
  ...runtimeCaching,
  {
    urlPattern: /^\/$/, // cache the root document
    handler: 'NetworkFirst',
    options: {
      cacheName: 'start-url',
      expiration: {
        maxEntries: 1,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      },
      networkTimeoutSeconds: 3,
      cacheableResponse: {
        statuses: [0, 200],
      },
    },
  },
];

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
  runtimeCaching: customRuntimeCaching,
})(nextConfig);
