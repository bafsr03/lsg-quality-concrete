import type { Metadata } from 'next'
import { ContactPage } from '@/components/pages/contact-page'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'Contacto | Presupuestos Gratis en el Condado de Utah',
  description:
    'Llame al (435) 849-5193 o escríbanos para un presupuesto gratis de concreto, jardinería o remodelación en el Condado de Utah y el Valle de Salt Lake.',
  alternates: alternates('es', '/contact/', '/es/contacto/'),
}

export default function Page() {
  return <ContactPage locale="es" />
}
