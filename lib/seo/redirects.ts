import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { services } from '../../content/services'
import { cities } from '../../content/cities'
import { divisions } from '../../content/divisions'

/** Shape Next expects from `redirects()`. Declared locally rather than imported
 *  from a deep internal path, which is not a stable public export. */
type Redirect = { source: string; destination: string; permanent: boolean }

type MediaEntry = { source: { original: string } }

/**
 * The old site was six pages. All six keep their URL — preserving a URL preserves
 * its equity, so we redirect only where structure genuinely changed.
 */
const STRUCTURAL: Redirect[] = [
  // The old single "Concrete" page now IS a page again — the concrete trade
  // hub at /concrete/ — so it needs no redirect.
  // Destinations keep their trailing slash to match trailingSlash: true —
  // without it every redirect costs a second hop to add the slash back.
  // Empty custom-post-type archive that Yoast was still indexing.
  { source: '/project', destination: '/gallery/', permanent: true },
]

/**
 * Paths that belong to real pages and must never be shadowed by a generated
 * attachment redirect.
 *
 * This is not hypothetical: the media library contains "reviews.jpg", whose
 * attachment slug is /reviews — the exact path of the reviews page. Redirects
 * are evaluated before routing, so without this guard the reviews page was
 * unreachable, 308ing to the gallery.
 */
function reservedPaths(): Set<string> {
  const reserved = new Set([
    '', 'services', 'service-areas', 'gallery', 'reviews', 'about', 'contact', 'free-estimate', 'es',
  ])
  for (const d of divisions) {
    reserved.add(d.slug.en)
    reserved.add(d.slug.es)
  }
  for (const r of previewRedirects()) reserved.add(r.source.slice(1))
  return reserved
}

/**
 * Before the multi-trade restructure, services and cities lived at flat
 * top-level slugs (/concrete-driveways/, /concrete-contractor-lehi/). Those
 * preview links were shared with the owner and the team, so they keep working.
 */
const FLAT_SERVICE_SLUGS: Record<string, { en: string; es: string }> = {
  driveways: { en: 'concrete-driveways', es: 'entradas-de-concreto' },
  patios: { en: 'concrete-patios', es: 'patios-de-concreto' },
  walkways: { en: 'concrete-walkways', es: 'andadores-de-concreto' },
  steps: { en: 'concrete-steps', es: 'escalones-de-concreto' },
  floors: { en: 'concrete-floors', es: 'pisos-de-concreto' },
  repair: { en: 'concrete-repair', es: 'reparacion-de-concreto' },
  basement: { en: 'basement-concrete', es: 'concreto-para-sotanos' },
  'rv-pads': { en: 'rv-pads', es: 'plataformas-para-casas-rodantes' },
}

function previewRedirects(): Redirect[] {
  const concrete = divisions.find((d) => d.id === 'concrete')!
  const out: Redirect[] = []
  for (const s of services) {
    const flat = FLAT_SERVICE_SLUGS[s.id]
    if (!flat || s.status !== 'published') continue
    out.push({ source: `/${flat.en}`, destination: `/${concrete.slug.en}/${s.slug.en}/`, permanent: true })
    out.push({ source: `/es/${flat.es}`, destination: `/es/${concrete.slug.es}/${s.slug.es}/`, permanent: true })
  }
  for (const c of cities) {
    if (c.status !== 'published') continue
    out.push({ source: `/concrete-contractor-${c.id}`, destination: `/${concrete.slug.en}/${c.slug.en}/`, permanent: true })
    out.push({ source: `/es/contratista-de-concreto-${c.id}`, destination: `/es/${concrete.slug.es}/${c.slug.es}/`, permanent: true })
  }
  return out
}

export const slugifyAttachment = (filename: string) =>
  filename
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/**
 * WordPress generated a standalone attachment page per upload — 102 thin,
 * orphaned, indexable pages holding one image and no content. They dilute crawl
 * budget, but some carry image-search traffic, so they 301 rather than 410.
 *
 * Read from disk rather than imported: this module is evaluated while Next
 * compiles next.config.ts, where the `@/` alias does not exist.
 */
function attachmentRedirects(): Redirect[] {
  const path = join(process.cwd(), 'content/generated/media-manifest.json')
  const media: MediaEntry[] = JSON.parse(readFileSync(path, 'utf8'))

  const reserved = reservedPaths()
  const seen = new Set<string>()
  const out: Redirect[] = []
  for (const m of media) {
    const slug = slugifyAttachment(m.source.original)
    if (!slug || seen.has(slug) || reserved.has(slug)) continue
    seen.add(slug)
    // Refined per-image once gallery projects exist; until then every
    // attachment lands on the gallery index rather than a 404.
    out.push({ source: `/${slug}`, destination: '/gallery/', permanent: true })
  }
  return out
}

export function legacyRedirects(): Redirect[] {
  return [...STRUCTURAL, ...previewRedirects(), ...attachmentRedirects()]
}
