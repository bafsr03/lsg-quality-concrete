import type { Metadata } from 'next'
import { EstimatePage } from '@/components/pages/estimate-page'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'Free Concrete Estimate | Utah County & Salt Lake',
  description:
    'Describe your driveway, patio, steps or flatwork and see an indicative price range straight away, built from real Utah rates. Free written estimates.',
  alternates: alternates('en', '/free-estimate/', '/es/presupuesto/'),
}

export default function Page() {
  return <EstimatePage locale="en" />
}
