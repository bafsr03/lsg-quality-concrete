import type { Metadata } from 'next'
import { ServiceAreasPage } from '@/components/pages/service-areas-page'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'Service Areas | Utah County & Salt Lake Valley',
  description:
    'Eleven cities across Utah County, the south Salt Lake Valley and the Wasatch Back, ordered by drive time from our Eagle Mountain base. Free estimates in each.',
  alternates: alternates('en', '/service-areas/', '/es/areas-de-servicio/'),
}

export default function Page() {
  return <ServiceAreasPage locale="en" />
}
