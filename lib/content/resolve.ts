import type { Route } from 'next'
import { publishedServices } from '@/content/services'
import { publishedCities } from '@/content/cities'
import { publishedDivisions, division as divisionById } from '@/content/divisions'
import { publishedCombos } from '@/content/combos'
import type { Locale } from '@/lib/site'
import type { City, Combo, Division, Service } from '@/content/schema'

/**
 * URL shape — one folder per trade, so every page sits in a single topical
 * silo and the breadcrumb reads Brand › Trade › Page:
 *
 *   /concrete/                    trade hub
 *   /concrete/driveways/          service
 *   /concrete/lehi/               trade x city (only where a combo exists)
 *   /service-areas/lehi/          city hub, every trade
 *
 * Spanish mirrors it with translated slugs under /es/. Paths carry the trailing
 * slash the site uses. Typed as Route because these come from content data,
 * which typedRoutes cannot enumerate — generateStaticParams is the guarantee.
 */
const prefix = (locale: Locale) => (locale === 'en' ? '' : '/es')

export const divisionPath = (d: Division, locale: Locale) => `${prefix(locale)}/${d.slug[locale]}/` as Route

export const servicePath = (s: Service, locale: Locale) =>
  `${divisionPath(divisionById(s.division), locale)}${s.slug[locale]}/` as Route

const AREAS = { en: 'service-areas', es: 'areas-de-servicio' } as const
export const cityPath = (c: City, locale: Locale) => `${prefix(locale)}/${AREAS[locale]}/${c.slug[locale]}/` as Route

export const cityOf = (combo: Combo) => {
  const c = publishedCities.find((x) => x.id === combo.cityId)
  if (!c) throw new Error(`Combo references unpublished city "${combo.cityId}"`)
  return c
}

export const comboPath = (combo: Combo, locale: Locale) =>
  `${divisionPath(divisionById(combo.division), locale)}${cityOf(combo).slug[locale]}/` as Route

export function resolveDivision(locale: Locale, slug: string): Division | null {
  return publishedDivisions.find((d) => d.slug[locale] === slug) ?? null
}

export type Leaf =
  | { kind: 'service'; division: Division; service: Service }
  | { kind: 'combo'; division: Division; combo: Combo; city: City }

/** Resolves /<trade>/<slug>/ to a service or a trade x city page. */
export function resolveLeaf(locale: Locale, divisionSlug: string, slug: string): Leaf | null {
  const division = resolveDivision(locale, divisionSlug)
  if (!division) return null

  const service = publishedServices.find((s) => s.division === division.id && s.slug[locale] === slug)
  if (service) return { kind: 'service', division, service }

  const combo = publishedCombos.find((c) => c.division === division.id && cityOf(c).slug[locale] === slug)
  if (combo) return { kind: 'combo', division, combo, city: cityOf(combo) }

  return null
}

export function resolveCity(locale: Locale, slug: string): City | null {
  return publishedCities.find((c) => c.slug[locale] === slug) ?? null
}

export const divisionParams = (locale: Locale) => publishedDivisions.map((d) => ({ division: d.slug[locale] }))

export const leafParams = (locale: Locale) => [
  ...publishedServices.map((s) => ({ division: divisionById(s.division).slug[locale], slug: s.slug[locale] })),
  ...publishedCombos.map((c) => ({ division: divisionById(c.division).slug[locale], slug: cityOf(c).slug[locale] })),
]

export const cityParams = (locale: Locale) => publishedCities.map((c) => ({ city: c.slug[locale] }))

/** Trade x city pages that exist for a city, in trade order. */
export const combosForCity = (cityId: string) => publishedCombos.filter((c) => c.cityId === cityId)
export const combosForDivision = (id: Division['id']) => publishedCombos.filter((c) => c.division === id)
