import type { Metadata } from 'next'
import { ServicesHub } from '@/components/pages/services-hub'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'Concrete Services | Utah County & Salt Lake Valley',
  description:
    'Driveways, patios, walkways, steps, floors, RV pads, basement slabs and concrete repair across Utah County and the south Salt Lake Valley.',
  alternates: alternates('en', '/services/', '/es/servicios/'),
}

export default function Page() {
  return <ServicesHub locale="en" />
}
