import type { Metadata } from 'next'
import { ServicesHub } from '@/components/pages/services-hub'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'Servicios | Concreto, Jardinería y Remodelación',
  description:
    'Todos nuestros servicios en el Condado de Utah y el sur del Valle de Salt Lake: concreto, jardinería, remodelación, y electricidad y plomería con socios.',
  alternates: alternates('es', '/services/', '/es/servicios/'),
}

export default function Page() {
  return <ServicesHub locale="es" />
}
