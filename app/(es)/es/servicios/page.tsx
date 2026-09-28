import type { Metadata } from 'next'
import { ServicesHub } from '@/components/pages/services-hub'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'Servicios de Concreto | Condado de Utah y Salt Lake',
  description:
    'Entradas, patios, andadores, escalones, pisos, plataformas para casas rodantes, losas de sótano y reparación en el Condado de Utah y el sur del Valle de Salt Lake.',
  alternates: alternates('es', '/services/', '/es/servicios/'),
}

export default function Page() {
  return <ServicesHub locale="es" />
}
