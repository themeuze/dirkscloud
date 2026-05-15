import type { NextConfig } from 'next'
import { HEADER_ENTRIES } from './lib/security-headers'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: HEADER_ENTRIES,
      },
    ]
  },
}

export default nextConfig
