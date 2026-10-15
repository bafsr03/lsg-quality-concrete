import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '@/lib/site'
import { featuredWorkResolved } from '@/content/showcase'
import { galleryImages } from '@/content/gallery'
import { path } from '@/lib/i18n/paths'

export function FeaturedWork({ locale }: { locale: Locale }) {
  const t =
    locale === 'es'
      ? { title: 'Trabajo terminado', lede: 'Fotos de nuestras propias obras, sin bancos de imágenes.', cta: `Ver las ${galleryImages.length} fotos` }
      : { title: 'Finished work', lede: 'Photos from our own jobs. No stock photography, ever.', cta: `See all ${galleryImages.length} photos` }

  // The track holds the list twice so the marquee seam is invisible; the
  // duplicate is hidden from assistive technology.
  const lane = [...featuredWorkResolved, ...featuredWorkResolved]

  return (
    <section className="bg-screed relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto mb-10 flex w-full max-w-[110rem] flex-wrap items-end justify-between gap-6 px-5 sm:px-8">
        <div>
          <h2 className="text-navy text-title type-display">{t.title}</h2>
          <p className="text-joint text-lede mt-4 max-w-[44ch] leading-relaxed">{t.lede}</p>
        </div>
        <Link href={path('gallery', locale)} className="btn btn-blue">
          {t.cta}
        </Link>
      </div>

      <div className="marquee py-6">
        <div className="marquee-track gap-5 sm:gap-7">
          {lane.map((f, i) => (
            <figure
              key={`${f.imageName}-${i}`}
              className={`relative h-[44svh] w-[66vw] shrink-0 overflow-hidden rounded-[var(--radius-photo)] border-[5px] border-white shadow-[0_24px_40px_-22px_rgba(10,31,82,0.65)] transition-transform duration-500 ease-[var(--ease-spring)] hover:z-10 hover:scale-[1.04] hover:rotate-0 sm:w-[36vw] lg:h-[52svh] lg:w-[24vw] ${i % 2 === 0 ? '-rotate-2' : 'rotate-2'}`}
              {...(i >= featuredWorkResolved.length ? { 'aria-hidden': true } : {})}
            >
              <Image
                src={f.image.file}
                alt={i >= featuredWorkResolved.length ? '' : f.alt[locale]}
                fill
                sizes="(max-width: 640px) 66vw, (max-width: 1024px) 36vw, 24vw"
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
