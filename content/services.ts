import { Service, type DivisionId } from './schema'
import { concreteServices } from './services/concrete'
import { landscapingServices } from './services/landscaping'
import { remodelingServices } from './services/remodeling'
import { electricalServices } from './services/electrical'
import { plumbingServices } from './services/plumbing'

/**
 * Every service, grouped by trade. Copy is written per service and never
 * templated across services — one file per trade under content/services/.
 */
export const services = Service.array().parse([
  ...concreteServices,
  ...landscapingServices,
  ...remodelingServices,
  ...electricalServices,
  ...plumbingServices,
])

export const publishedServices = services.filter((s) => s.status === 'published')

export const servicesIn = (division: DivisionId) => publishedServices.filter((s) => s.division === division)

// Build-time integrity: ids unique, slugs unique inside their folder, and every
// cross-trade link points at a real, published service.
{
  const ids = new Set<string>()
  const slugs = new Set<string>()
  for (const s of services) {
    if (ids.has(s.id)) throw new Error(`Duplicate service id "${s.id}"`)
    ids.add(s.id)
    for (const l of ['en', 'es'] as const) {
      const key = `${s.division}/${l}/${s.slug[l]}`
      if (slugs.has(key)) throw new Error(`Duplicate service slug ${key}`)
      slugs.add(key)
    }
  }
  const live = new Set(publishedServices.map((s) => s.id))
  for (const s of publishedServices) {
    for (const p of s.pairsWith) {
      if (!live.has(p)) throw new Error(`Service "${s.id}" pairsWith unknown or unpublished "${p}"`)
    }
  }
}
