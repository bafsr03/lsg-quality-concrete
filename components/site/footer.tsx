import Link from 'next/link'
import Image from 'next/image'
import logoMark from '@/public/brand/mark.png'
import { BUSINESS } from '@/lib/site'
import { publishedCities } from '@/content/cities'
import { publishedServices } from '@/content/services'
import type { Locale } from '@/lib/site'
import { servicePath, cityPath } from '@/lib/content/resolve'

/**
 * The footer carries the canonical NAP. It must match the Business Profile and
 * every directory listing character for character — the old site published one
 * service area while Yelp and Angi published a different one.
 */
export function Footer({ locale }: { locale: Locale }) {
  const t = locale === 'es'
    ? { services: 'Servicios', areas: 'Zonas que cubrimos', contact: 'Contacto', hours: 'Lun–Sáb 8:00–18:00' }
    : { services: 'Services', areas: 'Areas we cover', contact: 'Contact', hours: 'Mon–Sat 8am–6pm' }

  return (
    <footer className="bg-shadow text-slab mt-auto">
      <div className="mx-auto grid w-full max-w-[110rem] gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image src={logoMark} alt="" aria-hidden="true" className="h-12 w-12 shrink-0" />
            <p className="text-lg font-bold" style={{ fontStretch: '118%' }}>
              {BUSINESS.name}
            </p>
          </div>
          <address className="text-slab/70 mt-4 space-y-1 text-sm not-italic">
            <p>
              {BUSINESS.locality}, {BUSINESS.region} {BUSINESS.postalCode}
            </p>
            <p>
              <a href={BUSINESS.phone.href} data-loc="footer" className="hover:text-mark transition-colors">
                {BUSINESS.phone.display}
              </a>
            </p>
            <p>
              <a href={`mailto:${BUSINESS.email}`} className="hover:text-mark transition-colors">
                {BUSINESS.email}
              </a>
            </p>
            <p className="text-slab/50 pt-2">{t.hours}</p>
          </address>
        </div>

        <nav aria-label={t.services}>
          <h2 className="text-slab/50 text-xs font-semibold">{t.services}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {publishedServices.map((s) => (
              <li key={s.id}>
                <Link href={servicePath(s, locale)} className="text-slab/80 hover:text-mark transition-colors">
                  {s.name[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.areas}>
          <h2 className="text-slab/50 text-xs font-semibold">{t.areas}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {publishedCities.map((c) => (
              <li key={c.id}>
                <Link href={cityPath(c, locale)} className="text-slab/80 hover:text-mark transition-colors">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-slab/15 mx-auto w-full max-w-[110rem] border-t px-5 py-6 sm:px-8">
        <p className="text-slab/40 text-xs">
          © {new Date().getFullYear()} {BUSINESS.legalName}
        </p>
      </div>
    </footer>
  )
}
