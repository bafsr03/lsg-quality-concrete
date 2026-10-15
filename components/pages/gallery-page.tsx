import Image from 'next/image'
import type { Locale } from '@/lib/site'
import { galleryImages, imagesFor, galleryAlt } from '@/content/gallery'
import { divisions } from '@/content/divisions'
import { divisionPath } from '@/lib/content/resolve'
import Link from 'next/link'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { PageHero } from '@/components/site/page-hero'
import { JsonLd } from '@/components/seo/json-ld'
import { graph } from '@/lib/seo/graph'
import { QuoteCta } from '@/components/sections/quote-cta'
import { SITE_URL } from '@/lib/site'

const copy = {
  en: {
    title: 'The work',
    lede: 'Photographs from our own job sites across Utah County and the Salt Lake Valley, grouped by trade. New jobs are added as they finish.',
    count: (n: number) => `${n} photographs`,
    more: (d: string) => `About our ${d.toLowerCase()} work`,
  },
  es: {
    title: 'El trabajo',
    lede: 'Fotografías de nuestras propias obras en el Condado de Utah y el Valle de Salt Lake, agrupadas por oficio. Agregamos trabajos nuevos al terminarlos.',
    count: (n: number) => `${n} fotografías`,
    more: (d: string) => `Sobre nuestro trabajo de ${d.toLowerCase()}`,
  },
} as const

export function GalleryPage({ locale }: { locale: Locale }) {
  const t = copy[locale]

  return (
    <>
      <Header locale={locale} />
      <main>
        <PageHero
          size="display"
          title={t.title}
          lede={t.lede}
          kicker={<span className="bg-mark text-navy inline-flex rounded-full px-4 py-2 font-bold">{t.count(galleryImages.length)}</span>}
        />

        {/*
          Portrait dominates this library 77 to 2, so portrait is the design
          language rather than a problem to crop around. A column layout lets
          every photo keep its native ratio; cover-cropping phone photos into
          landscape cards removes the concrete from concrete photos.
        */}
        {/* A trade appears here only once it has real photographs. */}
        {divisions
          .map((d) => ({ key: d.id, division: d, heading: d.name[locale], items: imagesFor(d.id) }))
          .filter((g) => g.items.length > 0)
          .map((g) => (
            <section key={g.key} id={g.key} className="mx-auto w-full max-w-[110rem] scroll-mt-32 px-5 pt-14 pb-6 sm:px-8 sm:pt-20">
              <h2 className="text-navy text-title type-display flex flex-wrap items-center gap-x-4 gap-y-2">
                {g.heading}
                <span className="bg-blue rounded-full px-3 py-1 text-sm font-bold text-white not-italic" style={{ fontStretch: '100%', letterSpacing: 0 }}>
                  {g.items.length}
                </span>
              </h2>
              <div className="columns-2 gap-3 pt-6 sm:gap-4 lg:columns-3 xl:columns-4">
                {g.items.map((img, i) => (
                  <figure key={img.id} className="group mb-3 break-inside-avoid overflow-hidden rounded-2xl shadow-[0_14px_30px_-20px_rgba(10,31,82,0.6)] sm:mb-4">
                    <Image
                      src={img.file}
                      alt={galleryAlt(img.id, locale)}
                      width={img.width}
                      height={img.height}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      quality={70}
                      loading={g.key === 'concrete' && i < 4 ? 'eager' : 'lazy'}
                      className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </figure>
                ))}
              </div>
              <Link href={divisionPath(g.division, locale)} className="btn btn-ghost-dark mt-4">
                {t.more(g.heading)}
              </Link>
            </section>
          ))}

        <QuoteCta locale={locale} />
      </main>
      <Footer locale={locale} />
      <JsonLd
        data={graph([
          {
            '@type': 'ImageGallery',
            name: t.title,
            description: t.lede,
            url: new URL(locale === 'es' ? '/es/galeria/' : '/gallery/', SITE_URL).toString(),
            numberOfItems: galleryImages.length,
          },
        ])}
      />
    </>
  )
}
