import type { Metadata } from 'next'
import { ReviewsPage } from '@/components/pages/reviews-page'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'Customer Reviews | LSG Quality Concrete',
  description: 'Reviews from concrete customers across Utah County and the Salt Lake Valley, carried over word for word from our previous site.',
  alternates: alternates('en', '/reviews/', '/es/resenas/'),
}

export default function Page() {
  return <ReviewsPage locale="en" />
}
