import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import '../globals.css'
import { BUSINESS, SITE_URL } from '@/lib/site'
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
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Concrete Contractor in Eagle Mountain, UT | ${BUSINESS.name}`,
    template: `%s | ${BUSINESS.name}`,
  },
  description:
    `Driveways, patios, steps and flatwork poured across Utah County and the south ` +
    `Salt Lake Valley. ${BUSINESS.yearsExperience}+ years, free estimates. Call ${BUSINESS.phone.display}.`,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: BUSINESS.name,
    url: SITE_URL,
  },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
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
