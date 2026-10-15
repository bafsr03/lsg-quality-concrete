import Link from 'next/link'
import type { Locale } from '@/lib/site'
import { publishedDivisions } from '@/content/divisions'
import { servicesIn } from '@/content/services'
import { divisionPath } from '@/lib/content/resolve'
import { byPartner } from '@/lib/content/trades'
import { path } from '@/lib/i18n/paths'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { PageHero } from '@/components/site/page-hero'
import { ServiceCard } from '@/components/site/service-card'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbNode, graph } from '@/lib/seo/graph'
import { QuoteCta } from '@/components/sections/quote-cta'

const copy = {
  en: {
    title: 'Everything we build',
    lede: 'Concrete, landscaping and remodeling by our own crew, with electrical and plumbing through licensed partners, across Utah County and the south Salt Lake Valley.',
    bubble: 'We do it all!',
    partner: 'Performed by Utah-licensed partners',
    all: (d: string) => `All ${d.toLowerCase()}`,
    home: 'Home',
  },
  es: {
    title: 'Todo lo que hacemos',
    lede: 'Concreto, jardinería y remodelación con nuestra propia cuadrilla, y electricidad y plomería con socios con licencia, en el Condado de Utah y el sur del Valle de Salt Lake.',
    bubble: '¡Lo hacemos todo!',
    partner: 'Realizado por socios con licencia en Utah',
    all: (d: string) => `Todo ${d.toLowerCase()}`,
    home: 'Inicio',
  },
} as const

export function ServicesHub({ locale }: { locale: Locale }) {
  const t = copy[locale]
  return (
    <>
      <Header locale={locale} />
      <main>
        <PageHero size="display" title={t.title} lede={t.lede} mascotBubble={t.bubble} />

        {publishedDivisions.map((d) => (
          <section key={d.id} id={d.id} className="scroll-mt-32">
            <div className="mx-auto w-full max-w-[110rem] px-5 pt-16 sm:px-8 sm:pt-20">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-navy text-title type-display">
                    <Link href={divisionPath(d, locale)} className="hover:text-blue transition-colors">
                      {d.name[locale]}
                    </Link>
                  </h2>
                  <p className="text-joint mt-3 max-w-[56ch] leading-relaxed">{d.lede[locale]}</p>
                  {byPartner(d) && <p className="text-blue mt-2 text-sm font-bold">{t.partner}</p>}
                </div>
                <Link href={divisionPath(d, locale)} className="btn btn-ghost-dark">
                  {t.all(d.name[locale])}
                </Link>
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {servicesIn(d.id).map((s) => (
                  <ServiceCard key={s.id} service={s} locale={locale} />
                ))}
              </div>
            </div>
          </section>
        ))}
        <div className="h-16" />
        <QuoteCta locale={locale} />
      </main>
      <Footer locale={locale} />
      <JsonLd
        data={graph([
          breadcrumbNode([
            { name: t.home, path: path('home', locale) },
            { name: t.title, path: path('services', locale) },
          ]),
        ])}
      />
    </>
  )
}
