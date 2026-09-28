import type { Metadata } from 'next'
import { SITE_URL, type Locale } from '@/lib/site'

/**
 * Builds `alternates` for generateMetadata.
 *
 * When `esPath` is null the route exists in English only — the service x city
 * matrix, deliberately. In that case we emit a self-canonical and nothing else.
 * Declaring an alternate that does not exist, or one that does not point back,
 * is the single most common way multilingual SEO breaks silently.
 */
export function alternates(
  locale: Locale,
  enPath: string,
  esPath: string | null,
): NonNullable<Metadata['alternates']> {
  const self = locale === 'en' ? enPath : esPath
  if (esPath === null || self === null) return { canonical: enPath }

  return {
    canonical: self,
    languages: {
      'en-US': enPath,
      'es-US': esPath,
      'x-default': enPath,
    },
  }
}

export const absolute = (path: string) => new URL(path, SITE_URL).toString()
