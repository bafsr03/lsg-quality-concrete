import type { Metadata } from 'next'
import { EstimatePage } from '@/components/pages/estimate-page'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'Presupuesto Gratis | Concreto, Jardín, Remodelación',
  description:
    'Calcule al instante un trabajo de concreto con precios reales de Utah, o describa su proyecto de jardinería, remodelación, electricidad o plomería.',
  alternates: alternates('es', '/free-estimate/', '/es/presupuesto/'),
}

export default function Page() {
  return <EstimatePage locale="es" />
}
