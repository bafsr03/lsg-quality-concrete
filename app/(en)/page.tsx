import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Hero } from '@/components/sections/hero'
import { alternates } from '@/lib/i18n/alternates'
import type { Metadata } from 'next'

export const dynamic = 'error'

export const metadata: Metadata = {
  alternates: alternates('en', '/', '/es/'),
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero locale="en" />
      </main>
      <Footer locale="en" />
    </>
  )
}
