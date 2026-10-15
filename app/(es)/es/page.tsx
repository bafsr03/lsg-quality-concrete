import type { Metadata } from 'next'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Hero } from '@/components/sections/hero'
import { Credentials } from '@/components/sections/credentials'
import { DivisionGrid } from '@/components/sections/division-grid'
import { FeaturedWork } from '@/components/sections/featured-work'
import { ServiceArea } from '@/components/sections/service-area'
import { Testimonials } from '@/components/sections/testimonials'
import { QuoteCta } from '@/components/sections/quote-cta'
import { alternates } from '@/lib/i18n/alternates'
import { JsonLd } from '@/components/seo/json-ld'
import { graph, offerCatalogNode } from '@/lib/seo/graph'

export const dynamic = 'error'

export const metadata: Metadata = {
  alternates: alternates('es', '/', '/es/'),
}

export default function HomePage() {
  return (
    <>
      <Header locale="es" />
      <main>
        <Hero locale="es" />
        <Credentials locale="es" />
        <DivisionGrid locale="es" />
        <FeaturedWork locale="es" />
        <ServiceArea locale="es" />
        <Testimonials locale="es" />
        <QuoteCta locale="es" />
      </main>
      <Footer locale="es" />
      <JsonLd data={graph([offerCatalogNode('es')])} />
    </>
  )
}
