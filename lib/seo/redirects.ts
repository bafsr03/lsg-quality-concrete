import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { services } from '../../content/services'
import { cities } from '../../content/cities'

/** Shape Next expects from `redirects()`. Declared locally rather than imported
 *  from a deep internal path, which is not a stable public export. */
type Redirect = { source: string; destination: string; permanent: boolean }

type MediaEntry = { source: { original: string } }

/**
 * The old site was six pages. Five keep their URL — preserving a URL preserves
 * its equity, so we redirect only where structure genuinely changed.
 */
const STRUCTURAL: Redirect[] = [
  // The one real restructure: a single "Concrete" page becomes a services hub.
  // Destinations keep their trailing slash to match trailingSlash: true —
  // without it every redirect costs a second hop to add the slash back.
  { source: '/concrete', destination: '/services/', permanent: true },
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
    '', 'services', 'gallery', 'reviews', 'about', 'contact', 'free-estimate', 'es',
  ])
  for (const s of services) {
    reserved.add(s.slug.en)
    reserved.add(s.slug.es)
  }
  for (const c of cities) {
    reserved.add(c.slug.en)
    reserved.add(c.slug.es)
  }
  return reserved
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
  return [...STRUCTURAL, ...attachmentRedirects()]
}
