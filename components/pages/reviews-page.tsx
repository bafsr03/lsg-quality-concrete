import type { Locale } from '@/lib/site'
import { testimonials } from '@/content/testimonials'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { JointGrid } from '@/components/site/joint-grid'
import { JsonLd } from '@/components/seo/json-ld'
import { graph, ID, ref } from '@/lib/seo/graph'

const copy = {
  en: {
    title: 'What customers say',
    lede: 'Reviews carried over from our previous site, word for word.',
    stars: (n: number) => `Rated ${n} out of 5`,
  },
  es: {
    title: 'Lo que dicen los clientes',
    lede: 'Reseñas trasladadas de nuestro sitio anterior, palabra por palabra.',
    stars: (n: number) => `Calificado ${n} de 5`,
  },
} as const

function Stars({ rating, label }: { rating: number; label: string }) {
  return (
    <span role="img" aria-label={label} className="text-mark inline-flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden="true" className={i < rating ? '' : 'text-joint/40'}>
          ★
        </span>
      ))}
    </span>
  )
}

export function ReviewsPage({ locale }: { locale: Locale }) {
  const t = copy[locale]

  /**
   * Individual Review nodes referencing the business by @id. No
   * AggregateRating: it requires verified counts, and the five reviews we
   * actually hold average 4.8 rather than the 5.0 the directory profiles show.
   */
  const jsonLd = graph(
    testimonials.map((r) => ({
      '@type': 'Review',
      itemReviewed: ref(ID.org),
      author: { '@type': 'Person', name: r.author },
      datePublished: r.date,
      name: r.title,
      reviewBody: r.body,
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 },
    })),
  )

  return (
    <>
      <Header />
      <main>
        <section className="border-joint/40 text-joint/55 relative border-b">
          <JointGrid />
          <div className="relative mx-auto w-full max-w-[110rem] px-5 py-16 sm:px-8 sm:py-24">
            <h1
              className="text-ink text-display max-w-[12ch] leading-[0.9] font-bold"
              style={{ fontStretch: '120%', letterSpacing: 'var(--tracking-display)' }}
            >
              {t.title}
            </h1>
            <p className="text-ink/80 text-lede mt-6 max-w-[46ch] leading-relaxed">{t.lede}</p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[110rem] px-5 sm:px-8">
          <ul className="border-joint/40 grid border-b lg:grid-cols-2">
            {testimonials.map((r) => (
              <li key={r.id} className="border-joint/40 border-t px-1 py-8 lg:px-8">
                <Stars rating={r.rating} label={t.stars(r.rating)} />
                <h2 className="text-ink mt-3 text-base font-semibold" style={{ fontStretch: '112%' }}>
                  {r.title}
                </h2>
                {/* Reviews stay in the language they were written in. */}
                <blockquote lang={r.lang} className="text-ink/80 mt-3 max-w-[52ch] leading-relaxed">
                  {r.body}
                </blockquote>
                <p className="text-joint mt-4 text-xs">
                  {r.author} ·{' '}
                  <time dateTime={r.date}>
                    {new Date(r.date + 'T00:00:00Z').toLocaleDateString(locale === 'es' ? 'es-US' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      timeZone: 'UTC',
                    })}
                  </time>
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer locale={locale} />
      <JsonLd data={jsonLd} />
    </>
  )
}
