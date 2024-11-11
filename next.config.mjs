// next.config.js
const nextConfig = {
  // Other configurations...
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
    ],
  },
  webpack(config) {
    config.optimization.minimize = false;
    return config;
  },
};

export default nextConfig;
