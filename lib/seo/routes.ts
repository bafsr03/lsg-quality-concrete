import { publishedServices } from '@/content/services'
import { publishedCities } from '@/content/cities'
import { publishedDivisions } from '@/content/divisions'
import { publishedCombos } from '@/content/combos'
import { cityPath, comboPath, divisionPath, servicePath } from '@/lib/content/resolve'
import { pathPair, type StaticPageKey } from '@/lib/i18n/paths'

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
  const page = (key: StaticPageKey, priority: number, changeFrequency: RouteEntry['changeFrequency']): RouteEntry => ({
    enPath: pathPair(key).en,
    esPath: pathPair(key).es,
    priority,
    changeFrequency,
  })

  const statics: RouteEntry[] = [
    page('home', 1.0, 'monthly'),
    page('services', 0.8, 'monthly'),
    page('serviceAreas', 0.8, 'monthly'),
    page('gallery', 0.7, 'monthly'),
    page('reviews', 0.7, 'monthly'),
    page('about', 0.6, 'yearly'),
    page('contact', 0.8, 'yearly'),
    page('estimate', 0.9, 'yearly'),
  ]

  const pair = <T,>(items: T[], fn: (x: T, l: 'en' | 'es') => string, priority: number): RouteEntry[] =>
    items.map((x) => ({ enPath: fn(x, 'en'), esPath: fn(x, 'es'), priority, changeFrequency: 'monthly' }))

  return [
    ...statics,
    ...pair(publishedDivisions, divisionPath, 0.9),
    ...pair(publishedServices, servicePath, 0.8),
    ...pair(publishedCities, cityPath, 0.8),
    ...pair(publishedCombos, comboPath, 0.7),
  ]
}
