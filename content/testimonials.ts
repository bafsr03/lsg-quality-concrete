import { z } from 'zod'
import { DivisionId } from './schema'

/**
 * Real reviews, migrated verbatim from the Site Reviews plugin on the old
 * WordPress site. Text is not edited, translated or tidied — including the
 * typo in one title. They are shown in the language they were written in.
 *
 * Two are from the same person on the same day and read as a double
 * submission; both are kept because removing a customer's review is the
 * owner's call, not ours.
 *
 * Note the average across these five is 4.8, not the 5.0 the directory
 * profiles advertise. No AggregateRating is emitted anywhere on the site until
 * the owner confirms the real counts from the Business Profile.
 */
export const Testimonial = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string().min(20),
  author: z.string(),
  /** ISO date, for schema and for sorting. */
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  rating: z.number().int().min(1).max(5),
  /** Language the review was actually written in. */
  lang: z.enum(['en', 'es']),
  /** The trade the job was in, where the review makes it clear. Trade pages
   *  show their own reviews first. */
  division: DivisionId.optional(),
})

export const testimonials = Testimonial.array().parse([
  {
    id: '22988404',
    division: 'concrete',
    title: 'Basement stairs',
    body: 'He did a great job nice to work with Leny and his guy on time and ready to go.',
    author: 'Mike',
    date: '2026-06-10',
    rating: 5,
    lang: 'en',
  },
  {
    id: '22988403',
    division: 'concrete',
    title: '5 year continued partnerhsip',
    body: 'Lenin has been a customer of ours since we first started – 5 years ago. He is a fantastic man and does great work. Him and his crew do a great job, are on-time and run a clean job site.',
    author: 'BCB Ready Mix',
    date: '2026-05-26',
    rating: 5,
    lang: 'en',
  },
  {
    id: '22988402',
    division: 'concrete',
    title: 'Hot tub pad and patio.',
    body: 'We just had LSG Quality Concrete pour concrete at our residence. They poured a patio and a pad for a hot tub. These guys were great! Great communication and they did a great job. Don’t hesitate to use these guys.',
    author: 'Travis Clapie',
    date: '2025-11-07',
    rating: 5,
    lang: 'en',
  },
  {
    id: '22988401',
    title: 'Exelente!',
    body: 'Me encantó el servicio, fueron muy amables y rápidos, los recomiendo sin dudar y los precios excelentes',
    author: 'Ericka',
    date: '2025-08-31',
    rating: 5,
    lang: 'es',
  },
  {
    id: '22988400',
    title: 'Exelente',
    body: 'Me encantó el servicio y muy buen precio., no dudo en recomendar los servicios.',
    author: 'Ericka',
    date: '2025-08-31',
    rating: 4,
    lang: 'es',
  },
])

/** Average of what is actually displayed — used for copy, never for schema. */
export const displayedAverage =
  Math.round((testimonials.reduce((a, t) => a + t.rating, 0) / testimonials.length) * 10) / 10
