/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Compress for faster Time-to-First-Byte (Core Web Vitals = ranking signal)
  compress: true,
  // Cache static salary pages at the CDN edge for 1 hour
  async headers() {
    return [
      {
        source: '/salary/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
    ];
  },
};

export default nextConfig;
