import { Division, type DivisionId } from './schema'
import { concreteDivision } from './services/concrete'
import { landscapingDivision } from './services/landscaping'
import { remodelingDivision } from './services/remodeling'
import { electricalDivision } from './services/electrical'
import { plumbingDivision } from './services/plumbing'
import { servicesIn } from './services'

/** The trades, in the order they appear in menus. */
export const divisions = Division.array().parse([
  concreteDivision,
  landscapingDivision,
  remodelingDivision,
  electricalDivision,
  plumbingDivision,
])

/** A trade with no live services has no page, no menu entry and no sitemap
 *  line — an empty hub is a thin page. */
export const publishedDivisions = divisions.filter((d) => servicesIn(d.id).length > 0)

export function division(id: DivisionId) {
  const d = divisions.find((x) => x.id === id)
  if (!d) throw new Error(`Unknown division "${id}"`)
  return d
}
