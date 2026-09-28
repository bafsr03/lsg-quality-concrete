/**
 * Indicative pricing model for the estimator.
 *
 * Deliberately dependency-free plain TypeScript: this module is imported by a
 * client component, and anything it imports ships to every visitor.
 *
 * These are INDICATIVE RANGES built from 2026 Utah installed rates, not a
 * quote. Real numbers depend on access, subgrade, haul-off and how level the
 * site is, which is why every output is a range and every screen says the
 * figure is confirmed on a site visit. Nothing here should ever be presented
 * as a fixed price.
 */

export type Unit = 'area' | 'steps'

export type ServiceRate = {
  id: string
  unit: Unit
  /** $ per square foot installed, or $ per step for stair work. */
  low: number
  high: number
}

export const SERVICE_RATES: ServiceRate[] = [
  { id: 'driveways', unit: 'area', low: 8, high: 12 },
  { id: 'patios', unit: 'area', low: 10, high: 15 },
  { id: 'walkways', unit: 'area', low: 9, high: 14 },
  { id: 'steps', unit: 'steps', low: 180, high: 350 },
  { id: 'floors', unit: 'area', low: 7, high: 11 },
  { id: 'repair', unit: 'area', low: 6, high: 10 },
  { id: 'basement', unit: 'area', low: 7, high: 10 },
  { id: 'rv-pads', unit: 'area', low: 9, high: 13 },
]

/** Per-square-foot adjustments, applied only to area-priced work. */
export const MODIFIERS = {
  /** Breaking out and hauling away an existing slab. */
  tearOut: { low: 2, high: 4 },
  /** Colour hardener, release and stamping, plus the sealer schedule. */
  stamped: { low: 4, high: 7 },
  /** Exposed aggregate wash and seal. */
  exposed: { low: 2, high: 4 },
  /** Six-inch slab and rebar rather than four-inch and mesh. */
  heavyDuty: { low: 1.5, high: 2.5 },
  /** Pump or conveyor where a truck cannot reach the pour. */
  hardAccess: { low: 1, high: 2 },
} as const

/** Below this it is not worth mobilising a crew and a truck. */
export const JOB_MINIMUM = 1500

export type EstimateInput = {
  serviceId: string
  lengthFt: number
  widthFt: number
  stepCount: number
  tearOut: boolean
  finish: 'broom' | 'stamped' | 'exposed'
  heavyDuty: boolean
  hardAccess: boolean
}

export type Estimate = {
  low: number
  high: number
  /** Square feet, or step count for stair work. */
  quantity: number
  unit: Unit
  /** True when the job minimum is doing the work rather than the rate. */
  atMinimum: boolean
}

const round = (n: number) => Math.round(n / 50) * 50

export function estimate(input: EstimateInput): Estimate | null {
  const rate = SERVICE_RATES.find((r) => r.id === input.serviceId)
  if (!rate) return null

  if (rate.unit === 'steps') {
    const count = Math.max(0, Math.floor(input.stepCount))
    if (count <= 0) return null
    const low = Math.max(JOB_MINIMUM, round(count * rate.low))
    const high = Math.max(JOB_MINIMUM + 500, round(count * rate.high))
    return { low, high, quantity: count, unit: 'steps', atMinimum: count * rate.low < JOB_MINIMUM }
  }

  const area = Math.max(0, input.lengthFt) * Math.max(0, input.widthFt)
  if (area <= 0) return null

  let low = rate.low
  let high = rate.high
  if (input.tearOut) { low += MODIFIERS.tearOut.low; high += MODIFIERS.tearOut.high }
  if (input.finish === 'stamped') { low += MODIFIERS.stamped.low; high += MODIFIERS.stamped.high }
  if (input.finish === 'exposed') { low += MODIFIERS.exposed.low; high += MODIFIERS.exposed.high }
  if (input.heavyDuty) { low += MODIFIERS.heavyDuty.low; high += MODIFIERS.heavyDuty.high }
  if (input.hardAccess) { low += MODIFIERS.hardAccess.low; high += MODIFIERS.hardAccess.high }

  const rawLow = area * low
  return {
    low: Math.max(JOB_MINIMUM, round(rawLow)),
    high: Math.max(JOB_MINIMUM + 500, round(area * high)),
    quantity: Math.round(area),
    unit: 'area',
    atMinimum: rawLow < JOB_MINIMUM,
  }
}

export const formatUsd = (n: number, locale: string) =>
  new Intl.NumberFormat(locale === 'es' ? 'es-US' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
