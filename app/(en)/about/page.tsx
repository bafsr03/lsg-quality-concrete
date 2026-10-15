import type { Metadata } from 'next'
import { AboutPage } from '@/components/pages/about-page'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'About Us | Eagle Mountain General Contractor',
  description:
    'A local crew based in Eagle Mountain, Utah, doing concrete, landscaping and remodeling, with licensed partners for electrical and plumbing.',
  alternates: alternates('en', '/about/', '/es/nosotros/'),
}

export default function Page() {
  return <AboutPage locale="en" />
}
