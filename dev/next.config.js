const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@grace-studio/graceful-next'],
  images: {
    loader: 'custom',
    loaderFile: './src/image-loader.ts',
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'www.unfinishedman.com',
      },
      {
        protocol: 'https',
        hostname: 'img.gracestudio.io',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
