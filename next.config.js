/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "1mpqnsnwtmsmmt72.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
