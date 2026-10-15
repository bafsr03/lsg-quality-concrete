import { BUSINESS, type Locale } from '@/lib/site'
import type { Division } from '@/content/schema'

/**
 * True where a trade is performed by licensed partners rather than LSG itself.
 * Flip BUSINESS.licensedTrades when the owner holds the licence and every
 * page in that trade drops the partner wording.
 */
export function byPartner(d: Division): boolean {
  if (!d.licensedPartner) return false
  const held = BUSINESS.licensedTrades as Record<string, boolean>
  return !held[d.id]
}

/** H1 for a trade hub: "Concrete contractor in Utah County". */
export const tradeHeading = (d: Division, locale: Locale) =>
  locale === 'es' ? `${d.trade.es} en el Condado de Utah` : `${d.trade.en} in Utah County`

/** H1 for a trade x city page: "Concrete contractor in Lehi". */
export const tradeCityHeading = (d: Division, city: string, locale: Locale) =>
  locale === 'es' ? `${d.trade.es} en ${city}` : `${d.trade.en} in ${city}`
