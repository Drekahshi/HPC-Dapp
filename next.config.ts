import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // enable helpful defaults
  reactStrictMode: true,
  swcMinify: true,

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
    ],
  },

  // redirect /apps to external studio URL
  async redirects() {
    return [
      {
        source: '/apps',
        destination: 'https://studio-one-beryl.vercel.app/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
