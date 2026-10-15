/**
 * Builds every brand asset from the owner's final art in brand/source/:
 *
 *   logo.png           the main logo: house monogram over "LSG CONTRACTORS /
 *                      GENERAL SERVICES", one flat navy on transparent
 *   monogram-gold.png  the gold 3-D monogram (favicon, dark surfaces)
 *   mascot.jpeg        the crew mascot on a white background
 *
 * Outputs (all committed, so this only reruns when the art changes):
 *   public/brand/logo-navy.png, logo-white.png   main logo, stacked
 *   public/brand/logo-horizontal.png   monogram beside the wordmark (header)
 *   public/brand/mark-navy.png         monogram alone
 *   public/brand/wordmark-white.png    the two text lines alone, white
 *   public/brand/monogram-gold.png     gold monogram, trimmed
 *   public/brand/mascot.png            mascot cut out of its white background
 *   public/brand/mascot-bust.png       head and shoulders, for the round helper
 *   app/icon.png, app/apple-icon.png   favicon and home-screen icon (gold)
 *   app/opengraph-image.png            the card shown when a link is shared
 */
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

await mkdir('public/brand', { recursive: true })
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 }

// --- Gold monogram ----------------------------------------------------------
await sharp('brand/source/monogram-gold.png').trim().resize({ width: 640 }).png({ compressionLevel: 9 }).toFile('public/brand/monogram-gold.png')

// --- Main logo ----------------------------------------------------------------
// The source is one colour, so only its alpha matters: we keep the coverage,
// drop the faint specks the background remover left, and repaint it flat in
// any brand colour. Rows of ink split it into its three parts: the monogram,
// "LSG CONTRACTORS" and "GENERAL SERVICES".
const NAVY = [10, 31, 82]
const WHITE = [255, 255, 255]
const logoSrc = await sharp('brand/source/logo.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const LW = logoSrc.info.width
const LH = logoSrc.info.height
const coverage = Buffer.alloc(LW * LH)
for (let i = 0; i < LW * LH; i++) {
  const a = logoSrc.data[i * 4 + 3]
  coverage[i] = a < 24 ? 0 : a
}
const bands = []
{
  let start = -1
  for (let y = 0; y <= LH; y++) {
    let ink = false
    for (let x = 0; y < LH && x < LW && !ink; x++) ink = coverage[y * LW + x] > 128
    if (ink && start < 0) start = y
    if (!ink && start >= 0) {
      bands.push([start, y])
      start = -1
    }
  }
}
if (bands.length !== 3) throw new Error(`expected monogram + 2 text lines in the logo, found ${bands.length} bands`)

/** Paint a region of the logo's coverage in one colour, trimmed. */
async function paint([r, g, b], top = 0, bottom = LH) {
  const h = bottom - top
  const px = Buffer.alloc(LW * h * 4)
  for (let i = 0; i < LW * h; i++) px.set([r, g, b, coverage[top * LW + i]], i * 4)
  return sharp(px, { raw: { width: LW, height: h, channels: 4 } }).trim({ threshold: 1 }).png().toBuffer()
}
const [markBand, line1Band, line2Band] = bands
const pad = 14 // keep the gap between the text lines when cropping them together
for (const [name, rgb] of [['navy', NAVY], ['white', WHITE]]) {
  const full = await paint(rgb, markBand[0], line2Band[1])
  await sharp(full).resize({ width: 900 }).png({ compressionLevel: 9 }).toFile(`public/brand/logo-${name}.png`)
}
await sharp(await paint(NAVY, ...markBand)).resize({ height: 400 }).png({ compressionLevel: 9 }).toFile('public/brand/mark-navy.png')
await sharp(await paint(WHITE, line1Band[0] - pad, line2Band[1] + pad)).resize({ width: 900 }).png({ compressionLevel: 9 }).toFile('public/brand/wordmark-white.png')

// Horizontal lockup: monogram, then the two lines left-aligned beside it, the
// text block ~62% of the monogram's height, as for a header.
{
  const MH = 300
  const mark = await sharp(await paint(NAVY, ...markBand)).resize({ height: MH }).toBuffer()
  const mw = (await sharp(mark).metadata()).width
  const blockH = Math.round(MH * 0.62)
  const srcBlock = line2Band[1] - line1Band[0]
  const k = blockH / srcBlock
  const l1 = await sharp(await paint(NAVY, ...line1Band)).resize({ height: Math.round((line1Band[1] - line1Band[0]) * k) }).toBuffer()
  const l2 = await sharp(await paint(NAVY, ...line2Band)).resize({ height: Math.round((line2Band[1] - line2Band[0]) * k) }).toBuffer()
  const [m1, m2] = [await sharp(l1).metadata(), await sharp(l2).metadata()]
  const gap = Math.round(MH * 0.16)
  const textTop = Math.round((MH - blockH) / 2) + Math.round(MH * 0.06) // sit slightly low, on the monogram's visual centre
  const width = mw + gap + Math.max(m1.width, m2.width)
  await sharp({ create: { width, height: MH, channels: 4, background: CLEAR } })
    .composite([
      { input: mark, left: 0, top: 0 },
      { input: l1, left: mw + gap, top: textTop },
      { input: l2, left: mw + gap, top: textTop + blockH - m2.height },
    ])
    .png({ compressionLevel: 9 })
    .toFile('public/brand/logo-horizontal.png')
}

// --- Mascot cut-out ---------------------------------------------------------
// Flood-fill the white backdrop from the image border, so whites inside him
// (the T-shirt under his collar, eye highlights) are kept. The mask is then
// eroded two pixels and softened, which drops the pale fringe that would
// otherwise glow against the navy heroes.
{
  const { data, info } = await sharp('brand/source/mascot.jpeg').removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: W, height: H } = info
  const bg = new Uint8Array(W * H)
  // Near-white, or a pale neutral grey: the soft floor shadow under his boots.
  const isWhite = (i) => {
    const [r, g, b] = [data[i * 3], data[i * 3 + 1], data[i * 3 + 2]]
    const lo = Math.min(r, g, b)
    return lo > 226 || (lo > 185 && Math.max(r, g, b) - lo < 14)
  }
  const stack = []
  for (let x = 0; x < W; x++) stack.push(x, (H - 1) * W + x)
  for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1)
  while (stack.length) {
    const i = stack.pop()
    if (bg[i] || !isWhite(i)) continue
    bg[i] = 1
    const x = i % W
    if (x > 0) stack.push(i - 1)
    if (x < W - 1) stack.push(i + 1)
    if (i >= W) stack.push(i - W)
    if (i < W * (H - 1)) stack.push(i + W)
  }
  const alpha = Buffer.alloc(W * H)
  let [x0, y0, x1, y1] = [W, H, 0, 0]
  for (let i = 0; i < W * H; i++) {
    alpha[i] = bg[i] ? 0 : 255
    if (bg[i]) continue
    const x = i % W
    const y = (i - x) / W
    ;[x0, y0, x1, y1] = [Math.min(x0, x), Math.min(y0, y), Math.max(x1, x), Math.max(y1, y)]
  }
  const mask = await sharp(alpha, { raw: { width: W, height: H, channels: 1 } }).erode(2).blur(0.8).extractChannel(0).raw().toBuffer()
  const cut = await sharp(data, { raw: { width: W, height: H, channels: 3 } }).joinChannel(mask, { raw: { width: W, height: H, channels: 1 } }).png().toBuffer()
  const box = { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 }
  const mascot = await sharp(cut).extract(box).resize({ height: 1100 }).png({ compressionLevel: 9 }).toBuffer()
  await sharp(mascot).toFile('public/brand/mascot.png')

  // Head and shoulders, squared off around his face.
  const m = await sharp(mascot).metadata()
  const side = Math.round(m.height * 0.37)
  const left = Math.max(0, Math.round(m.width * 0.62 - side / 2))
  await sharp(mascot)
    .extract({ left, top: 0, width: Math.min(side, m.width - left), height: side })
    .resize(320, 320, { fit: 'contain', background: CLEAR })
    // Round, like the button it sits in; also drops the drill tip in the corner.
    .composite([{ input: Buffer.from('<svg width="320" height="320"><circle cx="160" cy="160" r="160"/></svg>'), blend: 'dest-in' }])
    .png({ compressionLevel: 9 })
    .toFile('public/brand/mascot-bust.png')
}

// --- Icons: gold monogram on a navy tile ------------------------------------
async function icon(size, file, radius) {
  const inner = Math.round(size * 0.78)
  const mark = await sharp('public/brand/monogram-gold.png').resize(inner, inner, { fit: 'contain', background: CLEAR }).toBuffer()
  const tile = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#0a1f52"/></svg>`)
  await sharp(tile).composite([{ input: mark, gravity: 'centre' }]).png({ compressionLevel: 9 }).toFile(file)
}
await icon(512, 'app/icon.png', 112)
await icon(180, 'app/apple-icon.png', 0) // iOS rounds the corners itself

// --- Open Graph card --------------------------------------------------------
// Gold monogram over the white wordmark, on the brand navy.

const W = 1200
const H = 630
const card = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="g" cx="80%" cy="10%" r="90%">
      <stop offset="0" stop-color="#1652d9"/><stop offset="1" stop-color="#0a1f52"/>
    </radialGradient>
    <pattern id="tape" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="20" height="40" fill="#ffc21a"/><rect x="20" width="20" height="40" fill="#0a1f52"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect y="${H - 26}" width="${W}" height="26" fill="url(#tape)"/>
  <text x="86" y="470" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="30" fill="#ffffff" fill-opacity="0.85">Concrete · Landscaping · Remodeling</text>
  <text x="86" y="520" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="28" fill="#ffffff" fill-opacity="0.6">Utah County · Free estimates · Hablamos español</text>
</svg>`)
const ogWord = await sharp('public/brand/wordmark-white.png').resize({ width: 470 }).toBuffer()
const ogMark = await sharp('public/brand/monogram-gold.png').resize({ height: 220 }).toBuffer()
const omw = (await sharp(ogMark).metadata()).width
const ogMascot = await sharp('public/brand/mascot.png').resize({ height: 560 }).toBuffer()
const mm = await sharp(ogMascot).metadata()
await sharp(card)
  .composite([
    { input: ogMark, left: 86 + Math.round((470 - omw) / 2), top: 60 },
    { input: ogWord, left: 86, top: 300 },
    { input: ogMascot, left: W - mm.width - 40, top: H - 26 - 560 },
  ])
  .png({ compressionLevel: 9 })
  .toFile('app/opengraph-image.png')

console.log('brand assets built')
