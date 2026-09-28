/**
 * Asserts hreflang is reciprocal across the built HTML.
 *
 * If the English page declares a Spanish alternate, the Spanish page must point
 * back, and English-only routes (the service x city matrix) must declare no
 * alternates at all. Non-reciprocal hreflang is the single most common way
 * multilingual SEO breaks silently, and it breaks without any visible symptom.
 */
import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'

const ROOT = '.next/server/app'

async function* htmlFiles(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) yield* htmlFiles(p)
    else if (e.name.endsWith('.html')) yield p
  }
}

const declared = new Map() // path -> { en, es, xdefault }

for await (const file of htmlFiles(ROOT)) {
  const html = await readFile(file, 'utf8')
  const alts = [...html.matchAll(/<link[^>]+rel="alternate"[^>]*>/g)].map((m) => m[0])
  const get = (lang) => {
    const tag = alts.find((a) => a.includes(`hreflang="${lang}"`))
    return tag?.match(/href="([^"]+)"/)?.[1] ?? null
  }
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1] ?? null
  if (!canonical) continue
  declared.set(canonical, { en: get('en-US'), es: get('es-US'), x: get('x-default') })
}

const problems = []
for (const [url, a] of declared) {
  const hasPair = a.en && a.es
  if (!hasPair) {
    if (a.en || a.es || a.x) problems.push(`${url}: partial alternates declared (en=${a.en} es=${a.es} x=${a.x})`)
    continue
  }
  if (a.x !== a.en) problems.push(`${url}: x-default should point at the English URL`)
  for (const other of [a.en, a.es]) {
    const back = declared.get(other)
    if (!back) { problems.push(`${url}: declares alternate ${other} which has no canonical of its own`); continue }
    if (back.en !== a.en || back.es !== a.es) {
      problems.push(`${url} <-> ${other}: alternates are not reciprocal`)
    }
  }
}

if (problems.length) {
  console.error('✗ hreflang verification failed:')
  for (const p of problems) console.error('  - ' + p)
  process.exit(1)
}
console.log(`✓ hreflang reciprocal across ${declared.size} pages`)
