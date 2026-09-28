import Image from 'next/image'
import type { Locale } from '@/lib/site'
import { galleryImages, concreteImages, remodelingImages, galleryAlt } from '@/content/gallery'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { JointGrid } from '@/components/site/joint-grid'
import { JsonLd } from '@/components/seo/json-ld'
import { graph } from '@/lib/seo/graph'
import { SITE_URL } from '@/lib/site'

const copy = {
  en: {
    title: 'The work',
    lede: 'Photographs from our own job sites — forms, subgrade, pours and finished flatwork across Utah County and the Salt Lake Valley.',
    count: (n: number) => `${n} photographs`,
    concrete: 'Concrete',
    remodeling: 'Remodeling',
  },
  es: {
    title: 'El trabajo',
    lede: 'Fotografías de nuestras propias obras: cimbras, subrasante, vertidos y obra plana terminada en el Condado de Utah y el Valle de Salt Lake.',
    count: (n: number) => `${n} fotografías`,
    concrete: 'Concreto',
    remodeling: 'Remodelación',
  },
} as const

export function GalleryPage({ locale }: { locale: Locale }) {
  const t = copy[locale]

  return (
    <>
      <Header locale={locale} />
      <main>
        <section className="border-joint/40 text-joint/55 relative border-b">
          <JointGrid />
          <div className="relative mx-auto w-full max-w-[110rem] px-5 py-14 sm:px-8 sm:py-20">
            <h1
              className="text-ink text-display max-w-[12ch] leading-[0.9] font-bold"
              style={{ fontStretch: '120%', letterSpacing: 'var(--tracking-display)' }}
            >
              {t.title}
            </h1>
            <p className="text-ink/80 text-lede mt-6 max-w-[48ch] leading-relaxed text-pretty">{t.lede}</p>
            <p className="text-joint mt-6 text-xs">{t.count(galleryImages.length)}</p>
          </div>
        </section>

        {/*
          Portrait dominates this library 77 to 2, so portrait is the design
          language rather than a problem to crop around. A column layout lets
          every photo keep its native ratio; cover-cropping phone photos into
          landscape cards removes the concrete from concrete photos.
        */}
        {[
          { key: 'concrete', heading: t.concrete, items: concreteImages },
          { key: 'remodeling', heading: t.remodeling, items: remodelingImages },
        ]
          .filter((g) => g.items.length > 0)
          .map((g) => (
            <section key={g.key} className="mx-auto w-full max-w-[110rem] px-5 pb-14 sm:px-8">
              <h2
                className="border-joint/40 text-ink text-heading border-b py-6 font-bold"
                style={{ fontStretch: '115%' }}
              >
                {g.heading}
                <span className="text-joint ml-3 align-middle text-xs font-normal">{g.items.length}</span>
              </h2>
              <div className="columns-2 gap-3 pt-6 sm:gap-4 lg:columns-3 xl:columns-4">
                {g.items.map((img, i) => (
                  <figure key={img.id} className="mb-3 break-inside-avoid sm:mb-4">
                    <Image
                      src={img.file}
                      alt={galleryAlt(img.id, locale)}
                      width={img.width}
                      height={img.height}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      quality={70}
                      loading={g.key === 'concrete' && i < 4 ? 'eager' : 'lazy'}
                      className="h-auto w-full"
                    />
                  </figure>
                ))}
              </div>
            </section>
          ))}

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
