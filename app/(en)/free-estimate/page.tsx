import type { Metadata } from 'next'
import { Header } from '@/components/site/header'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'Get a free concrete estimate',
  description:
    'Tell us about the pour — driveway, patio, steps or flatwork — and get a free written estimate across Utah County and the south Salt Lake Valley.',
  alternates: alternates('en', '/free-estimate/', '/es/presupuesto/'),
}

export default function FreeEstimatePage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[110rem] px-5 py-24 sm:px-8">
        <h1
          className="text-title leading-[0.95] font-bold"
          style={{ fontStretch: '118%', letterSpacing: 'var(--tracking-display)' }}
        >
          Get a free estimate
        </h1>
      </main>
    </>
  )
}
