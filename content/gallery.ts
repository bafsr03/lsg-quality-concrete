import manifest from './generated/media-manifest.json'

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
    en: 'Interior remodelling work completed by the LSG Quality Concrete crew in Utah County',
    es: 'Trabajo de remodelación interior realizado por la cuadrilla de LSG Quality Concrete en el Condado de Utah',
  },
  {
    match: /concrete-new-gallery/,
    en: 'Recent concrete flatwork poured by LSG Quality Concrete on a Utah County job site',
    es: 'Obra plana de concreto reciente vertida por LSG Quality Concrete en una obra del Condado de Utah',
  },
  {
    match: /.*/,
    en: 'Concrete work completed by LSG Quality Concrete across Utah County and the Salt Lake Valley',
    es: 'Trabajo de concreto realizado por LSG Quality Concrete en el Condado de Utah y el Valle de Salt Lake',
  },
]

/** Per-image alt for the photographs we have actually reviewed. */
const REVIEWED_ALT: Record<string, { en: string; es: string }> = {
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
