import type { Metadata } from 'next'
import { ServicesHub } from '@/components/pages/services-hub'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'All Services | Concrete, Landscaping & Remodeling',
  description:
    'Every service we offer across Utah County and the south Salt Lake Valley: concrete, landscaping, remodeling, and electrical and plumbing through licensed partners.',
  alternates: alternates('en', '/services/', '/es/servicios/'),
}

export default function Page() {
  return <ServicesHub locale="en" />
}
