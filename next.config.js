/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["ecommerce-nine-bay.vercel.app"],
  },
};

module.exports = nextConfig;
