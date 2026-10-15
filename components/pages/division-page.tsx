import Link from 'next/link'
import type { Division } from '@/content/schema'
import { SITE_URL, type Locale } from '@/lib/site'
import { image } from '@/lib/content/media'
import { servicesIn } from '@/content/services'
import { publishedCities } from '@/content/cities'
import { cityPath, comboPath, combosForDivision, divisionPath, servicePath } from '@/lib/content/resolve'
import { byPartner, tradeCityHeading, tradeHeading } from '@/lib/content/trades'
import { path } from '@/lib/i18n/paths'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { PageHero } from '@/components/site/page-hero'
import { HeroActions } from '@/components/site/hero-actions'
import { PartnerNotice } from '@/components/site/partner-notice'
import { ServiceCard } from '@/components/site/service-card'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbNode, graph, ID, ref } from '@/lib/seo/graph'
import { PourSection } from '@/components/sections/pour-section'
import { WorkStrip } from '@/components/sections/work-strip'
import { Faqs } from '@/components/sections/faqs'
import { Testimonials } from '@/components/sections/testimonials'
import { QuoteCta } from '@/components/sections/quote-cta'

const copy = {
  en: {
    services: (d: string) => `${d} services`,
    areas: 'Where we work',
    areasLede: 'Pick your city for what changes locally and how far we drive to reach you.',
    cta: 'Get a free estimate',
    bubble: 'One crew, start to finish!',
    home: 'Home',
  },
  es: {
    services: (d: string) => `Servicios de ${d.toLowerCase()}`,
    areas: 'Dónde trabajamos',
    areasLede: 'Elija su ciudad para ver qué cambia localmente y cuánto tardamos en llegar.',
    cta: 'Solicitar presupuesto',
    bubble: '¡Una cuadrilla de principio a fin!',
    home: 'Inicio',
  },
} as const

/**
 * A trade hub (/concrete/, /landscaping/ …): the page that ranks for
 * "<trade> contractor Utah County" and feeds every service and city page
 * inside its folder.
 */
export function DivisionPage({ division, locale }: { division: Division; locale: Locale }) {
  const t = copy[locale]
  const here = divisionPath(division, locale)
  const items = servicesIn(division.id)
  const combos = combosForDivision(division.id)
  const img = division.heroImageId ? image(division.heroImageId) : null

  const jsonLd = graph([
    {
      '@type': 'Service',
      name: tradeHeading(division, locale),
      description: division.seo[locale].description,
      serviceType: division.trade.en,
      provider: ref(ID.org),
      areaServed: publishedCities.map((c) => ({ '@type': 'City', name: c.name })),
      url: new URL(here, SITE_URL).toString(),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: t.services(division.name[locale]),
        itemListElement: items.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.name[locale], url: new URL(servicePath(s, locale), SITE_URL).toString() },
        })),
      },
    },
    breadcrumbNode([
      { name: t.home, path: path('home', locale) },
      { name: division.name[locale], path: here },
    ]),
  ])

  return (
    <>
      <Header locale={locale} />
      <main>
        <PageHero
          title={tradeHeading(division, locale)}
          lede={division.lede[locale]}
          image={img ? { src: img.file, alt: division.lede[locale] } : undefined}
          mascotBubble={img ? undefined : t.bubble}
        >
          <HeroActions locale={locale} loc={`division-hero-${division.id}`} cta={t.cta} />
        </PageHero>

        <PartnerNotice division={division} locale={locale} />

        <section>
          <div className="mx-auto w-full max-w-[110rem] space-y-6 px-5 pt-16 sm:px-8 sm:pt-20">
            {division.body[locale].map((p) => (
              <p key={p.slice(0, 32)} className="text-ink/85 max-w-[62ch] text-[1.05rem] leading-[1.7] first:text-lede first:text-navy first:font-medium">
                {p}
              </p>
            ))}
          </div>
        </section>

        <section>
          <div className="mx-auto w-full max-w-[110rem] px-5 py-16 sm:px-8">
            <h2 className="text-navy text-title type-display">{t.services(division.name[locale])}</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((s) => (
                <ServiceCard key={s.id} service={s} locale={locale} />
              ))}
            </div>
          </div>
        </section>

        {division.id === 'concrete' && <PourSection locale={locale} />}
        <WorkStrip locale={locale} seed={division.id} division={division.id} />

        <section>
          <div className="mx-auto w-full max-w-[110rem] px-5 py-16 sm:px-8">
            <h2 className="text-navy text-title type-display">{t.areas}</h2>
            <p className="text-joint text-lede mt-4 max-w-[48ch] leading-relaxed">{t.areasLede}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {publishedCities.map((c) => {
                // The trade x city page where one exists; otherwise the city hub.
                const combo = combos.find((x) => x.cityId === c.id)
                return (
                  <li key={c.id}>
                    <Link
                      href={combo ? comboPath(combo, locale) : cityPath(c, locale)}
                      className="link-card"
                    >
                      <span>
                        {combo ? tradeCityHeading(division, c.name, locale) : c.name}
                      </span>
                      <span>{c.county}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        <Faqs items={division.faqs} locale={locale} />
        <Testimonials locale={locale} division={byPartner(division) ? undefined : division.id} />
        <QuoteCta locale={locale} />
      </main>
      <Footer locale={locale} />
      <JsonLd data={jsonLd} />
    </>
  )
}
