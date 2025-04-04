// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //swcMinify: true,        removed for now
  experimental: {
    // Add other experimental features here if needed
  },
  // Remove the webpack configuration if using Turbopack
}

module.exports = nextConfig
