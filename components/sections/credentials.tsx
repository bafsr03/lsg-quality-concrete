import { BUSINESS, type Locale } from '@/lib/site'
import { publishedCities } from '@/content/cities'
import { galleryImages } from '@/content/gallery'

/**
 * A thin band of things that are actually true and verifiable. No licence
 * claim and no star rating — both are unconfirmed, and a contractor inventing
 * either is a real liability rather than a marketing flourish.
 */
export function Credentials({ locale }: { locale: Locale }) {
  const items =
    locale === 'es'
      ? [
          { value: `${BUSINESS.yearsExperience}`, label: 'años en el valle' },
          { value: `${publishedCities.length}`, label: 'ciudades atendidas' },
          { value: `${galleryImages.length}`, label: 'fotos de obras reales' },
          { value: 'Gratis', label: 'presupuestos por escrito' },
        ]
      : [
          { value: `${BUSINESS.yearsExperience}`, label: 'years in the valley' },
          { value: `${publishedCities.length}`, label: 'cities served' },
          { value: `${galleryImages.length}`, label: 'photos of real jobs' },
          { value: 'Free', label: 'written estimates' },
        ]

  return (
    <section className="border-joint/40 bg-screed/50 border-b">
      <dl className="mx-auto grid w-full max-w-[110rem] grid-cols-2 px-5 sm:px-8 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.label} className="border-joint/25 py-8 not-last:border-b lg:border-b-0 lg:not-last:border-r lg:pr-8 lg:not-first:pl-8">
            <dt className="sr-only">{it.label}</dt>
            <dd>
              <span className="text-ink block text-3xl leading-none font-bold sm:text-4xl" style={{ fontStretch: '118%' }}>
                {it.value}
              </span>
              <span className="text-joint mt-2 block text-xs">{it.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
