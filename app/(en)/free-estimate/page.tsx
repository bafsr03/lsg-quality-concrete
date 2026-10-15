import type { Metadata } from 'next'
import { EstimatePage } from '@/components/pages/estimate-page'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'Free Estimate | Concrete, Landscaping, Remodeling',
  description:
    'Price a concrete job instantly from real Utah rates, or describe a landscaping, remodeling, electrical or plumbing project. Free written estimates.',
  alternates: alternates('en', '/free-estimate/', '/es/presupuesto/'),
}

export default function Page() {
  return <EstimatePage locale="en" />
}
