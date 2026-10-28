import Link from 'next/link'
import Image from 'next/image'
import bust from '@/public/brand/mascot-bust.png'
import monogram from '@/public/brand/monogram-gold.png'
import wordmark from '@/public/brand/wordmark-white.png'
import { BUSINESS } from '@/lib/site'
import { publishedCities } from '@/content/cities'
import { publishedDivisions } from '@/content/divisions'
import { servicesIn } from '@/content/services'
import type { Locale } from '@/lib/site'
import { divisionPath, servicePath, cityPath } from '@/lib/content/resolve'
import { path } from '@/lib/i18n/paths'
import { PhoneIcon } from '@/components/brand/icons'

/**
 * The footer carries the canonical NAP. It must match the Business Profile and
 * every directory listing character for character.
 *
 * It is also the internal-link spine: every trade, every service, every city
 * hub and every company page, from every page.
 *
 * `helper` renders the floating mascot (desktop) and the call / estimate bar
 * (phones). The estimate page turns both off: it has its own fixed bar.
 */
export function Footer({ locale, helper = true }: { locale: Locale; helper?: boolean }) {
  const t = locale === 'es'
    ? { services: 'Servicios', areas: 'Zonas que cubrimos', company: 'Empresa', contact: 'Contacto', hours: 'Lun–Sáb 8:00–18:00', help: 'Presupuesto gratis', call: 'Llamar',
        links: [['about', 'Nosotros'], ['reviews', 'Reseñas'], ['gallery', 'Galería'], ['services', 'Todos los servicios'], ['contact', 'Contacto'], ['estimate', 'Presupuesto gratis']] as const }
    : { services: 'Services', areas: 'Areas we cover', company: 'Company', contact: 'Contact', hours: 'Mon–Sat 8am–6pm', help: 'Free estimate', call: 'Call',
        links: [['about', 'About'], ['reviews', 'Reviews'], ['gallery', 'Our work'], ['services', 'All services'], ['contact', 'Contact'], ['estimate', 'Free estimate']] as const }

  return (
    <>
      <footer className="bg-navy relative isolate mt-auto overflow-hidden text-white">
        <div aria-hidden="true" className="tape h-3" />
        <div aria-hidden="true" className="bg-blue/40 absolute top-20 -left-40 -z-10 h-[30rem] w-[30rem] rounded-full blur-[120px]" />

        <div className="mx-auto grid w-full max-w-[110rem] gap-12 px-5 pt-16 pb-10 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.1fr_2.4fr_0.9fr_0.9fr]">
          <div>
            {/* The main logo, its monogram in gold on the navy. */}
            <div className="flex w-60 flex-col items-center gap-3">
              <Image src={monogram} alt="" sizes="160px" quality={85} className="h-20 w-auto" />
              <Image src={wordmark} alt={BUSINESS.name} sizes="240px" quality={90} className="h-auto w-full" />
            </div>
            <address className="mt-4 text-sm text-white/75 not-italic">
              <p>
                {BUSINESS.locality}, {BUSINESS.region} {BUSINESS.postalCode}
              </p>
              <p className="mt-3">
                <a href={BUSINESS.phone.href} data-loc="footer" className="text-mark inline-flex items-center gap-2 py-1.5 text-lg font-bold transition-colors hover:text-white">
                  <PhoneIcon className="h-4 w-4" />
                  {BUSINESS.phone.display}
                </a>
              </p>
              <p>
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-mark inline-block py-1.5 transition-colors">
                  {BUSINESS.email}
                </a>
              </p>
              <p className="pt-2 text-white/55">{t.hours}</p>
            </address>
          </div>

          <nav aria-label={t.services}>
            <h2 className="text-mark text-sm font-bold">{t.services}</h2>
            <div className="mt-3 grid gap-x-8 gap-y-6 text-sm sm:grid-cols-2 xl:grid-cols-3">
              {publishedDivisions.map((d) => (
                <div key={d.id}>
                  <Link href={divisionPath(d, locale)} className="hover:text-mark block py-1.5 font-bold text-white transition-colors">
                    {d.name[locale]}
                  </Link>
                  <ul>
                    {servicesIn(d.id).map((s) => (
                      <li key={s.id}>
                        <Link href={servicePath(s, locale)} className="foot-link">
                          {s.name[locale]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          <nav aria-label={t.areas}>
            <h2 className="text-mark text-sm font-bold">{t.areas}</h2>
            <ul className="mt-3 text-sm">
              {publishedCities.map((c) => (
                <li key={c.id}>
                  <Link href={cityPath(c, locale)} className="foot-link">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.company}>
            <h2 className="text-mark text-sm font-bold">{t.company}</h2>
            <ul className="mt-3 text-sm">
              {t.links.map(([key, label]) => (
                <li key={key}>
                  <Link href={path(key, locale)} className="foot-link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* The wordmark, set huge and hollow — a sign painted on the crew truck. */}
        <p
          aria-hidden="true"
          className="type-display mx-auto w-full max-w-[110rem] px-5 text-[clamp(1.1rem,6.1vw,7.25rem)] whitespace-nowrap text-transparent select-none sm:px-8"
          style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.16)' }}
        >
          {BUSINESS.name}
        </p>

        <div className="mx-auto w-full max-w-[110rem] border-t border-white/10 px-5 py-6 pb-24 sm:px-8 lg:pb-6">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} {BUSINESS.legalName}
          </p>
        </div>
      </footer>

      {helper && (
        <div
          className="bg-navy fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 px-3 pt-3 shadow-[0_-12px_30px_-12px_rgba(10,31,82,0.6)] lg:hidden"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          <a href={BUSINESS.phone.href} data-loc="mobile-bar" className="btn btn-ghost-light justify-center px-3 py-3 text-sm whitespace-nowrap">
            <PhoneIcon className="h-4 w-4" />
            {t.call}
          </a>
          <Link href={path('estimate', locale)} data-loc="mobile-bar-estimate" className="btn btn-gold justify-center px-3 py-3 text-sm whitespace-nowrap">
            {t.help}
          </Link>
        </div>
      )}

      {helper && (
        <Link
          href={path('estimate', locale)}
          className="helper group fixed right-6 bottom-6 z-50 hidden items-center gap-2 lg:flex"
        >
          <span aria-hidden="true" className="bg-navy pointer-events-none hidden translate-x-2 rounded-full px-4 py-2.5 text-sm font-bold text-white opacity-0 shadow-lg transition-[opacity,translate] duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block">
            {t.help}
          </span>
          {/* His head and shoulders, cut round, fill the circle. */}
          <span className="bg-mark ring-blue relative grid h-[4.25rem] w-[4.25rem] place-items-center rounded-full shadow-[0_14px_30px_-10px_rgba(10,31,82,0.7)] ring-4 transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
            <Image src={bust} alt="" sizes="80px" quality={80} className="helper-bob h-auto w-[88%]" />
            <span className="sr-only">{t.help}</span>
          </span>
        </Link>
      )}
    </>
  )
}
