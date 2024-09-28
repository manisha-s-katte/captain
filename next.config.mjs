// next.config.js
const nextConfig = {
  // Other configurations...
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wteevsttakocypgyobcb.supabase.co',
      },
    ],
  },
  webpack(config) {
    config.optimization.minimize = false;
    return config;
  },
};

export default nextConfig;
