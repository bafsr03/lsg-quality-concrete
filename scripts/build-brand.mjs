/**
 * Derives the brand assets from the original WordPress logo.
 *
 * The favicon WordPress shipped was a naive centre-crop of the full lockup, so
 * the wordmark ran off both edges and the icon read as noise at 32px. We crop
 * the mascot alone instead, which is the only part of the mark that survives
 * being 16px tall.
 */
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const SRC = 'public/images/59-l-s-g-home-1.png'
await mkdir('public/brand', { recursive: true })

const src = sharp(SRC)
const meta = await src.metadata()
console.log(`source logo: ${meta.width}x${meta.height}, alpha=${meta.hasAlpha}`)

// Full lockup, trimmed of transparent padding, upscaled for retina headers.
await sharp(SRC).trim().resize({ width: 860, fit: 'inside' })
  .png({ compressionLevel: 9 })
  .toFile('public/brand/logo.png')

// The mascot occupies the upper portion of the lockup; the wordmark sits below.
const { width: w = 0, height: h = 0 } = meta
await sharp(SRC)
  .extract({ left: Math.round(w * 0.27), top: 0, width: Math.round(w * 0.47), height: Math.round(h * 0.575) })
  .trim()
  .resize(410, 410, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .extend({ top: 51, bottom: 51, left: 51, right: 51, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile('public/brand/mark.png')

const marked = await sharp('public/brand/mark.png').metadata()
console.log(`mark: ${marked.width}x${marked.height}`)
