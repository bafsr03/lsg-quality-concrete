import type { MetadataRoute } from 'next'
import { INDEXABLE, SITE_URL } from '@/lib/site'

export const dynamic = 'error'

export default function robots(): MetadataRoute.Robots {
  // Outside production every page also carries a noindex meta tag. Crawling
  // stays allowed so that tag can be seen; robots.txt alone does not deindex.
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    ...(INDEXABLE ? { sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL } : {}),
  }
}
