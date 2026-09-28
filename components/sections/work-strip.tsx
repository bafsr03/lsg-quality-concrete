import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '@/lib/site'
import { featuredWorkResolved } from '@/content/showcase'
import { path } from '@/lib/i18n/paths'

/**
 * A band of finished work, offset deterministically per page so two service
 * pages don't open with the same four photographs. Every image is genuinely
 * theirs, so any slice is honest — the offset is purely to keep the site from
 * feeling like one photo repeated.
 */
function offsetFor(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return h % featuredWorkResolved.length
}

export function WorkStrip({
  locale,
  seed,
  count = 4,
  heading,
}: {
  locale: Locale
  seed: string
  count?: number
  heading?: string
}) {
  const start = offsetFor(seed)
  const items = Array.from({ length: count }, (_, i) => featuredWorkResolved[(start + i) % featuredWorkResolved.length])
  const t =
    locale === 'es'
      ? { title: heading ?? 'Trabajo reciente', all: 'Ver la galería' }
      : { title: heading ?? 'Recent work', all: 'See the gallery' }

  return (
    <section className="border-joint/40 border-b">
      <div className="mx-auto flex w-full max-w-[110rem] items-baseline justify-between gap-6 px-5 pt-14 pb-6 sm:px-8 sm:pt-20">
        <h2 className="text-ink text-heading font-bold" style={{ fontStretch: '115%' }}>
          {t.title}
        </h2>
        <Link href={path('gallery', locale)} className="text-joint hover:text-ink text-sm font-medium transition-colors">
          {t.all}
        </Link>
      </div>
      <div className="border-joint/40 mx-auto grid w-full max-w-[110rem] border-t sm:grid-cols-2 lg:grid-cols-4">
        {items.map((f, i) => (
          <figure key={`${f.imageName}-${i}`} className="border-joint/40 relative aspect-[4/5] not-last:border-r">
            <Image
              src={f.image.file}
              alt={f.alt[locale]}
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
