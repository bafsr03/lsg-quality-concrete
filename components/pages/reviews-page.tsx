import type { Locale } from '@/lib/site'
import { testimonials } from '@/content/testimonials'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { PageHero } from '@/components/site/page-hero'
import { StarIcon } from '@/components/brand/icons'
import { JsonLd } from '@/components/seo/json-ld'
import { graph, ID, ref } from '@/lib/seo/graph'
import { QuoteCta } from '@/components/sections/quote-cta'

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
    <span role="img" aria-label={label} className="text-gold-deep inline-flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} className={`h-5 w-5 ${i < rating ? '' : 'opacity-25'}`} />
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
      <Header locale={locale} />
      <main>
        <PageHero size="display" title={t.title} lede={t.lede} mascotBubble={locale === 'es' ? '¡Gracias!' : 'Thanks, folks!'} />

        <section className="mx-auto w-full max-w-[110rem] px-5 py-16 sm:px-8 sm:py-20">
          <ul className="grid gap-5 lg:grid-cols-2">
            {testimonials.map((r) => (
              <li key={r.id} className="reveal-up relative rounded-[var(--radius-panel)] bg-white p-7 shadow-[0_24px_50px_-28px_rgba(10,31,82,0.5)] ring-1 ring-[color-mix(in_oklab,var(--color-blue)_10%,transparent)] sm:p-9">
                <Stars rating={r.rating} label={t.stars(r.rating)} />
                <h2 className="text-navy type-heading mt-4 text-xl">
                  {r.title}
                </h2>
                {/* Reviews stay in the language they were written in. */}
                <blockquote lang={r.lang} className="text-ink/80 mt-3 max-w-[52ch] leading-relaxed">
                  {r.body}
                </blockquote>
                <p className="text-joint mt-5 text-sm"><span className="text-navy font-bold">
                  {r.author}</span>{', '}
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
        <QuoteCta locale={locale} />
      </main>
      <Footer locale={locale} />
      <JsonLd data={jsonLd} />
    </>
  )
}
