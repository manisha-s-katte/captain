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
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
