import Link from 'next/link'
import type { Division, Service } from '@/content/schema'
import { SITE_URL, type Locale } from '@/lib/site'
import { image } from '@/lib/content/media'
import { publishedCities } from '@/content/cities'
import { publishedServices, servicesIn } from '@/content/services'
import { cityPath, comboPath, combosForDivision, divisionPath, servicePath } from '@/lib/content/resolve'
import { byPartner } from '@/lib/content/trades'
import { path } from '@/lib/i18n/paths'
import { PartnerNotice } from '@/components/site/partner-notice'
import { ServiceCard } from '@/components/site/service-card'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { PageHero } from '@/components/site/page-hero'
import { HeroActions } from '@/components/site/hero-actions'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbNode, graph, ID, ref } from '@/lib/seo/graph'
import { WorkStrip } from '@/components/sections/work-strip'
import { Testimonials } from '@/components/sections/testimonials'
import { QuoteCta } from '@/components/sections/quote-cta'

const copy = {
  en: {
    spec: 'How we build it',
    areas: 'Where we work',
    more: (d: string) => `More ${d.toLowerCase()} services`,
    pairs: 'Often done together',
    pairsLede: 'One contractor for the whole job means one schedule and one person to call.',
    bubble: 'Free estimates!',
    areasLede: 'This service is available across our whole area. Pick a city for what changes locally.',
    cta: 'Get a free estimate',
    call: 'Call',
    services: 'Services',
  },
  es: {
    spec: 'Cómo lo construimos',
    areas: 'Dónde trabajamos',
    more: (d: string) => `Más servicios de ${d.toLowerCase()}`,
    pairs: 'Suele hacerse junto con',
    pairsLede: 'Un solo contratista para toda la obra: un calendario y una sola persona a quien llamar.',
    bubble: '¡Presupuesto gratis!',
    areasLede: 'Este servicio está disponible en toda nuestra zona. Elija una ciudad para ver qué cambia localmente.',
    cta: 'Solicitar presupuesto',
    call: 'Llamar',
    services: 'Servicios',
  },
} as const

export function ServicePage({ service, division, locale }: { service: Service; division: Division; locale: Locale }) {
  const t = copy[locale]
  const img = service.heroImageId ? image(service.heroImageId) : null
  const here = servicePath(service, locale)
  const combos = combosForDivision(division.id)
  const siblings = servicesIn(division.id).filter((s) => s.id !== service.id)
  const pairs = service.pairsWith.map((id) => publishedServices.find((s) => s.id === id)!).filter(Boolean)

  const jsonLd = graph([
    {
      '@type': 'Service',
      name: service.name[locale],
      description: service.seo[locale].description,
      serviceType: service.name.en,
      category: division.name.en,
      provider: ref(ID.org),
      areaServed: publishedCities.map((c) => ({ '@type': 'City', name: c.name })),
      url: new URL(here, SITE_URL).toString(),
    },
    breadcrumbNode([
      { name: locale === 'es' ? 'Inicio' : 'Home', path: path('home', locale) },
      { name: division.name[locale], path: divisionPath(division, locale) },
      { name: service.name[locale], path: here },
    ]),
  ])

  return (
    <>
      <Header locale={locale} />
      <main>
        <PageHero
          title={service.name[locale]}
          lede={service.lede[locale]}
          kicker={
            <Link href={divisionPath(division, locale)} className="inline-flex rounded-full bg-white/12 px-4 py-2 ring-1 ring-white/20 transition-colors hover:bg-white/20">
              {division.name[locale]}
            </Link>
          }
          image={img ? { src: img.file, alt: service.lede[locale] } : undefined}
          mascotBubble={img ? undefined : t.bubble}
        >
          <HeroActions locale={locale} loc="service-hero" cta={t.cta} />
        </PageHero>

        <PartnerNotice division={division} locale={locale} />

        <section>
          <div className="mx-auto grid w-full max-w-[110rem] gap-x-16 gap-y-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,62ch)_20rem] lg:justify-start">
            <div className="max-w-[62ch] space-y-6">
              {service.body[locale].map((p) => (
                <p key={p.slice(0, 32)} className="text-ink/85 text-[1.05rem] leading-[1.7] first:text-lede first:text-navy first:font-medium">
                  {p}
                </p>
              ))}
            </div>

            {/* The build spec, as a jointed data block — the detail the
                competing sites in this market leave out entirely. */}
            <aside className="h-fit overflow-hidden rounded-[var(--radius-panel)] bg-white shadow-[0_24px_50px_-28px_rgba(10,31,82,0.5)] ring-1 ring-[color-mix(in_oklab,var(--color-blue)_12%,transparent)] lg:sticky lg:top-32">
              <h2 className="bg-blue type-heading px-6 py-5 text-lg text-white">
                {t.spec}
              </h2>
              <dl className="divide-screed divide-y-2">
                {service.spec.map((row) => (
                  <div key={row.label.en} className="px-6 py-4">
                    <dt className="text-blue text-xs font-bold">{row.label[locale]}</dt>
                    <dd className="text-navy mt-1 text-sm leading-snug font-medium">{row.value[locale]}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        <section>
          <div className="mx-auto w-full max-w-[110rem] px-5 py-16 sm:px-8">
            <h2 className="text-navy text-title type-display">
              {t.areas}
            </h2>
            <p className="text-joint text-lede mt-4 max-w-[48ch] leading-relaxed">{t.areasLede}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {publishedCities.map((c) => {
                const combo = combos.find((x) => x.cityId === c.id)
                return (
                <li key={c.id}>
                  <Link
                    href={combo ? comboPath(combo, locale) : cityPath(c, locale)}
                    className="link-card"
                  >
                    <span>{c.name}</span>
                    <span>{c.county}</span>
                  </Link>
                </li>
                )
              })}
            </ul>
          </div>
        </section>

        {siblings.length > 0 && (
          <section>
            <div className="mx-auto w-full max-w-[110rem] px-5 py-16 sm:px-8">
              <h2 className="text-navy text-title type-display">{t.more(division.name[locale])}</h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {siblings.slice(0, 3).map((s) => (
                  <ServiceCard key={s.id} service={s} locale={locale} />
                ))}
              </div>
              {siblings.length > 3 && (
                <Link href={divisionPath(division, locale)} className="btn btn-ghost-dark mt-8">
                  {division.name[locale]}
                </Link>
              )}
            </div>
          </section>
        )}

        {pairs.length > 0 && (
          <section>
            <div className="mx-auto w-full max-w-[110rem] px-5 pb-16 sm:px-8">
              <h2 className="text-navy text-title type-display">{t.pairs}</h2>
              <p className="text-joint text-lede mt-4 max-w-[48ch] leading-relaxed">{t.pairsLede}</p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {pairs.map((s) => (
                  <ServiceCard key={s.id} service={s} locale={locale} />
                ))}
              </div>
            </div>
          </section>
        )}

        <WorkStrip locale={locale} seed={service.id} division={division.id} />
        <Testimonials locale={locale} division={byPartner(division) ? undefined : division.id} />
        <QuoteCta locale={locale} />
      </main>
      <Footer locale={locale} />
      <JsonLd data={jsonLd} />
    </>
  )
}
