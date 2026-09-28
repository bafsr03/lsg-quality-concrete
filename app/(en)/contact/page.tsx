import type { Metadata } from 'next'
import { ContactPage } from '@/components/pages/contact-page'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'Contact LSG Quality Concrete | Utah',
  description: 'Call (435) 849-5193 or email for a free written concrete estimate across Utah County and the south Salt Lake Valley. Open Monday to Saturday.',
  alternates: alternates('en', '/contact/', '/es/contacto/'),
}

export default function Page() {
  return <ContactPage locale="en" />
}
