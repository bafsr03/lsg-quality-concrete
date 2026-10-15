import Link from 'next/link'
import type { Locale } from '@/lib/site'
import { testimonials } from '@/content/testimonials'
import type { DivisionId } from '@/content/schema'
import { path } from '@/lib/i18n/paths'
import { StarIcon } from '@/components/brand/icons'

export function Testimonials({ locale, division }: { locale: Locale; division?: DivisionId }) {
  // The trade's own reviews first, then the rest — never a filtered-empty band.
  const ordered = division
    ? [...testimonials.filter((r) => r.division === division), ...testimonials.filter((r) => r.division !== division)]
    : testimonials
  const t =
    locale === 'es'
      ? { title: 'Lo que dicen los clientes', all: 'Todas las reseñas', stars: (n: number) => `${n} de 5 estrellas` }
      : { title: 'What customers say', all: 'All reviews', stars: (n: number) => `${n} out of 5 stars` }

  const tilts = ['lg:-rotate-2', 'lg:rotate-1 lg:translate-y-6', 'lg:-rotate-1']

  return (
    <section className="bg-mark relative isolate overflow-hidden py-16 sm:py-24">
      {/* Navy chevrons along the top edge, like the tape. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-2 bg-[repeating-linear-gradient(-45deg,var(--color-navy)_0_12px,transparent_12px_24px)]" />

      <div className="mx-auto w-full max-w-[110rem] px-5 sm:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-navy text-title type-display max-w-[14ch]">{t.title}</h2>
          <Link href={path('reviews', locale)} className="btn bg-navy hover:bg-blue text-white">
            {t.all}
          </Link>
        </div>

        <ul className="grid gap-5 lg:grid-cols-3 lg:gap-7">
          {ordered.slice(0, 3).map((r, i) => (
            <li
              key={r.id}
              className={`reveal-up relative rounded-[var(--radius-panel)] bg-white p-7 shadow-[0_24px_50px_-26px_rgba(10,31,82,0.55)] transition-[rotate] duration-500 sm:p-9 lg:hover:rotate-0 ${tilts[i]}`}
            >
              <span aria-hidden="true" className="type-display text-blue/15 absolute top-3 right-6 text-[7rem] leading-none">
                &ldquo;
              </span>
              <span role="img" aria-label={t.stars(r.rating)} className="text-blue inline-flex gap-1">
                {Array.from({ length: 5 }, (_, k) => (
                  <StarIcon key={k} className={`h-5 w-5 ${k < r.rating ? '' : 'opacity-25'}`} />
                ))}
              </span>
              <blockquote lang={r.lang} className="text-navy relative mt-5 text-[1.05rem] leading-relaxed">
                {r.body}
              </blockquote>
              <p className="text-navy mt-6 flex items-center gap-3 text-sm font-bold">
                <span aria-hidden="true" className="bg-blue grid h-10 w-10 place-items-center rounded-full text-base text-white">
                  {r.author.charAt(0)}
                </span>
                {r.author}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
