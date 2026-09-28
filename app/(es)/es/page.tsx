import type { Metadata } from 'next'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Hero } from '@/components/sections/hero'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  alternates: alternates('es', '/', '/es/'),
}

export default function HomePageEs() {
  return (
    <>
      <Header />
      <main>
        <Hero locale="es" />
      </main>
      <Footer locale="es" />
    </>
  )
}
