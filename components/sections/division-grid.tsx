import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '@/lib/site'
import { publishedDivisions } from '@/content/divisions'
import { servicesIn } from '@/content/services'
import { divisionPath } from '@/lib/content/resolve'
import { byPartner } from '@/lib/content/trades'
import { image } from '@/lib/content/media'
import { path } from '@/lib/i18n/paths'
import { ArrowIcon } from '@/components/brand/icons'

/**
 * The trades as a bento. Concrete — the biggest share of the work, and the
 * most photographed — takes the large tile. Trades whose job photos have not
 * arrived yet render as solid colour tiles listing their services, rather than
 * borrowing a stock photo.
 */
export function DivisionGrid({ locale, heading }: { locale: Locale; heading?: string }) {
  const t =
    locale === 'es'
      ? { title: heading ?? 'Lo que construimos', lede: 'Un solo contratista para la obra completa: del concreto al jardín y al sótano terminado.', all: 'Todos los servicios', partner: 'Con socios con licencia en Utah' }
      : { title: heading ?? 'What we build', lede: 'One contractor for the whole project, from the concrete to the yard to the finished basement.', all: 'All services', partner: 'Through Utah-licensed partners' }

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto mb-10 flex w-full max-w-[110rem] flex-wrap items-end justify-between gap-6 px-5 sm:px-8">
        <div>
          <h2 className="text-navy text-title type-display">{t.title}</h2>
          <p className="text-joint text-lede mt-4 max-w-[44ch] leading-relaxed">{t.lede}</p>
        </div>
        <Link href={path('services', locale)} className="btn btn-ghost-dark">
          {t.all}
        </Link>
      </div>

      <div className="mx-auto grid w-full max-w-[110rem] auto-rows-[16rem] gap-3 px-5 sm:grid-cols-2 sm:auto-rows-[18rem] sm:gap-4 sm:px-8 lg:grid-cols-4">
        {publishedDivisions.map((d, i) => {
          const img = d.heroImageId ? image(d.heroImageId) : null
          const big = i === 0
          return (
            <Link
              key={d.id}
              href={divisionPath(d, locale)}
              className={`group reveal-up relative isolate flex overflow-hidden rounded-[var(--radius-photo)] shadow-[0_18px_40px_-24px_rgba(10,31,82,0.6)] transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_50px_-24px_rgba(22,82,217,0.7)] ${big ? 'sm:col-span-2 sm:row-span-2' : ''} ${img ? '' : 'field-blue'}`}
            >
              {img ? (
                <>
                  <Image
                    src={img.file}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes={big ? '(max-width: 640px) 100vw, 50vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'}
                    quality={70}
                    loading="lazy"
                    className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                  />
                  <div aria-hidden="true" className="from-navy/95 via-navy/35 absolute inset-0 -z-10 bg-gradient-to-t to-transparent" />
                </>
              ) : (
                <ul aria-hidden="true" className="absolute top-5 right-5 left-5 flex flex-wrap gap-1.5">
                  {servicesIn(d.id).map((s) => (
                    <li key={s.id} className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-white/85 ring-1 ring-white/20">
                      {s.name[locale]}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto flex w-full items-end justify-between gap-4 p-5 sm:p-6">
                <div>
                  <h3 className={`type-heading text-white ${big ? 'text-3xl sm:text-5xl' : 'text-2xl sm:text-3xl'}`}>{d.name[locale]}</h3>
                  <p className={`mt-2 max-w-[38ch] text-sm leading-snug text-white/80 ${big ? 'sm:text-base' : 'line-clamp-2'}`}>
                    {byPartner(d) ? t.partner : d.lede[locale]}
                  </p>
                </div>
                <span className="bg-mark text-navy grid h-11 w-11 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-45">
                  <ArrowIcon className="h-5 w-5" />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
