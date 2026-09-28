import Link from 'next/link'
import Image from 'next/image'
import { BUSINESS, type Locale } from '@/lib/site'
import { path } from '@/lib/i18n/paths'
import { publishedServices } from '@/content/services'
import { servicePath } from '@/lib/content/resolve'
import logo from '@/public/brand/logo.png'

const copy = {
  en: { services: 'Services', work: 'Work', reviews: 'Reviews', about: 'About', contact: 'Contact', cta: 'Free estimate', home: 'LSG Quality Concrete — home' },
  es: { services: 'Servicios', work: 'Trabajo', reviews: 'Reseñas', about: 'Nosotros', contact: 'Contacto', cta: 'Presupuesto', home: 'LSG Quality Concrete — inicio' },
} as const

export function Header({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale]
  const nav = [
    { label: t.services, href: path('services', locale) },
    { label: t.work, href: path('gallery', locale) },
    { label: t.reviews, href: path('reviews', locale) },
    { label: t.about, href: path('about', locale) },
    { label: t.contact, href: path('contact', locale) },
  ]

  return (
    <header className="border-joint/40 bg-slab/95 sticky top-0 z-40 border-b backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-[110rem] items-center justify-between gap-6 px-5 py-3 sm:px-8">
        <Link href={path('home', locale)} aria-label={t.home} className="shrink-0">
          <Image src={logo} alt={BUSINESS.name} priority={false} className="h-9 w-auto sm:h-11" />
        </Link>

        <nav aria-label={t.services} className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-ink/75 hover:text-ink text-sm font-medium tracking-tight transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={BUSINESS.phone.href}
            data-loc="header"
            className="text-ink hover:text-mark hidden text-sm font-semibold tracking-tight transition-colors sm:block"
          >
            {BUSINESS.phone.display}
          </a>
          <Link
            href={path('estimate', locale)}
            className="bg-mark text-ink hover:bg-ink hover:text-slab inline-flex items-center px-4 py-2.5 text-xs font-semibold tracking-tight transition-colors sm:px-5 sm:text-sm"
          >
            {t.cta}
          </Link>
        </div>
      </div>

      {/* Services are the money pages; on small screens they still need a way in. */}
      <nav
        aria-label={t.services}
        className="border-joint/30 scrollbar-none flex gap-4 overflow-x-auto border-t px-5 sm:px-8 lg:hidden"
      >
        {publishedServices.slice(0, 6).map((s) => (
          <Link
            key={s.id}
            href={servicePath(s, locale)}
            className="text-joint hover:text-ink flex shrink-0 items-center py-3.5 text-xs font-medium whitespace-nowrap transition-colors"
          >
            {s.name[locale]}
          </Link>
        ))}
      </nav>
    </header>
  )
}
