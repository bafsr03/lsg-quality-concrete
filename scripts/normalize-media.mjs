/**
 * One-time pass over the WordPress media originals captured in _capture/.
 * Produces the image masters in public/images/ plus a manifest the content
 * layer reads for dimensions and aspect-ratio bucketing.
 *
 *   node scripts/normalize-media.mjs
 *
 * Deliberately COPY-THROUGH by default. Probing the library found:
 *   - 0 of 102 files carry an EXIF orientation flag (WordPress baked rotation
 *     in on upload), and 0 carry EXIF or GPS at all, so there is nothing to
 *     correct or scrub.
 *   - median density is 0.072 bytes/pixel; these are already well compressed.
 * Re-encoding them to WebP therefore cost +67% bytes for a generation-loss
 * round trip. next/image derives the AVIF/WebP variants browsers actually get,
 * so the master's only job is to be the highest-fidelity source available.
 *
 * We re-encode ONLY when an image exceeds MAX_EDGE, because at that point we
 * are resampling regardless and the re-encode is not an extra loss.
 */
import { readFile, writeFile, readdir, mkdir, copyFile } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'
import sharp from 'sharp'

const ROOT = new URL('..', import.meta.url).pathname
const SRC = join(ROOT, '_capture/originals')
const OUT = join(ROOT, 'public/images')
const MANIFEST = join(ROOT, 'content/generated/media-manifest.json')

const MAX_EDGE = 2400

/** Portrait dominates this library (77 of 102), so the gallery is built around it. */
function bucket(w, h) {
  const r = w / h
  if (r < 0.8) return 'portrait'
  if (r > 1.25) return 'landscape'
  return 'square'
}

const slugify = (name) =>
  basename(name, extname(name))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const wpMeta = new Map(
  JSON.parse(await readFile(join(ROOT, '_capture/media-manifest.json'), 'utf8'))
    .map((m) => [String(m.id), m]),
)

await mkdir(OUT, { recursive: true })
await mkdir(join(ROOT, 'content/generated'), { recursive: true })

const files = (await readdir(SRC)).filter((f) => !f.startsWith('.')).sort()
const manifest = []
let bytesIn = 0
let bytesOut = 0
let resized = 0

for (const file of files) {
  const [wpId, ...rest] = file.split('__')
  const original = rest.join('__')
  const src = join(SRC, file)
  const buf = await readFile(src)
  bytesIn += buf.length

  const meta = await sharp(buf).metadata()
  const oversized = Math.max(meta.width, meta.height) > MAX_EDGE
  const ext = oversized ? '.webp' : extname(original).toLowerCase()
  const name = `${wpId}-${slugify(original)}${ext}`
  const dest = join(OUT, name)

  let width = meta.width
  let height = meta.height

  if (oversized) {
    const { data, info } = await sharp(buf)
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toBuffer({ resolveWithObject: true })
    await writeFile(dest, data)
    width = info.width
    height = info.height
    bytesOut += data.length
    resized++
  } else {
    await copyFile(src, dest)
    bytesOut += buf.length
  }

  const wp = wpMeta.get(wpId)
  manifest.push({
    id: `${wpId}-${slugify(original)}`,
    file: `/images/${name}`,
    width,
    height,
    ratio: Number((width / height).toFixed(4)),
    bucket: bucket(width, height),
    source: { wpId: Number(wpId), original, url: wp?.source_url ?? null, date: wp?.date ?? null },
    // Deliberately null. Alt text is authored in content/, never generated here.
    alt: null,
  })
}

manifest.sort((a, b) => a.id.localeCompare(b.id))
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')

const mb = (n) => (n / 1048576).toFixed(2) + ' MB'
const counts = manifest.reduce((a, m) => ({ ...a, [m.bucket]: (a[m.bucket] ?? 0) + 1 }), {})
console.log(`${manifest.length} images  (${resized} downsized, ${manifest.length - resized} copied through)`)
console.log(`  ${mb(bytesIn)} -> ${mb(bytesOut)}`)
console.log(`  buckets:`, counts)
