import manifest from './generated/media-manifest.json'
import type { DivisionId } from './schema'
import { BUSINESS } from '../lib/site'

/**
 * The gallery shows real job photographs only.
 *
 * Excluded: the agency template's stock heroes, a background left over from a
 * different client's site (Eal Roofing), logos, icons and favicons.
 */
const EXCLUDE = [
  /shutterstock/,
  /eal-roofing/,
  /grupo-25/,
  /angi-logo/,
  /images-1/,
  /cropped-/,
  /^59-/,
  /^71-/,
  /l-s-g-hero-/,
  /l-s-g-home-/,
  /^22988310-reviews/,
]

export const galleryImages = manifest.filter((m) => !EXCLUDE.some((re) => re.test(m.id)))

/**
 * WordPress filed these under "remodeling", but what they show is concrete:
 * exterior basement stairwells, steps and flatwork around the house.
 */
const CONCRETE_IN_REMODELING_FOLDER = new Set([
  '22988354-remodeling2',
  '22988369-remodeling-21',
  '22988371-remodeling-23',
  '22988372-remodeling-28',
  '22988373-remodeling-29',
  '22988375-remodeling-31',
  '22988376-remodeling-32',
])

/**
 * Which trade a photograph belongs to. Mixing trades reads badly — an empty
 * painted room in the middle of a concrete gallery undercuts both. Grouped by
 * the source filename, which is the only categorisation WordPress preserved;
 * new uploads should carry the trade in their filename (landscaping-*, …).
 */
export function divisionOf(id: string): DivisionId {
  if (CONCRETE_IN_REMODELING_FOLDER.has(id)) return 'concrete'
  for (const d of ['remodeling', 'landscaping', 'electrical', 'plumbing'] as const) {
    if (id.includes(d)) return d
  }
  return 'concrete'
}

export const imagesFor = (division: DivisionId) => galleryImages.filter((m) => divisionOf(m.id) === division)

/**
 * Alt text is a known gap, not an oversight.
 *
 * All 102 images arrived from WordPress with empty alt text. Writing 77 alt
 * strings from the images alone produces 77 variations of "a concrete
 * driveway" — duplicate, uninformative, and a keyword-stuffing signal. Real alt
 * text needs the job details (city, year, what the work was) that only the
 * owner has, which is what the photo session in the plan is for.
 *
 * Until then each image carries an accurate category description rather than an
 * invented one. These are deliberately honest about what we actually know.
 */
const CATEGORY_ALT: Array<{ match: RegExp; en: string; es: string }> = [
  {
    match: /remodeling/,
    en: `Interior remodelling work completed by the ${BUSINESS.name} crew in Utah County`,
    es: `Trabajo de remodelación interior realizado por la cuadrilla de ${BUSINESS.name} en el Condado de Utah`,
  },
  {
    match: /concrete-new-gallery/,
    en: `Recent concrete flatwork poured by ${BUSINESS.name} on a Utah County job site`,
    es: `Obra plana de concreto reciente vertida por ${BUSINESS.name} en una obra del Condado de Utah`,
  },
  {
    match: /.*/,
    en: `Concrete work completed by ${BUSINESS.name} across Utah County and the Salt Lake Valley`,
    es: `Trabajo de concreto realizado por ${BUSINESS.name} en el Condado de Utah y el Valle de Salt Lake`,
  },
]

/** Per-image alt for the photographs we have actually reviewed. */
const REVIEWED_ALT: Record<string, { en: string; es: string }> = {
  '22988354-remodeling2': {
    en: 'Concrete walkout basement stairwell with black metal railings and the basement door at the bottom',
    es: 'Escalera exterior de concreto hacia el sótano con barandales negros y la puerta del sótano al fondo',
  },
  '22988355-remodeling1': {
    en: 'Kitchen mid-remodel with dark wood cabinets, a granite peninsula sink and a stainless refrigerator',
    es: 'Cocina en remodelación con gabinetes de madera oscura, península de granito con fregadero y refrigerador de acero inoxidable',
  },
  '22988361-remodeling-12': {
    en: 'Kitchen island with a white quartz top, black undermount sink and gold faucet over dark cabinets',
    es: 'Isla de cocina con cubierta de cuarzo blanco, fregadero negro bajo cubierta y llave dorada sobre gabinetes oscuros',
  },
  '22988362-remodeling-13': {
    en: 'Finished room with freshly painted white walls, a vaulted ceiling and vinyl plank flooring',
    es: 'Cuarto terminado con paredes blancas recién pintadas, techo abovedado y piso de vinil tipo duela',
  },
  '22988363-remodeling-14': {
    en: 'Pantry closet with white built-in shelving behind a six-panel door',
    es: 'Despensa con repisas blancas empotradas detrás de una puerta de seis paneles',
  },
  '22988364-remodeling-15': {
    en: 'Finished kitchen with dark wood cabinets, a stainless gas range and a vaulted ceiling',
    es: 'Cocina terminada con gabinetes de madera oscura, estufa de gas de acero inoxidable y techo abovedado',
  },
  '22988365-remodeling-16': {
    en: 'Carpeted stairs leading down from a tiled landing with a wood handrail',
    es: 'Escalera alfombrada que baja desde un descanso de loseta con pasamanos de madera',
  },
  '22988366-remodeling-17': {
    en: 'Finished carpeted bedroom with fresh paint and a white door',
    es: 'Recámara terminada con alfombra, pintura nueva y puerta blanca',
  },
  '22988367-remodeling-18': {
    en: 'Finished carpeted room seen through a doorway',
    es: 'Cuarto terminado con alfombra visto desde la puerta',
  },
  '22988368-remodeling-19': {
    en: 'Bathroom before its remodel, with a tub and tile surround and a beige tile floor',
    es: 'Baño antes de su remodelación, con tina, recubrimiento de loseta y piso beige',
  },
  '22988369-remodeling-21': {
    en: 'Exterior basement stairwell with black railings beside a stucco house',
    es: 'Escalera exterior hacia el sótano con barandales negros junto a una casa de estuco',
  },
  '22988370-remodeling-22': {
    en: 'Remodeled bathroom vanity with a white quartz top, gold arched mirror and gold fixtures',
    es: 'Lavabo remodelado con cubierta de cuarzo blanco, espejo dorado en arco y accesorios dorados',
  },
  '22988371-remodeling-23': {
    en: 'Basement entry stairwell with railings and new concrete flatwork beside a stucco house',
    es: 'Escalera de acceso al sótano con barandales y obra plana de concreto nueva junto a una casa de estuco',
  },
  '22988372-remodeling-28': {
    en: 'Stucco addition with a sliding glass door and new concrete steps',
    es: 'Ampliación de estuco con puerta corrediza de vidrio y escalones de concreto nuevos',
  },
  '22988373-remodeling-29': {
    en: 'Front entry of a stucco and stone house with concrete steps and porch',
    es: 'Entrada de una casa de estuco y piedra con escalones y pórtico de concreto',
  },
  '22988374-remodeling-30': {
    en: 'Long stucco side wall of a house with dark shutters and windows',
    es: 'Muro lateral de estuco de una casa con ventanas y contraventanas oscuras',
  },
  '22988375-remodeling-31': {
    en: 'Backyard basement stairwell under construction beside a new concrete patio',
    es: 'Escalera de sótano en construcción en el patio trasero junto a un patio de concreto nuevo',
  },
  '22988376-remodeling-32': {
    en: 'Finished exterior basement stairwell with black railings and a concrete apron',
    es: 'Escalera exterior de sótano terminada con barandales negros y plataforma de concreto',
  },
  '22988377-remodeling-1': {
    en: 'Finished basement hallway opening into a family room with recessed lights and painted drywall',
    es: 'Pasillo de sótano terminado hacia la sala familiar con luces empotradas y tablaroca pintada',
  },
  '22988378-remodeling-2': {
    en: 'Finished basement family room with vinyl plank flooring, carpet, recessed lights and a soffit',
    es: 'Sala familiar en sótano terminado con piso de vinil, alfombra, luces empotradas y plafón',
  },
  '22988379-remodeling-4': {
    en: 'Unfinished basement before the remodel, with exposed joists and bare concrete walls',
    es: 'Sótano sin terminar antes de la remodelación, con vigas expuestas y muros de concreto',
  },
  '22988380-remodeling-5': {
    en: 'Unfinished basement stairwell with exposed stud framing before drywall',
    es: 'Escalera de sótano sin terminar con estructura de montantes expuesta antes de la tablaroca',
  },
  '22988381-remodeling-6': {
    en: 'Unfinished basement with bare concrete, exposed joists and a beam, before the remodel',
    es: 'Sótano sin terminar con concreto desnudo, vigas expuestas y una trabe, antes de la remodelación',
  },
  '22988382-remodeling-7': {
    en: 'Unfinished basement corner with exposed joists, ductwork and wiring',
    es: 'Esquina de sótano sin terminar con vigas, ductos y cableado expuestos',
  },
  '22988387-concrete-new-gallery-2': {
    en: 'Freshly poured concrete steps and a landing beside a stuccoed home in the Utah foothills, still in its timber forms',
    es: 'Escalones y descanso de concreto recién vertidos junto a una casa de estuco en las laderas de Utah, aún en su cimbra de madera',
  },
  '22988252-l-s-g-gallery-29': {
    en: 'Reinforcing mesh laid over a compacted driveway subgrade between a fence line and a house, ready for the pour',
    es: 'Malla de refuerzo colocada sobre la subrasante compactada de una entrada, entre la cerca y la casa, lista para verter',
  },
  '22988254-l-s-g-gallery-28': {
    en: 'Two crew members walking a formed driveway with reinforcing mesh in place as the mixer truck backs in',
    es: 'Dos trabajadores recorren una entrada cimbrada con la malla de refuerzo colocada mientras el camión mezclador se acerca',
  },
  '22988260-l-s-g-gallery-10': {
    en: 'A curved walkway formed in flexible board and staked with rebar, running from the driveway to a new home',
    es: 'Un andador curvo cimbrado en tabla flexible y estacado con varilla, desde la entrada hasta una casa nueva',
  },
  '22988263-l-s-g-gallery-7': {
    en: 'Rebar grid tied over a gravel subgrade against a foundation wall, prepared for a slab pour',
    es: 'Parrilla de varilla amarrada sobre subrasante de grava contra un muro de cimentación, preparada para colar la losa',
  },
}

export function galleryAlt(id: string, locale: 'en' | 'es'): string {
  const reviewed = REVIEWED_ALT[id]
  if (reviewed) return reviewed[locale]
  return CATEGORY_ALT.find((c) => c.match.test(id))![locale]
}
