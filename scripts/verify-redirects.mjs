/**
 * Redirect + reachability check against a running production server.
 *
 *   node scripts/verify-redirects.mjs http://localhost:4311
 *
 * This exists because two real bugs shipped past every other check:
 *   1. The media library contains "reviews.jpg", so the generated attachment
 *      redirect /reviews shadowed the actual reviews page — redirects are
 *      evaluated before routing, and the page became unreachable.
 *   2. Redirect destinations were written without a trailing slash, so every
 *      legacy URL took two hops instead of one, which is exactly what
 *      trailingSlash: true was supposed to prevent.
 * Neither is visible in the build output.
 */
const base = (process.argv[2] ?? 'http://localhost:4311').replace(/\/$/, '')

/** Pages that must answer 200 — any redirect here means a route got shadowed. */
const MUST_BE_200 = [
  '/', '/services/', '/gallery/', '/reviews/', '/about/', '/contact/', '/free-estimate/',
  '/concrete-driveways/', '/concrete-contractor-eagle-mountain/',
  '/es/', '/es/servicios/', '/es/galeria/', '/es/resenas/', '/es/nosotros/',
  '/es/contacto/', '/es/presupuesto/', '/es/entradas-de-concreto/',
  '/sitemap.xml', '/robots.txt',
]

/** Legacy WordPress URLs, and where each must land in exactly one hop. */
const MUST_REDIRECT = [
  ['/concrete/', '/services/'],
  ['/project/', '/gallery/'],
  ['/concrete-new-gallery-2/', '/gallery/'],
  ['/l-s-g-gallery-29/', '/gallery/'],
  ['/remodeling-17/', '/gallery/'],
]

const problems = []

for (const path of MUST_BE_200) {
  const res = await fetch(base + path, { redirect: 'manual' })
  if (res.status !== 200) problems.push(`${path} answered ${res.status}, expected 200`)
}

for (const [from, to] of MUST_REDIRECT) {
  const res = await fetch(base + from, { redirect: 'manual' })
  if (res.status !== 308 && res.status !== 301) {
    problems.push(`${from} answered ${res.status}, expected a permanent redirect`)
    continue
  }
  const location = new URL(res.headers.get('location'), base).pathname
  if (location !== to) {
    problems.push(`${from} redirects to ${location}, expected ${to}`)
    continue
  }
  // The destination itself must be final — no second hop to add a slash.
  const next = await fetch(base + location, { redirect: 'manual' })
  if (next.status !== 200) problems.push(`${from} -> ${location} is not final (${next.status})`)
}

const gone = await fetch(base + '/definitely-not-a-page/', { redirect: 'manual' })
if (gone.status !== 404) problems.push(`unknown paths answered ${gone.status}, expected 404`)

if (problems.length) {
  console.error('✗ redirect verification failed:')
  for (const p of problems) console.error('  - ' + p)
  process.exit(1)
}
console.log(`✓ ${MUST_BE_200.length} pages reachable, ${MUST_REDIRECT.length} legacy URLs redirect in one hop`)
