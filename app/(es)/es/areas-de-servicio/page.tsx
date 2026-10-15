import type { Metadata } from 'next'
import { ServiceAreasPage } from '@/components/pages/service-areas-page'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'Zonas de Servicio | Condado de Utah y Salt Lake',
  description:
    'Once ciudades en el Condado de Utah, el sur del Valle de Salt Lake y el Wasatch Back, ordenadas por distancia desde Eagle Mountain. Presupuesto gratis.',
  alternates: alternates('es', '/service-areas/', '/es/areas-de-servicio/'),
}

export default function Page() {
  return <ServiceAreasPage locale="es" />
}
