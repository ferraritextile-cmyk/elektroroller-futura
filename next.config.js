/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
