/**
 * Verified business facts, captured from the live WordPress site.
 *
 * Anything the owner still has to confirm is marked UNCONFIRMED and is not
 * rendered anywhere until it is resolved. That is deliberate: this is a
 * contractor, and licensing and review claims carry real legal and
 * manual-action risk if they ship wrong.
 */
/**
 * The production origin (https://lsggeneralcontractor.com). It comes from the
 * environment so previews stay noindex; the fallback is only for local builds.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lsggeneralcontractor.example').replace(/\/$/, '')

/**
 * Search engines may index only the real production deployment. Preview URLs,
 * local builds and the placeholder origin all ship noindex.
 */
export const INDEXABLE =
  process.env.VERCEL_ENV === 'production' && !!process.env.NEXT_PUBLIC_SITE_URL && !SITE_URL.endsWith('.example')

export const BUSINESS = {
  /** Canonical spelling. The old site used "L.S.G", Yelp and the state
   *  registration use "LSG". One spelling everywhere, or citations fragment. */
  /** Matches the domain (lsggeneralcontractor.com). The logo art still reads
   *  "LSG CONTRACTORS / GENERAL SERVICES": matching it needs new art in brand/source/
   *  and a re-run of scripts/build-brand.mjs. */
  name: 'LSG General Contractor',
  shortName: 'LSG',
  /** Trading name of the existing LLC (a DBA), so licence, insurance and EIN
   *  stay with the entity that holds them. */
  legalName: 'LSG Quality Concrete, LLC',
  owner: 'Lenin Guzman',

  phone: { display: '(435) 849-5193', href: 'tel:+14358495193', e164: '+14358495193' },
  email: 'lsgqualityconcrete@gmail.com',

  /** Service-area business: no street address is published anywhere, so the
   *  schema carries locality/region only — no PostalAddress street line.
   *  UNCONFIRMED: whether a street address exists for the Business Profile. */
  locality: 'Eagle Mountain',
  region: 'UT',
  postalCode: '84005',
  country: 'US',
  geo: { latitude: 40.3141, longitude: -112.0069 },

  hours: { days: 'Mo-Sa', opens: '08:00', closes: '18:00' },

  /** UNCONFIRMED: site says "over 15 years", Angi and HomeAdvisor say 20. */
  yearsExperience: 15,

  /** UNCONFIRMED — do not render. Public records suggest Utah DOPL
   *  12415601-5501 (S260) may have expired Nov 2023. No licensing claim ships
   *  until this is verified at the DOPL lookup. */
  license: null as { number: string; classification: string } | null,

  /** UNCONFIRMED — do not render. AggregateRating markup requires real,
   *  verifiable counts backed by reviews displayed on the page. */
  aggregateRating: null as { ratingValue: number; reviewCount: number } | null,

  /**
   * Trades LSG is licensed to perform itself. Where false, that trade's pages
   * say the work is performed by Utah-licensed partners — Utah does not allow
   * advertising electrical or plumbing work without the licence.
   */
  licensedTrades: { electrical: false, plumbing: false },

  offers: { seniorDiscountPct: 10, referralRewardUsd: 100, freeEstimates: true },
} as const

export const LOCALES = ['en', 'es'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'
