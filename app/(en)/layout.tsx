import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import '../globals.css'
import { BUSINESS, INDEXABLE, SITE_URL } from '@/lib/site'
import { graph, organizationNode, websiteNode } from '@/lib/seo/graph'
import { JsonLd } from '@/components/seo/json-ld'

/**
 * One family, two axes. The width axis is the expressive tool: headlines run
 * expanded so type reads as structure, body stays at normal width.
 */
const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  // Italic carries the headline voice — it echoes the slanted logo wordmark.
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `General Contractor in Eagle Mountain, UT | ${BUSINESS.name}`,
    template: `%s | ${BUSINESS.name}`,
  },
  description:
    `Concrete, landscaping and remodeling across Utah County and the south Salt Lake ` +
    `Valley. One local crew, free estimates. Call ${BUSINESS.phone.display}.`,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: BUSINESS.name,
    url: SITE_URL,
  },
  // Only the real production domain is indexable; see INDEXABLE in lib/site.ts.
  robots: INDEXABLE
    ? { index: true, follow: true, 'max-image-preview': 'large' }
    : { index: false, follow: false },
}

export default function EnLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="bg-slab text-ink flex min-h-full flex-col">
        {children}
        <JsonLd data={graph([organizationNode(), websiteNode('en')])} />
      </body>
    </html>
  )
}
