import Link from 'next/link'
import type { City } from '@/content/schema'
import { BUSINESS, SITE_URL, type Locale } from '@/lib/site'
import { publishedServices } from '@/content/services'
import { servicePath, cityPath } from '@/lib/content/resolve'
import { path } from '@/lib/i18n/paths'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { JointGrid } from '@/components/site/joint-grid'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbNode, graph, ID, ref } from '@/lib/seo/graph'

const copy = {
  en: {
    eyebrow: (c: string) => `Serving ${c}`,
    title: (c: string) => `Concrete contractor in ${c}`,
    what: 'What we pour here',
    cta: 'Get a free estimate',
    drive: (m: number) => `${m} minutes from our Eagle Mountain base`,
    areas: 'Areas we cover',
  },
  es: {
    eyebrow: (c: string) => `Atendemos ${c}`,
    title: (c: string) => `Contratista de concreto en ${c}`,
    what: 'Lo que hacemos aquí',
    cta: 'Solicitar presupuesto',
    drive: (m: number) => `A ${m} minutos de nuestra base en Eagle Mountain`,
    areas: 'Zonas que cubrimos',
  },
} as const

export function CityPage({ city, locale }: { city: City; locale: Locale }) {
  const t = copy[locale]
  const here = cityPath(city, locale)

  const jsonLd = graph([
    {
      '@type': 'Service',
      name: t.title(city.name),
      description: city.seo[locale].description,
      provider: ref(ID.org),
      areaServed: { '@type': 'City', name: city.name, containedInPlace: { '@type': 'AdministrativeArea', name: city.county } },
      url: new URL(here, SITE_URL).toString(),
    },
    breadcrumbNode([
      { name: locale === 'es' ? 'Inicio' : 'Home', path: path('home', locale) },
      { name: t.areas, path: path('services', locale) },
      { name: city.name, path: here },
    ]),
  ])

  return (
    <>
      <Header locale={locale} />
      <main>
        <section className="border-joint/40 text-joint/55 relative border-b">
          <JointGrid />
          <div className="relative mx-auto w-full max-w-[110rem] px-5 py-16 sm:px-8 sm:py-24">
            <p className="text-joint text-sm">{t.drive(city.driveMinutes)}</p>
            <h1
              className="text-ink text-display mt-4 max-w-[14ch] leading-[0.9] font-bold"
              style={{ fontStretch: '120%', letterSpacing: 'var(--tracking-display)' }}
            >
              {t.title(city.name)}
            </h1>
            <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3">
              <Link
                href={path('estimate', locale)}
                className="bg-mark text-ink hover:bg-ink hover:text-slab inline-flex items-center px-7 py-4 text-sm font-semibold tracking-tight transition-colors"
              >
                {t.cta}
              </Link>
              <a
                href={BUSINESS.phone.href}
                data-loc="city-hero"
                className="border-ink/30 text-ink hover:border-ink inline-flex items-center border px-7 py-4 text-sm font-semibold tracking-tight transition-colors"
              >
                {BUSINESS.phone.display}
              </a>
            </div>
          </div>
        </section>

        <section className="border-joint/40 border-b">
          <div className="mx-auto w-full max-w-[110rem] px-5 py-16 sm:px-8">
            <p className="text-ink/85 max-w-[62ch] leading-[1.65]">{city.localDetail[locale]}</p>
          </div>
        </section>

        <section>
          <div className="mx-auto w-full max-w-[110rem] px-5 py-16 sm:px-8">
            <h2 className="text-ink text-heading font-bold" style={{ fontStretch: '115%' }}>
              {t.what}
            </h2>
            <ul className="border-joint/40 mt-8 grid border-t sm:grid-cols-2 lg:grid-cols-3">
              {publishedServices.map((s) => (
                <li key={s.id} className="border-joint/40 border-b">
                  <Link
                    href={servicePath(s, locale)}
                    className="hover:bg-screed/70 block px-1 py-5 transition-colors"
                  >
                    <span className="text-ink text-sm font-semibold">{s.name[locale]}</span>
                    <span className="text-joint mt-1 block max-w-[38ch] text-xs leading-snug">
                      {s.lede[locale]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
      <JsonLd data={jsonLd} />
    </>
  )
}
