const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  rewrites: async () => {
    return [
      {
        source: '/lives',
        destination: '/',
      },
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV !== 'production' ? '/api/:path*' : `${apiUrl}/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      }, // sample domain for test
      {
        protocol: 'https',
        hostname: 'api.funch.site',
      },
      {
        protocol: 'https',
        hostname: 'kr.object.ncloudstorage.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
