/**
 * Asserts the build stayed fully static.
 *
 * `dynamic = 'error'` catches request-time APIs at build, but it cannot catch a
 * route that was never given generateStaticParams. This reads the build output
 * directly so a regression fails CI rather than quietly shipping serverless
 * renders for 47 marketing pages.
 */
import { readFile } from 'node:fs/promises'

/** The only server surface the site is allowed to have. */
const ALLOWED_DYNAMIC = new Set(['/api/quote'])

/** Next emits these as route handlers, but they are static metadata files. */
const METADATA_ROUTES = new Set([
  '/favicon.ico', '/sitemap.xml', '/robots.txt',
  '/icon.png', '/apple-icon.png', '/opengraph-image',
])

const manifest = JSON.parse(await readFile('.next/prerender-manifest.json', 'utf8'))
const appPaths = JSON.parse(await readFile('.next/app-path-routes-manifest.json', 'utf8'))

const prerendered = new Set(Object.keys(manifest.routes ?? {}))
const problems = []

for (const [file, route] of Object.entries(appPaths)) {
  if (METADATA_ROUTES.has(route)) continue
  if (route.startsWith('/api/') || file.endsWith('/route')) {
    if (!ALLOWED_DYNAMIC.has(route)) problems.push(`${route} is a route handler that is not on the allow-list`)
    continue
  }
  if (route.includes('[')) continue // dynamic segments are listed by their concrete paths
  if (!prerendered.has(route) && route !== '/_not-found') {
    problems.push(`${route} was not prerendered`)
  }
}

const revalidating = Object.entries(manifest.routes ?? {})
  .filter(([, v]) => v.initialRevalidateSeconds !== false)
  .map(([k]) => k)
if (revalidating.length) problems.push(`routes with revalidation set: ${revalidating.join(', ')}`)

/**
 * Every URL the generated sitemap advertises must actually exist in the build.
 * Reading the built sitemap rather than the registry source means this checks
 * what Google will really be handed — a registry entry for a page nobody
 * created would otherwise publish a 404 into the index.
 */
const sitemapXml = await readFile('.next/server/app/sitemap.xml.body', 'utf8')
const locs = [
  ...[...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]),
  // Alternates are advertised just as loudly as the canonical URLs.
  ...[...sitemapXml.matchAll(/<xhtml:link[^>]+href="([^"]+)"/g)].map((m) => m[1]),
]
const norm = (u) => {
  const p = new URL(u).pathname
  return p.length > 1 ? p.replace(/\/$/, '') : p
}
if (!locs.length) problems.push('sitemap.xml contains no <loc> entries')
for (const loc of locs) {
  const route = norm(loc)
  if (!prerendered.has(route)) problems.push(`${loc} is in sitemap.xml but ${route} was not built`)
}

if (problems.length) {
  console.error('✗ static verification failed:')
  for (const p of problems) console.error('  - ' + p)
  process.exit(1)
}
console.log(`✓ all ${prerendered.size} routes prerendered, none revalidating`)
