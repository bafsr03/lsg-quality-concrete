import type { Metadata } from 'next'
import { ContactPage } from '@/components/pages/contact-page'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'Contact Us | Free Estimates in Utah County',
  description:
    'Call (435) 849-5193 or email for a free written estimate on concrete, landscaping or remodeling across Utah County and the south Salt Lake Valley.',
  alternates: alternates('en', '/contact/', '/es/contacto/'),
}

export default function Page() {
  return <ContactPage locale="en" />
}
