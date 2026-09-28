import { z } from 'zod'
import { photo } from '@/lib/content/media'

const Localized = z.object({ en: z.string().min(1), es: z.string().min(1) })

/**
 * The pour sequence.
 *
 * Four real photographs from their own jobs, in the order the work actually
 * happens. This is the one place on the site that hijacks the scroll, and it
 * earns that because it teaches the visitor something about the trade rather
 * than decorating a heading.
 */
export const PourStep = z.object({
  id: z.string(),
  imageName: z.string(),
  step: Localized,
  title: Localized,
  body: Localized,
  alt: Localized,
})

export const pourSequence = PourStep.array().parse([
  {
    id: 'form',
    imageName: 'l-s-g-gallery-11',
    step: { en: 'Form', es: 'Cimbra' },
    title: { en: 'The shape is decided here', es: 'La forma se decide aquí' },
    body: {
      en: 'Flexible board bent and staked to the curve you actually want, set to the finished grade at both ends so the slab meets the door and the walk without a made-up step.',
      es: 'Tabla flexible doblada y estacada a la curva que realmente quiere, fijada al nivel terminado en ambos extremos para que la losa llegue a la puerta y al andador sin un escalón improvisado.',
    },
    alt: {
      en: 'Curved timber forms staked along a gravel base, laying out a walkway before the pour',
      es: 'Cimbra de madera curva estacada sobre una base de grava, trazando un andador antes del vertido',
    },
  },
  {
    id: 'reinforce',
    imageName: 'l-s-g-gallery-29',
    step: { en: 'Reinforce', es: 'Refuerzo' },
    title: { en: 'Steel lifted, not laid', es: 'Acero levantado, no apoyado' },
    body: {
      en: 'Mesh or #4 rebar tied and set on chairs so it sits inside the slab. Steel pulled to the bottom of a pour does nothing at all, which is the most common shortcut in this trade.',
      es: 'Malla o varilla #4 amarrada y colocada sobre soportes para que quede dentro de la losa. El acero que se va al fondo del vertido no aporta nada, y es el atajo más común del oficio.',
    },
    alt: {
      en: 'Reinforcing mesh laid across a compacted driveway subgrade between a fence and a house, ready for concrete',
      es: 'Malla de refuerzo extendida sobre la subrasante compactada de una entrada, entre la cerca y la casa, lista para el concreto',
    },
  },
  {
    id: 'pour',
    imageName: 'l-s-g-gallery-30',
    step: { en: 'Pour', es: 'Vertido' },
    title: { en: 'One continuous placement', es: 'Una colocación continua' },
    body: {
      en: 'Placement is planned before the truck is ordered — chute, pump or barrow, and enough hands to keep moving. A pour that stalls leaves a cold joint through the middle of a finished slab.',
      es: 'La colocación se planea antes de pedir el camión: canaleta, bomba o carretilla, y manos suficientes para no parar. Un vertido que se detiene deja una junta fría a media losa terminada.',
    },
    alt: {
      en: 'Wet concrete discharging from a mixer chute onto reinforcing mesh on a prepared subgrade',
      es: 'Concreto fresco saliendo de la canaleta de la mezcladora sobre la malla de refuerzo en la subrasante preparada',
    },
  },
  {
    id: 'finish',
    imageName: 'l-s-g-gallery-18',
    step: { en: 'Finish', es: 'Acabado' },
    title: { en: 'Jointed before it cracks itself', es: 'Con juntas antes de que se agriete sola' },
    body: {
      en: 'Broom finish for grip under snowmelt, then control joints cut early — roughly ten feet on a four inch slab. Cut late and the concrete has already chosen where it wants to crack.',
      es: 'Acabado de escoba para agarre con el deshielo, y juntas de control cortadas temprano: unos tres metros en una losa de diez centímetros. Si se cortan tarde, el concreto ya eligió dónde agrietarse.',
    },
    alt: {
      en: 'A finished broom-textured concrete walkway curving away from a house, with control joints cut across it',
      es: 'Un andador de concreto terminado con textura de escoba que se curva alejándose de la casa, con juntas de control cortadas',
    },
  },
])

/**
 * Featured finished work for the homepage strip. Curated from the 79 job
 * photographs — finished results only, no subgrade or formwork, because this
 * band is the "would I want that in my yard" moment.
 */
const Featured = z.object({ imageName: z.string(), alt: Localized })

export const featuredWork = Featured.array().parse([
  { imageName: 'l-s-g-gallery-18', alt: { en: 'Finished broom-textured walkway curving away from a house', es: 'Andador terminado con textura de escoba que se curva alejándose de la casa' } },
  { imageName: 'concrete-new-gallery-5', alt: { en: 'Wide finished concrete driveway with control joints cut on a regular grid', es: 'Entrada de concreto amplia y terminada, con juntas de control en retícula regular' } },
  { imageName: 'l-s-g-gallery-19', alt: { en: 'Round poured concrete hot tub pad set against a brick garden wall', es: 'Base circular de concreto para jacuzzi junto a un muro de ladrillo' } },
  { imageName: 'concrete-new-gallery-3', alt: { en: 'Poured concrete steps running down to a driveway beside a new home', es: 'Escalones de concreto que bajan hacia la entrada junto a una casa nueva' } },
  { imageName: 'l-s-g-gallery-33', alt: { en: 'Finished concrete slab running the length of a timber fence line', es: 'Losa de concreto terminada a lo largo de una cerca de madera' } },
  { imageName: 'l-s-g-gallery-31', alt: { en: 'Concrete flatwork poured neatly around two basement window wells', es: 'Obra plana de concreto vertida alrededor de dos pozos de ventana de sótano' } },
  { imageName: 'concrete-new-gallery-1', alt: { en: 'Long concrete walkway running along the side of a house to the back yard', es: 'Andador de concreto largo a un costado de la casa hacia el patio trasero' } },
  { imageName: 'l-s-g-gallery-38', alt: { en: 'Concrete entry steps rising to a doorway in a stuccoed wall', es: 'Escalones de concreto que suben hacia una puerta en un muro de estuco' } },
  { imageName: 'l-s-g-gallery-13', alt: { en: 'Curved concrete path crossing a graded yard toward a new build', es: 'Sendero de concreto curvo que cruza un patio nivelado hacia una obra nueva' } },
  { imageName: 'l-s-g-gallery-8', alt: { en: 'Broad finished concrete pad meeting an existing asphalt surface', es: 'Plataforma de concreto amplia y terminada que se une a un pavimento de asfalto existente' } },
  { imageName: 'l-s-g-gallery-39', alt: { en: 'Concrete stairs descending to a basement entry with a window alongside', es: 'Escalera de concreto que baja a una entrada de sótano con una ventana al costado' } },
  { imageName: 'concrete-new-gallery-9', alt: { en: 'Wide concrete driveway finished up to a railing and the garage apron', es: 'Entrada de concreto amplia terminada hasta el barandal y el acceso del garaje' } },
])

/** Resolve at module load so a bad name fails the build, not the page. */
export const pourSequenceResolved = pourSequence.map((s) => ({ ...s, image: photo(s.imageName) }))
export const featuredWorkResolved = featuredWork.map((f) => ({ ...f, image: photo(f.imageName) }))
