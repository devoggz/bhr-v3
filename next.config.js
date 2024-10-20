/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    reactStrictMode: true,
    eslint: {
      ignoreDuringBuilds: true,
    },
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/**",
      },
    ],
  },
};
