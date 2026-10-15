import type { Locale } from '@/lib/site'
import { publishedCities } from '@/content/cities'
import { path } from '@/lib/i18n/paths'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { PageHero } from '@/components/site/page-hero'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbNode, graph } from '@/lib/seo/graph'
import { ServiceArea } from '@/components/sections/service-area'
import { QuoteCta } from '@/components/sections/quote-cta'

export function ServiceAreasPage({ locale }: { locale: Locale }) {
  const t =
    locale === 'es'
      ? { title: 'Zonas de servicio', lede: `${publishedCities.length} ciudades en el Condado de Utah, el sur del Valle de Salt Lake y el Wasatch Back. Cada una tiene su página con lo que cambia localmente.`, home: 'Inicio' }
      : { title: 'Service areas', lede: `${publishedCities.length} cities across Utah County, the south Salt Lake Valley and the Wasatch Back. Each has its own page on what changes locally.`, home: 'Home' }

  return (
    <>
      <Header locale={locale} />
      <main>
        <PageHero size="display" title={t.title} lede={t.lede} mascotBubble={locale === 'es' ? '¡Vamos a su obra!' : "We'll come to you!"} />
        <ServiceArea locale={locale} />
        <QuoteCta locale={locale} />
      </main>
      <Footer locale={locale} />
      <JsonLd
        data={graph([
          breadcrumbNode([
            { name: t.home, path: path('home', locale) },
            { name: t.title, path: path('serviceAreas', locale) },
          ]),
        ])}
      />
    </>
  )
}
