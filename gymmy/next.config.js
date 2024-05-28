/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/',
          destination: 'http://15.228.39.212:3001',
        },
      ]
    },
  }

module.exports = nextConfig;