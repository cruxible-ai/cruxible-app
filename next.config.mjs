/** @type {import('next').NextConfig} */
const nextConfig = {
  // Redirect old /landing URL to root
  async redirects() {
    return [
      {
        source: '/landing',
        destination: '/',
        permanent: true,
      },
    ];
  },
  // Proxy API requests to FastAPI backend during development
  // Exclude /api/upload/* and /api/merchants which are handled by Next.js API routes
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    return [
      {
        source: '/api/upload/:path*',
        destination: '/api/upload/:path*', // Keep in Next.js
      },
      {
        source: '/api/merchants',
        destination: '/api/merchants', // Keep in Next.js
      },
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
