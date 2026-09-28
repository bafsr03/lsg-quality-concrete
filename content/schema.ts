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

export const Service = z.object({
  id: z.string(),
  slug: Localized,
  name: Localized,
  /** One line, used on cards and as the page lede. */
  lede: Localized,
  seo: LocalizedSeo,
  /** Body paragraphs. Written per service, never templated across services. */
  body: z.object({ en: z.array(z.string().min(80)), es: z.array(z.string().min(80)) }),
  /** Build spec shown as a small data block — the detail competitors omit. */
  spec: z.array(z.object({ label: Localized, value: Localized })),
  heroImageId: z.string(),
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
  slug: Localized,
  name: z.string(),
  county: z.string(),
  /** Genuinely local, not a find-and-replace of the city name. */
  localDetail: Localized,
  seo: LocalizedSeo,
  /** Drive time from the Eagle Mountain base, in minutes. Orders the list by
   *  how real the coverage is rather than by alphabet. */
  driveMinutes: z.number().int().positive(),
  status: z.enum(['published', 'pending']).default('published'),
})
export type City = z.infer<typeof City>

export const Faq = z.object({
  id: z.string(),
  question: Localized,
  answer: Localized,
  /** Which service pages this FAQ belongs on. Empty means site-wide. */
  serviceIds: z.array(z.string()).default([]),
})
export type Faq = z.infer<typeof Faq>

/**
 * A service x city landing page.
 *
 * The gate is structural, not a policy: a combo cannot exist without a real
 * project photo and a substantial paragraph of genuinely local content. This is
 * what stops the 99-cell matrix of thin pages that the competitors shipped.
 */
export const Combo = z.object({
  serviceId: z.string(),
  cityId: z.string(),
  /** English only. The matrix is deliberately not translated. */
  slug: z.string().min(8),
  imageId: z.string().min(1),
  localDetail: z.string().min(180),
})
export type Combo = z.infer<typeof Combo>
