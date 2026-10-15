import type { Metadata } from 'next'
import { AboutPage } from '@/components/pages/about-page'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'Nosotros | Contratista General en Eagle Mountain',
  description:
    'Una cuadrilla local con base en Eagle Mountain, Utah: concreto, jardinería y remodelación, con socios con licencia para electricidad y plomería.',
  alternates: alternates('es', '/about/', '/es/nosotros/'),
}

export default function Page() {
  return <AboutPage locale="es" />
}
