import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { routeRegistry } from '@/lib/seo/routes'

export const dynamic = 'error'

export default function sitemap(): MetadataRoute.Sitemap {
  const abs = (p: string) => new URL(p, SITE_URL).toString()

  return routeRegistry().map((r) => ({
    url: abs(r.enPath),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
    // Omitted entirely for English-only routes, mirroring what the page's own
    // <head> emits. A sitemap alternate the page does not declare is the
    // classic way hreflang goes non-reciprocal.
    ...(r.esPath
      ? {
          alternates: {
            languages: {
              'en-US': abs(r.enPath),
              'es-US': abs(r.esPath),
              'x-default': abs(r.enPath),
            },
          },
        }
      : {}),
  }))
}
