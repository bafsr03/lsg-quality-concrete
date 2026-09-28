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
  alternates: alternates('en', '/', '/es/'),
}

export default function HomePage() {
  return (
    <>
      <Header locale="en" />
      <main>
        <Hero locale="en" />
        <Credentials locale="en" />
        <ServiceGrid locale="en" />
        <PourSection locale="en" />
        <FeaturedWork locale="en" />
        <ServiceArea locale="en" />
        <Testimonials locale="en" />
        <QuoteCta locale="en" />
      </main>
      <Footer locale="en" />
    </>
  )
}
