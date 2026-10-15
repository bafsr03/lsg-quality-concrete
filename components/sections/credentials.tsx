import { BUSINESS, type Locale } from '@/lib/site'
import { publishedCities } from '@/content/cities'
import { galleryImages } from '@/content/gallery'

/**
 * A band of things that are actually true and verifiable. No licence claim and
 * no star rating — both are unconfirmed.
 *
 * Numbers count up as the band scrolls into view (CSS scroll timeline, see
 * `.count` in globals.css). The real value is always in the DOM for screen
 * readers, and browsers without scroll timelines just show the final number.
 */
export function Credentials({ locale }: { locale: Locale }) {
  const items =
    locale === 'es'
      ? [
          { n: BUSINESS.yearsExperience, suffix: '+', label: 'años construyendo en el valle' },
          { n: publishedCities.length, suffix: '', label: 'ciudades que atendemos' },
          { n: galleryImages.length, suffix: '', label: 'fotos de obras reales' },
          { n: null, text: 'Gratis', label: 'presupuestos por escrito' },
        ]
      : [
          { n: BUSINESS.yearsExperience, suffix: '+', label: 'years building in the valley' },
          { n: publishedCities.length, suffix: '', label: 'cities we cover' },
          { n: galleryImages.length, suffix: '', label: 'photos of real jobs' },
          { n: null, text: 'Free', label: 'written estimates' },
        ]

  return (
    <section className="px-5 pt-12 pb-4 sm:px-8 sm:pt-16">
      <dl className="bg-navy reveal-up relative mx-auto grid w-full max-w-[110rem] grid-cols-2 overflow-hidden rounded-[var(--radius-panel)] text-white shadow-[0_30px_60px_-30px_rgba(10,31,82,0.7)] lg:grid-cols-4">
        <div aria-hidden="true" className="bg-blue/60 absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl" />
        {items.map((it, i) => (
          <div
            key={it.label}
            className={`relative px-6 py-8 sm:px-10 sm:py-10 ${i % 2 === 0 ? 'border-r border-white/10' : ''} ${i < 2 ? 'border-b border-white/10 lg:border-b-0' : ''} ${i === 1 ? 'lg:border-r' : ''}`}
          >
            <dt className="sr-only">{it.label}</dt>
            <dd>
              <span className="text-mark type-display block text-5xl sm:text-6xl">
                {it.n === null ? (
                  it.text
                ) : (
                  <>
                    <span className="sr-only">{it.n}</span>
                    <span aria-hidden="true" className="count" style={{ ['--to' as string]: it.n }} />
                    {it.suffix && <span aria-hidden="true">{it.suffix}</span>}
                  </>
                )}
              </span>
              <span className="mt-3 block text-sm font-medium text-white/75">{it.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
