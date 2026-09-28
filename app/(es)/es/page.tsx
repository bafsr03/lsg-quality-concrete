import type { Metadata } from 'next'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Hero } from '@/components/sections/hero'
import { Credentials } from '@/components/sections/credentials'
import { ServiceGrid } from '@/components/sections/service-grid'
import { PourSection } from '@/components/sections/pour-section'
import { FeaturedWork } from '@/components/sections/featured-work'
import { ServiceArea } from '@/components/sections/service-area'
import { Testimonials } from '@/components/sections/testimonials'
import { QuoteCta } from '@/components/sections/quote-cta'
import { alternates } from '@/lib/i18n/alternates'

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
        <ServiceGrid locale="es" />
        <PourSection locale="es" />
        <FeaturedWork locale="es" />
        <ServiceArea locale="es" />
        <Testimonials locale="es" />
        <QuoteCta locale="es" />
      </main>
      <Footer locale="es" />
    </>
  )
}
