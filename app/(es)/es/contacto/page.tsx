import type { Metadata } from 'next'
import { ContactPage } from '@/components/pages/contact-page'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'Contacto | LSG Quality Concrete',
  description: 'Llame al (435) 849-5193 o escríbanos para un presupuesto de concreto gratis en el Condado de Utah y el sur del Valle de Salt Lake.',
  alternates: alternates('es', '/contact/', '/es/contacto/'),
}

export default function Page() {
  return <ContactPage locale="es" />
}
