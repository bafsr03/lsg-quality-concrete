import Link from 'next/link'
import type { City } from '@/content/schema'
import { SITE_URL, type Locale } from '@/lib/site'
import { publishedDivisions } from '@/content/divisions'
import { servicesIn } from '@/content/services'
import { featuredWorkResolved } from '@/content/showcase'
import { cityPath, comboPath, combosForCity, divisionPath, servicePath } from '@/lib/content/resolve'
import { byPartner, tradeCityHeading } from '@/lib/content/trades'
import { path } from '@/lib/i18n/paths'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { PageHero } from '@/components/site/page-hero'
import { HeroActions } from '@/components/site/hero-actions'
import { ArrowIcon, PinIcon } from '@/components/brand/icons'
import { JsonLd } from '@/components/seo/json-ld'
import { WorkStrip } from '@/components/sections/work-strip'
import { Testimonials } from '@/components/sections/testimonials'
import { QuoteCta } from '@/components/sections/quote-cta'
import { breadcrumbNode, graph, ID, ref } from '@/lib/seo/graph'

const copy = {
  en: {
    title: (c: string) => `General contractor in ${c}`,
    trades: (c: string) => `What we do in ${c}`,
    partner: 'Licensed partners',
    cta: 'Get a free estimate',
    drive: (m: number) => `${m} minutes from our Eagle Mountain base`,
    areas: 'Service areas',
    home: 'Home',
  },
  es: {
    title: (c: string) => `Contratista general en ${c}`,
    trades: (c: string) => `Lo que hacemos en ${c}`,
    partner: 'Socios con licencia',
    cta: 'Solicitar presupuesto',
    drive: (m: number) => `A ${m} minutos de nuestra base en Eagle Mountain`,
    areas: 'Zonas de servicio',
    home: 'Inicio',
  },
} as const

/**
 * The city hub (/service-areas/lehi/): ranks for "general contractor <city>"
 * and "contractor near me" from that city, and routes to every trade. Where a
 * trade x city page exists it links there; otherwise to the trade itself.
 */
export function CityHubPage({ city, locale }: { city: City; locale: Locale }) {
  const t = copy[locale]
  const here = cityPath(city, locale)
  const combos = combosForCity(city.id)
  // Deterministic per city so neighbouring pages don't share an opening photo.
  const heroPhoto = featuredWorkResolved[
    [...city.id].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 0) % featuredWorkResolved.length
  ]

  const jsonLd = graph([
    {
      '@type': 'Service',
      name: t.title(city.name),
      description: city.seo[locale].description,
      serviceType: 'General contractor',
      provider: ref(ID.org),
      areaServed: { '@type': 'City', name: city.name, containedInPlace: { '@type': 'AdministrativeArea', name: city.county } },
      url: new URL(here, SITE_URL).toString(),
    },
    breadcrumbNode([
      { name: t.home, path: path('home', locale) },
      { name: t.areas, path: path('serviceAreas', locale) },
      { name: city.name, path: here },
    ]),
  ])

  return (
    <>
      <Header locale={locale} />
      <main>
        <PageHero
          title={t.title(city.name)}
          kicker={
            <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 ring-1 ring-white/20">
              <PinIcon className="text-mark h-4 w-4" />
              {t.drive(city.driveMinutes)}
            </span>
          }
          image={{ src: heroPhoto.image.file, alt: heroPhoto.alt[locale] }}
        >
          <HeroActions locale={locale} loc="city-hub-hero" cta={t.cta} />
        </PageHero>

        <section>
          <div className="mx-auto w-full max-w-[110rem] px-5 pt-16 sm:px-8 sm:pt-20">
            <p className="text-navy text-lede max-w-[58ch] leading-[1.6] font-medium">{city.localDetail[locale]}</p>
          </div>
        </section>

        <section>
          <div className="mx-auto w-full max-w-[110rem] px-5 py-16 sm:px-8">
            <h2 className="text-navy text-title type-display">{t.trades(city.name)}</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {publishedDivisions.map((d) => {
                const combo = combos.find((c) => c.division === d.id)
                return (
                  <article key={d.id} className="flex flex-col rounded-[var(--radius-panel)] bg-white p-6 shadow-[0_18px_40px_-26px_rgba(10,31,82,0.6)] ring-1 ring-[color-mix(in_oklab,var(--color-blue)_10%,transparent)]">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-navy type-heading text-2xl">
                        <Link href={combo ? comboPath(combo, locale) : divisionPath(d, locale)} className="hover:text-blue transition-colors">
                          {combo ? tradeCityHeading(d, city.name, locale) : d.name[locale]}
                        </Link>
                      </h3>
                      {byPartner(d) && (
                        <span className="bg-screed text-blue rounded-full px-2.5 py-1 text-xs font-bold">{t.partner}</span>
                      )}
                    </div>
                    <p className="text-joint mt-2 text-sm leading-snug">{d.lede[locale]}</p>
                    <ul className="mt-4 space-y-1">
                      {servicesIn(d.id).map((s) => (
                        <li key={s.id}>
                          <Link href={servicePath(s, locale)} className="text-navy hover:text-blue group inline-flex items-center gap-2 py-1 text-[0.95rem] font-semibold transition-colors">
                            <ArrowIcon className="text-mark h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                            {s.name[locale]}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <WorkStrip locale={locale} seed={city.id} />
        <Testimonials locale={locale} />
        <QuoteCta locale={locale} />
      </main>
      <Footer locale={locale} />
      <JsonLd data={jsonLd} />
    </>
  )
}
