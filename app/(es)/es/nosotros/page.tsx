import type { Metadata } from 'next'
import { AboutPage } from '@/components/pages/about-page'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'Sobre LSG Quality Concrete',
  description: 'Una cuadrilla de concreto con base en Eagle Mountain, Utah. Las mismas personas cimbran, vierten y terminan cada obra. Quince años en el valle.',
  alternates: alternates('es', '/about/', '/es/nosotros/'),
}

export default function Page() {
  return <AboutPage locale="es" />
}
