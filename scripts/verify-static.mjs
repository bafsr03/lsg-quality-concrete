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
const METADATA_ROUTES = new Set(['/favicon.ico', '/sitemap.xml', '/robots.txt', '/opengraph-image'])

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

if (problems.length) {
  console.error('✗ static verification failed:')
  for (const p of problems) console.error('  - ' + p)
  process.exit(1)
}
console.log(`✓ all ${prerendered.size} routes prerendered, none revalidating`)
