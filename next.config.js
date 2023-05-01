/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com", "https://lh3.googleusercontent.com", "localhost", "cdn.weatherapi.com"],
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    if (process.env.NEXT_PUBLIC_IS_TEST_ENV === "true") {
      return defaultPathMap;
    }

    const productionPathMap = { ...defaultPathMap };

    Object.keys(defaultPathMap).forEach((path) => {
      if (path.includes("/test/")) {
        delete productionPathMap[path];
      }
    });

    return productionPathMap;
  },
};

module.exports = nextConfig;
