import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '@/lib/site'
import { featuredWorkResolved } from '@/content/showcase'
import { galleryAlt, imagesFor } from '@/content/gallery'
import type { DivisionId } from '@/content/schema'
import { path } from '@/lib/i18n/paths'

/**
 * A band of finished work, offset deterministically per page so two service
 * pages don't open with the same four photographs. Every image is genuinely
 * theirs, so any slice is honest — the offset is purely to keep the site from
 * feeling like one photo repeated.
 */
function hash(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return h
}

/** Concrete uses the curated featured set; other trades use their own
 *  gallery photos. A trade with none yet renders no strip at all. */
function poolFor(division: DivisionId, locale: Locale) {
  if (division === 'concrete') {
    return featuredWorkResolved.map((f) => ({ key: f.imageName, file: f.image.file, alt: f.alt[locale] }))
  }
  return imagesFor(division).map((m) => ({ key: m.id, file: m.file, alt: galleryAlt(m.id, locale) }))
}

export function WorkStrip({
  locale,
  seed,
  count = 4,
  heading,
  division = 'concrete',
}: {
  locale: Locale
  seed: string
  count?: number
  heading?: string
  division?: DivisionId
}) {
  const pool = poolFor(division, locale)
  if (pool.length < count) return null
  const start = hash(seed) % pool.length
  const items = Array.from({ length: count }, (_, i) => pool[(start + i) % pool.length])
  const t =
    locale === 'es'
      ? { title: heading ?? 'Trabajo reciente', all: 'Ver la galería' }
      : { title: heading ?? 'Recent work', all: 'See the gallery' }

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto mb-10 flex w-full max-w-[110rem] flex-wrap items-end justify-between gap-6 px-5 sm:px-8">
        <h2 className="text-navy text-title type-display">
          {t.title}
        </h2>
        <Link href={path('gallery', locale)} className="btn btn-blue">
          {t.all}
        </Link>
      </div>
      <div className="mx-auto grid w-full max-w-[110rem] grid-cols-2 gap-3 px-5 sm:gap-5 sm:px-8 lg:grid-cols-4">
        {items.map((f, i) => (
          <figure key={`${f.key}-${i}`} className={`reveal-tilt relative aspect-[4/5] overflow-hidden rounded-[var(--radius-photo)] border-4 border-white shadow-[0_20px_40px_-24px_rgba(10,31,82,0.6)] ${i % 2 ? 'lg:translate-y-6' : ''}`}>
            <Image
              src={f.file}
              alt={f.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              quality={70}
              loading="lazy"
              className="object-cover"
            />
          </figure>
        ))}
      </div>
    </section>
  )
}
