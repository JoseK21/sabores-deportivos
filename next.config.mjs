/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // port: "",
        // pathname: "/account123/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        // port: "",
        // pathname: "/account123/**",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        // port: "",
        // pathname: "/account123/**",
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
