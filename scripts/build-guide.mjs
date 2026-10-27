/**
 * Builds the one-page brand guide, in Spanish for the owner
 * (brand/guide.template.html), into a single
 * self-contained HTML file, every image inlined, so it can be emailed or
 * opened offline. Run after build-brand.mjs.
 *
 *   node scripts/build-guide.mjs [output path]   (default: ~/Desktop/LSG-Guia-de-Marca.html)
 */
import sharp from 'sharp'
import { readFile, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'

const R = ''
const uri = async (file, resize, q = 88) => {
  const buf = await sharp(R + file).resize(resize).webp({ quality: q, alphaQuality: 100 }).toBuffer()
  return `data:image/webp;base64,${buf.toString('base64')}`
}
const img = {
  monogram: await uri('public/brand/monogram-gold.png', { width: 500 }),
  wordmarkWhite: await uri('public/brand/wordmark-white.png', { width: 700 }),
  logoNavy: await uri('public/brand/logo-navy.png', { width: 640 }),
  logoWhite: await uri('public/brand/logo-white.png', { width: 640 }),
  logoHorizontal: await uri('public/brand/logo-horizontal.png', { height: 120 }),
  markNavy: await uri('public/brand/mark-navy.png', { height: 180 }),
  mascot: await uri('public/brand/mascot.png', { height: 760 }, 86),
  bust: await uri('public/brand/mascot-bust.png', { width: 200 }),
  oldLogo: await uri('public/images/59-l-s-g-home-1.png', { width: 200 }),
  icon: await uri('app/icon.png', { width: 192 }),
  og: await uri('app/opengraph-image.png', { width: 900 }, 80),
}

const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`
const icons = {
  concrete: svg('<rect x="3" y="14" width="18" height="6" rx="1"/><path d="M6 14l2-7h8l2 7"/><path d="M10 7V4h4v3"/>'),
  landscaping: svg('<path d="M12 21v-9"/><path d="M12 12c0-4.5 3-7.5 8-7.5 0 5-3 8-8 7.5z"/><path d="M12 15c0-3.5-2.5-6-7-6 0 4 2.5 6.5 7 6z"/>'),
  remodeling: svg('<path d="M15 4l5 5-3 3-5-5z"/><path d="M12 7L3.6 15.4a2 2 0 0 0 2.8 2.8L14.8 10"/>'),
  electrical: svg('<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>'),
  plumbing: svg('<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>'),
}
const trades = [
  { id: 'concrete', name: 'Concreto', title: 'Contratista de concreto, Condado de Utah', services: ['Entradas de concreto', 'Patios de concreto', 'Concreto para sótanos'] },
  { id: 'landscaping', name: 'Jardinería', title: 'Jardinería en el Condado de Utah', services: ['Césped y sistemas de riego', 'Adoquines y muros de contención', 'Jardines de bajo consumo de agua'] },
  { id: 'remodeling', name: 'Remodelación', title: 'Remodelación y sótanos', services: ['Acabado de sótanos', 'Remodelación de cocinas', 'Remodelación de baños'] },
  { id: 'electrical', name: 'Electricidad', title: 'Electricidad, con socios con licencia', services: ['Iluminación y lámparas', 'Cableado para remodelaciones', 'Cargadores de autos eléctricos'], partner: true },
  { id: 'plumbing', name: 'Plomería', title: 'Plomería, con socios con licencia', services: ['Instalación de llaves y sanitarios', 'Calentadores de agua', 'Obra negra para sótanos'], partner: true },
]
const vars = (t) => `--c:var(--${t.id});--t:var(--${t.id}-t)`
const heroes = trades.map((t) => `
    <div class="mh" style="${vars(t)}">
      <div class="top">
        <div class="crumbs">LSG General Contractor › ${t.name}</div>
        <span class="tchip">${icons[t.id]} ${t.name}</span>
        <h3>${t.title}</h3>
        <div class="actions"><span class="btn gold">Presupuesto gratis</span><span class="btn ghost">(435) 849-5193</span></div>
      </div>
      <div class="body">
        ${t.services.map((s) => `<div class="svc"><span>${s}</span><span class="go">→</span></div>`).join('')}
        ${t.partner ? `<div class="partner">Coordinado por LSG · realizado por socios con licencia en Utah</div>` : ''}
      </div>
    </div>`).join('')
const menu = trades.map((t) => `<div style="${vars(t)}"><h4><i></i>${t.name}</h4>${t.services.map((s) => `<a>${s}</a>`).join('')}</div>`).join('')

let html = await readFile('brand/guide.template.html', 'utf8')
html = html.replace('{{heroes}}', heroes).replace('{{menu}}', menu)
for (const [k, v] of Object.entries(icons)) html = html.replaceAll(`{{icon-${k}}}`, v)
for (const [k, v] of Object.entries(img)) html = html.replaceAll(`{{${k}}}`, v)
const left = html.match(/\{\{[^}]+\}\}/g)
if (left) throw new Error('unfilled: ' + left.join(', '))
const out = process.argv[2] ?? homedir() + '/Desktop/LSG-Guia-de-Marca.html'
await writeFile(out, html)
console.log(out, (html.length / 1024).toFixed(0) + ' KB')
