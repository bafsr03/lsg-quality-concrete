import type { Route } from 'next'
import type { Locale } from '@/lib/site'

/**
 * Static routes per locale. Spanish slugs are translated rather than kept in
 * English: a Spanish page on an English URL reads as a machine-translated skin,
 * and the slug is what shows in the SERP breadcrumb.
 */
const PATHS = {
  home: { en: '/', es: '/es/' },
  services: { en: '/services/', es: '/es/servicios/' },
  gallery: { en: '/gallery/', es: '/es/galeria/' },
  reviews: { en: '/reviews/', es: '/es/resenas/' },
  about: { en: '/about/', es: '/es/nosotros/' },
  contact: { en: '/contact/', es: '/es/contacto/' },
  estimate: { en: '/free-estimate/', es: '/es/presupuesto/' },
} as const

export type StaticPageKey = keyof typeof PATHS

export const path = (key: StaticPageKey, locale: Locale) => PATHS[key][locale] as Route
export const pathPair = (key: StaticPageKey) => PATHS[key]
