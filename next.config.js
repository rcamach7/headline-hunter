/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com", "https://lh3.googleusercontent.com", "localhost", "cdn.weatherapi.com"],
  },
};

module.exports = nextConfig;
