/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel-storage.com',
        port: '',
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/auth/login",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/auth/registro",
        headers: [
          {
            key: "r-key",
            value: "04-06-2002",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
