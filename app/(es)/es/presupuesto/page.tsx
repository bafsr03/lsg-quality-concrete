import type { Metadata } from 'next'
import { EstimatePage } from '@/components/pages/estimate-page'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'Presupuesto de Concreto Gratis | Condado de Utah',
  description:
    'Describa su entrada, patio, escalones u obra plana y vea un rango de precio al instante, con precios reales de Utah. Presupuestos gratis por escrito.',
  alternates: alternates('es', '/free-estimate/', '/es/presupuesto/'),
}

export default function Page() {
  return <EstimatePage locale="es" />
}
