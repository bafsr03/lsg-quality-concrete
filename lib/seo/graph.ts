import { BUSINESS, SITE_URL, type Locale } from '@/lib/site'

/**
 * Stable @id values. Every page references the business by @id and never
 * re-declares its properties — redeclaring the entity per page with slightly
 * different data is the most common local-SEO schema error, and it is what the
 * old Yoast output did.
 */
export const ID = {
  org: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
} as const

/** Reference a node declared elsewhere in the graph. */
export const ref = (id: string) => ({ '@id': id })

export function organizationNode() {
  return {
    '@type': 'GeneralContractor',
    '@id': ID.org,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    telephone: BUSINESS.phone.e164,
    email: BUSINESS.email,
    priceRange: '$$',
    // Service-area business: locality and region, no street line.
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.locality,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    geo: { '@type': 'GeoCoordinates', ...BUSINESS.geo },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: BUSINESS.hours.opens,
      closes: BUSINESS.hours.closes,
    },
    // Omitted until verified: aggregateRating (needs real counts backed by
    // reviews rendered on the page) and any licence identifier.
    ...(BUSINESS.aggregateRating
      ? { aggregateRating: { '@type': 'AggregateRating', ...BUSINESS.aggregateRating } }
      : {}),
  }
}

export function websiteNode(locale: Locale) {
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    url: SITE_URL,
    name: BUSINESS.name,
    publisher: ref(ID.org),
    inLanguage: locale === 'es' ? 'es-US' : 'en-US',
  }
}

export function breadcrumbNode(trail: Array<{ name: string; path: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: new URL(t.path, SITE_URL).toString(),
    })),
  }
}

export function graph(nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}
