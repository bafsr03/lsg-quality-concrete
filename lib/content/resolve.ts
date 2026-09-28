import type { Route } from 'next'
import { publishedServices } from '@/content/services'
import { publishedCities } from '@/content/cities'
import type { Locale } from '@/lib/site'
import type { City, Service } from '@/content/schema'

export type Resolved =
  | { kind: 'service'; service: Service }
  | { kind: 'city'; city: City }

/**
 * Services, cities and the service x city matrix all live at the top level as
 * flat, keyword-exact slugs — that is the URL shape that actually ranks in this
 * metro. One dynamic segment resolves all of them; static segments such as
 * /services/ and /gallery/ still take precedence in the router.
 */
export function resolveSlug(locale: Locale, slug: string): Resolved | null {
  const service = publishedServices.find((s) => s.slug[locale] === slug)
  if (service) return { kind: 'service', service }

  const city = publishedCities.find((c) => c.slug[locale] === slug)
  if (city) return { kind: 'city', city }

  return null
}

export function allSlugs(locale: Locale): string[] {
  return [
    ...publishedServices.map((s) => s.slug[locale]),
    ...publishedCities.map((c) => c.slug[locale]),
  ]
}

/**
 * Path for an entity in a given locale, with the trailing slash the site uses.
 * Typed as Route because these slugs come from content data, which typedRoutes
 * cannot statically enumerate — the generateStaticParams list is the guarantee
 * that they resolve.
 */
export const servicePath = (s: Service, locale: Locale) =>
  (locale === 'en' ? `/${s.slug.en}/` : `/es/${s.slug.es}/`) as Route
export const cityPath = (c: City, locale: Locale) =>
  (locale === 'en' ? `/${c.slug.en}/` : `/es/${c.slug.es}/`) as Route
