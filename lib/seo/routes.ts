import { publishedServices } from '@/content/services'
import { publishedCities } from '@/content/cities'
import { servicePath, cityPath } from '@/lib/content/resolve'

export type RouteEntry = {
  enPath: string
  /** null where the route is deliberately English-only. */
  esPath: string | null
  priority: number
  changeFrequency: 'weekly' | 'monthly' | 'yearly'
}

/**
 * Single source of truth for every indexable route.
 *
 * sitemap.ts, the hreflang helper and the CI reciprocity check all read this,
 * so a route cannot appear in the sitemap with alternates that the page itself
 * does not emit.
 */
export function routeRegistry(): RouteEntry[] {
  const statics: RouteEntry[] = [
    { enPath: '/', esPath: '/es/', priority: 1.0, changeFrequency: 'monthly' },
    { enPath: '/services/', esPath: '/es/servicios/', priority: 0.9, changeFrequency: 'monthly' },
    { enPath: '/gallery/', esPath: '/es/galeria/', priority: 0.7, changeFrequency: 'monthly' },
    { enPath: '/reviews/', esPath: '/es/resenas/', priority: 0.7, changeFrequency: 'monthly' },
    { enPath: '/about/', esPath: '/es/nosotros/', priority: 0.6, changeFrequency: 'yearly' },
    { enPath: '/contact/', esPath: '/es/contacto/', priority: 0.8, changeFrequency: 'yearly' },
    { enPath: '/free-estimate/', esPath: '/es/presupuesto/', priority: 0.9, changeFrequency: 'yearly' },
  ]

  const services: RouteEntry[] = publishedServices.map((s) => ({
    enPath: servicePath(s, 'en'),
    esPath: servicePath(s, 'es'),
    priority: 0.8,
    changeFrequency: 'monthly',
  }))

  const cities: RouteEntry[] = publishedCities.map((c) => ({
    enPath: cityPath(c, 'en'),
    esPath: cityPath(c, 'es'),
    priority: 0.8,
    changeFrequency: 'monthly',
  }))

  return [...statics, ...services, ...cities]
}
