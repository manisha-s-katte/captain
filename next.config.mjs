/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable remote images from specified hosts
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wteevsttakocypgyobcb.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com', // Add Amazon's media domain for your use case
      },
    ],
  },
  // Customize webpack configuration
  webpack(config) {
    config.optimization.minimize = false;
    return config;
  },
};

export default nextConfig;
