import type { Metadata } from 'next'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'Solicitar presupuesto gratis',
  description:
    'Cuéntenos sobre el trabajo —entrada, patio, escalones u obra plana— y reciba un presupuesto por escrito sin costo en el Condado de Utah y el Valle de Salt Lake.',
  alternates: alternates('es', '/free-estimate/', '/es/presupuesto/'),
}

export default function Page() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[110rem] px-5 py-24 sm:px-8">
        <h1 className="text-title font-bold" style={{ fontStretch: '118%', letterSpacing: 'var(--tracking-display)' }}>
          Solicitar presupuesto
        </h1>
      </main>
      <Footer locale="es" />
    </>
  )
}
