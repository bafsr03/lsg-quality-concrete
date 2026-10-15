import Link from 'next/link'
import type { City, Combo, Division } from '@/content/schema'
import { SITE_URL, type Locale } from '@/lib/site'
import { image } from '@/lib/content/media'
import { servicesIn } from '@/content/services'
import { cityPath, comboPath, divisionPath } from '@/lib/content/resolve'
import { byPartner, tradeCityHeading } from '@/lib/content/trades'
import { path } from '@/lib/i18n/paths'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { PageHero } from '@/components/site/page-hero'
import { HeroActions } from '@/components/site/hero-actions'
import { PartnerNotice } from '@/components/site/partner-notice'
import { ServiceCard } from '@/components/site/service-card'
import { PinIcon } from '@/components/brand/icons'
import { JsonLd } from '@/components/seo/json-ld'
import { WorkStrip } from '@/components/sections/work-strip'
import { Testimonials } from '@/components/sections/testimonials'
import { QuoteCta } from '@/components/sections/quote-cta'
import { breadcrumbNode, graph, ID, ref } from '@/lib/seo/graph'

const copy = {
  en: {
    what: (c: string) => `What we build in ${c}`,
    cta: 'Get a free estimate',
    drive: (m: number) => `${m} minutes from our Eagle Mountain base`,
    hub: (c: string) => `Everything we do in ${c}`,
    home: 'Home',
  },
  es: {
    what: (c: string) => `Lo que hacemos en ${c}`,
    cta: 'Solicitar presupuesto',
    drive: (m: number) => `A ${m} minutos de nuestra base en Eagle Mountain`,
    hub: (c: string) => `Todo lo que hacemos en ${c}`,
    home: 'Inicio',
  },
} as const

/**
 * A trade x city page (/concrete/lehi/). Exists only where a Combo does: a
 * real job photo plus genuinely local copy for this trade in this city.
 */
export function CityPage({ combo, city, division, locale }: { combo: Combo; city: City; division: Division; locale: Locale }) {
  const t = copy[locale]
  const here = comboPath(combo, locale)
  const heading = tradeCityHeading(division, city.name, locale)
  const img = image(combo.imageId)

  const jsonLd = graph([
    {
      '@type': 'Service',
      name: heading,
      description: combo.seo[locale].description,
      serviceType: division.trade.en,
      provider: ref(ID.org),
      areaServed: { '@type': 'City', name: city.name, containedInPlace: { '@type': 'AdministrativeArea', name: city.county } },
      url: new URL(here, SITE_URL).toString(),
    },
    breadcrumbNode([
      { name: t.home, path: path('home', locale) },
      { name: division.name[locale], path: divisionPath(division, locale) },
      { name: city.name, path: here },
    ]),
  ])

  return (
    <>
      <Header locale={locale} />
      <main>
        <PageHero
          title={heading}
          kicker={
            <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 ring-1 ring-white/20">
              <PinIcon className="text-mark h-4 w-4" />
              {t.drive(city.driveMinutes)}
            </span>
          }
          image={{ src: img.file, alt: heading }}
        >
          <HeroActions locale={locale} loc="city-hero" cta={t.cta} />
        </PageHero>

        <PartnerNotice division={division} locale={locale} />

        <section>
          <div className="mx-auto w-full max-w-[110rem] px-5 pt-16 sm:px-8 sm:pt-20">
            <p className="text-navy text-lede max-w-[58ch] leading-[1.6] font-medium">{combo.localDetail[locale]}</p>
            <Link href={cityPath(city, locale)} className="btn btn-ghost-dark mt-8">
              {t.hub(city.name)}
            </Link>
          </div>
        </section>

        <section>
          <div className="mx-auto w-full max-w-[110rem] px-5 py-16 sm:px-8">
            <h2 className="text-navy text-title type-display">{t.what(city.name)}</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {servicesIn(division.id).map((s) => (
                <ServiceCard key={s.id} service={s} locale={locale} />
              ))}
            </div>
          </div>
        </section>
        <WorkStrip locale={locale} seed={city.id} division={division.id} />
        <Testimonials locale={locale} division={byPartner(division) ? undefined : division.id} />
        <QuoteCta locale={locale} />
      </main>
      <Footer locale={locale} />
      <JsonLd data={jsonLd} />
    </>
  )
}
