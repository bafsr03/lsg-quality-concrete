import Link from 'next/link'
import type { Locale } from '@/lib/site'
import { testimonials } from '@/content/testimonials'
import { path } from '@/lib/i18n/paths'

export function Testimonials({ locale }: { locale: Locale }) {
  const t =
    locale === 'es'
      ? { title: 'Lo que dicen los clientes', all: 'Todas las reseñas' }
      : { title: 'What customers say', all: 'All reviews' }

  return (
    <section className="border-joint/40 border-b">
      <div className="mx-auto w-full max-w-[110rem] px-5 py-14 sm:px-8 sm:py-20">
        <div className="mb-8 flex items-baseline justify-between gap-6">
          <h2 className="text-ink text-heading font-bold" style={{ fontStretch: '115%' }}>
            {t.title}
          </h2>
          <Link href={path('reviews', locale)} className="text-joint hover:text-ink inline-block py-1.5 text-sm font-medium transition-colors">
            {t.all}
          </Link>
        </div>

        <ul className="border-joint/40 grid border-t lg:grid-cols-3">
          {testimonials.slice(0, 3).map((r) => (
            <li key={r.id} className="border-joint/40 border-b py-8 lg:not-last:border-r lg:pr-8 lg:not-first:pl-8">
              <span role="img" aria-label={`${r.rating}/5`} className="text-mark inline-flex gap-0.5 text-sm">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} aria-hidden="true" className={i < r.rating ? '' : 'text-joint/40'}>
                    ★
                  </span>
                ))}
              </span>
              <blockquote lang={r.lang} className="text-ink/85 mt-4 max-w-[44ch] leading-relaxed">
                {r.body}
              </blockquote>
              <p className="text-joint mt-4 text-xs">{r.author}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
