import Link from 'next/link'
import { BUSINESS, type Locale } from '@/lib/site'
import { path } from '@/lib/i18n/paths'
import { publishedDivisions } from '@/content/divisions'
import { servicesIn } from '@/content/services'
import { divisionPath, servicePath } from '@/lib/content/resolve'
import { byPartner } from '@/lib/content/trades'
import { Glint, PhoneIcon } from '@/components/brand/icons'
import { Logo } from '@/components/brand/logo'

const copy = {
  en: {
    services: 'Services', areas: 'Service areas', work: 'Work', reviews: 'Reviews', about: 'About',
    all: 'All services', partner: 'Licensed partners',
    cta: 'Free estimate', home: `${BUSINESS.name} — home`,
    offers: [
      'Free written estimates',
      `${BUSINESS.offers.seniorDiscountPct}% off for seniors`,
      `$${BUSINESS.offers.referralRewardUsd} for every referral`,
      'Hablamos español',
    ],
  },
  es: {
    services: 'Servicios', areas: 'Zonas de servicio', work: 'Trabajo', reviews: 'Reseñas', about: 'Nosotros',
    all: 'Todos los servicios', partner: 'Socios con licencia',
    cta: 'Presupuesto gratis', home: `${BUSINESS.name} — inicio`,
    offers: [
      'Presupuestos gratis por escrito',
      `${BUSINESS.offers.seniorDiscountPct}% de descuento a mayores`,
      `$${BUSINESS.offers.referralRewardUsd} por cada recomendación`,
      'We speak English',
    ],
  },
} as const

const navLink =
  'text-navy/80 hover:text-navy after:bg-mark relative py-2 text-[0.95rem] font-semibold transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:origin-left after:scale-x-0 after:rounded-full after:transition-transform after:duration-300 hover:after:scale-x-100'

export function Header({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale]
  const nav = [
    { label: t.areas, href: path('serviceAreas', locale) },
    { label: t.work, href: path('gallery', locale) },
    { label: t.reviews, href: path('reviews', locale) },
    { label: t.about, href: path('about', locale) },
  ]

  return (
    <>
      {/* Offer bar — the standing deals, said once, up top. */}
      <div className="bg-navy text-white">
        <ul className="mx-auto flex w-full max-w-[110rem] items-center justify-center gap-x-7 gap-y-1 px-5 py-2 text-xs font-semibold sm:px-8 sm:text-[0.8rem] lg:justify-between">
          {t.offers.map((o, i) => (
            <li key={o} className={`items-center gap-2 ${i === 0 ? 'flex' : i === 1 ? 'hidden sm:flex' : 'hidden md:flex'}`}>
              <Glint className="text-mark h-3 w-3 shrink-0" />
              {o}
            </li>
          ))}
        </ul>
      </div>

      <header className="sticky top-0 z-40 border-b border-[color-mix(in_oklab,var(--color-blue)_12%,transparent)] bg-white/90 shadow-[0_8px_30px_-18px_rgba(10,31,82,0.35)] backdrop-blur-md">
        <div className="relative mx-auto flex w-full max-w-[110rem] items-center justify-between gap-6 px-5 py-2.5 sm:px-8">
          <Link href={path('home', locale)} aria-label={t.home} className="shrink-0 transition-transform duration-300 hover:-rotate-2 hover:scale-105">
            <Logo />
          </Link>

          <nav aria-label={t.services} className="hidden items-center gap-8 lg:flex">
            {/*
              Services mega-menu. CSS only (hover and focus-within), so it adds
              nothing to the client bundle; the trigger is a real link to the
              services index, so touch and no-hover devices still get there.
            */}
            <div className="group/menu">
              <Link href={path('services', locale)} className={`${navLink} inline-flex items-center gap-1.5`}>
                {t.services}
                <span aria-hidden="true" className="text-blue text-xs transition-transform group-focus-within/menu:rotate-180 group-hover/menu:rotate-180">▾</span>
              </Link>
              <div className="invisible absolute inset-x-5 top-full pt-2 opacity-0 transition-[opacity,visibility] duration-200 group-focus-within/menu:visible group-focus-within/menu:opacity-100 group-hover/menu:visible group-hover/menu:opacity-100 sm:inset-x-8">
                <div className="grid grid-cols-5 gap-6 rounded-[var(--radius-panel)] bg-white p-7 shadow-[0_30px_60px_-30px_rgba(10,31,82,0.6)] ring-1 ring-[color-mix(in_oklab,var(--color-blue)_12%,transparent)]">
                  {publishedDivisions.map((d) => (
                    <div key={d.id}>
                      <Link href={divisionPath(d, locale)} className="text-navy hover:text-blue type-heading text-lg transition-colors">
                        {d.name[locale]}
                      </Link>
                      {byPartner(d) && <p className="text-blue mt-0.5 text-[0.7rem] font-bold">{t.partner}</p>}
                      <ul className="mt-3 space-y-0.5">
                        {servicesIn(d.id).map((s) => (
                          <li key={s.id}>
                            <Link href={servicePath(s, locale)} className="menu-link">
                              {s.name[locale]}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className={navLink}>
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={BUSINESS.phone.href}
              data-loc="header"
              className="group text-navy hidden items-center gap-2.5 text-sm font-bold sm:flex"
            >
              <span className="bg-blue relative grid h-9 w-9 place-items-center rounded-full text-white transition-transform group-hover:scale-110">
                <PhoneIcon className="ringing h-4 w-4" />
              </span>
              <span className="group-hover:text-blue transition-colors">{BUSINESS.phone.display}</span>
            </a>
            {/* Phones get Call / Free estimate in the fixed bottom bar instead. */}
            <Link href={path('estimate', locale)} data-loc="header-estimate" className="btn btn-gold px-5 py-3 text-sm whitespace-nowrap max-sm:hidden">
              {t.cta}
            </Link>
          </div>
        </div>

        {/* The trades are the money pages; on small screens they still need a way in. */}
        <nav aria-label={t.services} className="scrollbar-none flex gap-2 overflow-x-auto px-5 pb-3 sm:px-8 lg:hidden">
          {publishedDivisions.map((d) => (
            <Link
              key={d.id}
              href={divisionPath(d, locale)}
              className="bg-screed text-navy hover:bg-blue flex shrink-0 items-center rounded-full px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-colors hover:text-white"
            >
              {d.name[locale]}
            </Link>
          ))}
          <Link
            href={path('serviceAreas', locale)}
            className="text-navy hover:bg-blue flex shrink-0 items-center rounded-full px-3.5 py-2 text-xs font-semibold whitespace-nowrap ring-1 ring-[color-mix(in_oklab,var(--color-blue)_20%,transparent)] transition-colors hover:text-white"
          >
            {t.areas}
          </Link>
        </nav>
      </header>
    </>
  )
}
