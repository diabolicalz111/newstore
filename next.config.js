/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com', // Replace with your image domain
        pathname: '/**', // Allow all paths
      },
      {
        protocol: 'https',
        hostname: 'another-example.com', // Add additional domains as needed
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
