import type { Metadata } from 'next'
import { GalleryPage } from '@/components/pages/gallery-page'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'Our Concrete Work in Photos',
  description: 'Photographs from our own job sites across Utah County and the Salt Lake Valley — forms, subgrade, pours and finished concrete flatwork.',
  alternates: alternates('en', '/gallery/', '/es/galeria/'),
}

export default function Page() {
  return <GalleryPage locale="en" />
}
