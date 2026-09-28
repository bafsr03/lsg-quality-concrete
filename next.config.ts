import type { NextConfig } from 'next'
import { legacyRedirects } from './lib/seo/redirects'

const nextConfig: NextConfig = {
  // Every legacy WordPress URL ends in a slash. Without this, each one costs an
  // extra redirect hop on top of whatever the 301 map already does.
  trailingSlash: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    // Required from Next 16 — unrestricted quality values let anyone spend our
    // optimizer budget. 70 for gallery thumbs, 80 for heroes and case studies.
    qualities: [70, 80],
    localPatterns: [{ pathname: '/images/**' }],
  },

  typedRoutes: true,

  async redirects() {
    return legacyRedirects()
  },
}

export default nextConfig
