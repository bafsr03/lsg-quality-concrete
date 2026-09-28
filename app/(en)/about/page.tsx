import type { Metadata } from 'next'
import { AboutPage } from '@/components/pages/about-page'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'About LSG Quality Concrete | Eagle Mountain',
  description: 'A concrete crew based in Eagle Mountain, Utah. The same people form, pour and finish every job. Fifteen years in the valley.',
  alternates: alternates('en', '/about/', '/es/nosotros/'),
}

export default function Page() {
  return <AboutPage locale="en" />
}
