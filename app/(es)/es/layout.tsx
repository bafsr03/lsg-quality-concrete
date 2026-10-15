import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import '../../globals.css'
import { BUSINESS, INDEXABLE, SITE_URL } from '@/lib/site'
import { graph, organizationNode, websiteNode } from '@/lib/seo/graph'
import { JsonLd } from '@/components/seo/json-ld'

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
    default: `Contratista General en Eagle Mountain, UT | ${BUSINESS.name}`,
    template: `%s | ${BUSINESS.name}`,
  },
  description:
    `Concreto, jardinería y remodelación en el Condado de Utah y el sur del Valle de ` +
    `Salt Lake. Una cuadrilla local, presupuestos gratis. Llame al ${BUSINESS.phone.display}.`,
  openGraph: { type: 'website', locale: 'es_US', siteName: BUSINESS.name, url: `${SITE_URL}/es/` },
  // Only the real production domain is indexable; see INDEXABLE in lib/site.ts.
  robots: INDEXABLE
    ? { index: true, follow: true, 'max-image-preview': 'large' }
    : { index: false, follow: false },
}

export default function EsLayout({ children }: LayoutProps<'/es'>) {
  return (
    <html lang="es" className={`${archivo.variable} h-full antialiased`}>
      <body className="bg-slab text-ink flex min-h-full flex-col">
        {children}
        <JsonLd data={graph([organizationNode(), websiteNode('es')])} />
      </body>
    </html>
  )
}
