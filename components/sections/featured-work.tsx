import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '@/lib/site'
import { featuredWorkResolved } from '@/content/showcase'
import { path } from '@/lib/i18n/paths'

export function FeaturedWork({ locale }: { locale: Locale }) {
  const t =
    locale === 'es'
      ? { title: 'Trabajo terminado', cta: 'Ver las 79 fotos' }
      : { title: 'Finished work', cta: 'See all 79 photos' }

  // The track holds the list twice so the marquee seam is invisible; the
  // duplicate is hidden from assistive technology.
  const lane = [...featuredWorkResolved, ...featuredWorkResolved]

  return (
    <section className="border-joint/40 border-b py-14 sm:py-20">
      <div className="mx-auto mb-8 flex w-full max-w-[110rem] items-baseline justify-between gap-6 px-5 sm:px-8">
        <h2 className="text-ink text-heading font-bold" style={{ fontStretch: '115%' }}>
          {t.title}
        </h2>
        <Link href={path('gallery', locale)} className="text-joint hover:text-ink text-sm font-medium transition-colors">
          {t.cta}
        </Link>
      </div>

      <div className="marquee">
        <div className="marquee-track gap-3 sm:gap-4">
          {lane.map((f, i) => (
            <figure
              key={`${f.imageName}-${i}`}
              className="relative h-[46svh] w-[68vw] shrink-0 overflow-hidden sm:w-[38vw] lg:h-[54svh] lg:w-[26vw]"
              {...(i >= featuredWorkResolved.length ? { 'aria-hidden': true } : {})}
            >
              <Image
                src={f.image.file}
                alt={i >= featuredWorkResolved.length ? '' : f.alt[locale]}
                fill
                sizes="(max-width: 640px) 68vw, (max-width: 1024px) 38vw, 26vw"
                quality={70}
                loading="lazy"
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
