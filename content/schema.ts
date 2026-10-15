import { z } from 'zod'

/** Every user-facing string exists in both locales or the build fails. */
export const Localized = z.object({ en: z.string().min(1), es: z.string().min(1) })
export type Localized = z.infer<typeof Localized>

export const Seo = z.object({
  // Google truncates around 60/160. Enforcing the ceiling stops the slow drift
  // back toward the old site, whose titles carried no keyword and no city.
  title: z.string().min(20).max(62),
  description: z.string().min(70).max(165),
})

export const LocalizedSeo = z.object({ en: Seo, es: Seo })

const LocalizedBody = z.object({ en: z.array(z.string().min(80)), es: z.array(z.string().min(80)) })

/**
 * The trades. Each one is a top-level URL folder (/concrete/, /landscaping/ …)
 * so every service sits inside a single topical silo, and the breadcrumb in
 * the results reads Brand › Trade › Service.
 */
export const DIVISION_IDS = ['concrete', 'landscaping', 'remodeling', 'electrical', 'plumbing'] as const
export const DivisionId = z.enum(DIVISION_IDS)
export type DivisionId = z.infer<typeof DivisionId>

export const Division = z.object({
  id: DivisionId,
  slug: Localized,
  /** Short label for menus and chips: "Concrete", "Landscaping". */
  name: Localized,
  /** The searched-for job title, used in trade×city headings:
   *  "Concrete contractor", "Landscaper". */
  trade: Localized,
  lede: Localized,
  seo: LocalizedSeo,
  body: LocalizedBody,
  heroImageId: z.string().optional(),
  /**
   * Utah only lets a licensed contractor advertise electrical or plumbing work.
   * Where LSG does not hold that licence the trade is coordinated by LSG and
   * performed by licensed partners, and every page in it says so.
   */
  licensedPartner: z.boolean().default(false),
  faqs: z.array(z.object({ question: Localized, answer: Localized })).default([]),
})
export type Division = z.infer<typeof Division>

export const Service = z.object({
  id: z.string(),
  division: DivisionId,
  /** Relative to the division folder: /concrete/<slug>/. */
  slug: Localized,
  name: Localized,
  /** One line, used on cards and as the page lede. */
  lede: Localized,
  seo: LocalizedSeo,
  /** Body paragraphs. Written per service, never templated across services. */
  body: LocalizedBody,
  /** Build spec shown as a small data block — the detail competitors omit. */
  spec: z.array(z.object({ label: Localized, value: Localized })),
  /** Optional: a trade with no real job photos yet gets the typographic hero
   *  rather than a stock photo pretending to be our work. */
  heroImageId: z.string().optional(),
  /** Service ids in other trades that are commonly done together — the
   *  cross-trade links that make one contractor worth calling. */
  pairsWith: z.array(z.string()).default([]),
  /**
   * 'published' generates a route. 'pending' keeps the content in the repo but
   * out of the build — used where we cannot yet confirm the business actually
   * offers the service. Claiming work they don't do is worse than a missing page.
   */
  status: z.enum(['published', 'pending']).default('published'),
})
export type Service = z.infer<typeof Service>

export const City = z.object({
  id: z.string(),
  /** Under /service-areas/ and /es/areas-de-servicio/, and the segment used
   *  for trade×city pages (/concrete/<slug>/). */
  slug: Localized,
  name: z.string(),
  county: z.string(),
  /** Genuinely local, not a find-and-replace of the city name. Written for the
   *  city hub, so it covers the place rather than one trade. */
  localDetail: Localized,
  seo: LocalizedSeo,
  /** Drive time from the Eagle Mountain base, in minutes. Orders the list by
   *  how real the coverage is rather than by alphabet. */
  driveMinutes: z.number().int().positive(),
  status: z.enum(['published', 'pending']).default('published'),
})
export type City = z.infer<typeof City>

/**
 * A trade x city landing page (/concrete/lehi/).
 *
 * The gate is structural, not a policy: a combo cannot exist without a real
 * project photo and a substantial paragraph of genuinely local content in both
 * languages. This is what stops the 55-cell matrix of thin doorway pages; until
 * a combo exists the city hub answers those searches.
 */
export const Combo = z.object({
  division: DivisionId,
  cityId: z.string(),
  imageId: z.string().min(1),
  localDetail: z.object({ en: z.string().min(180), es: z.string().min(180) }),
  seo: LocalizedSeo,
})
export type Combo = z.infer<typeof Combo>
