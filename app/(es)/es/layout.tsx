import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import '../../globals.css'
import { BUSINESS, SITE_URL } from '@/lib/site'
import { graph, organizationNode, websiteNode } from '@/lib/seo/graph'
import { JsonLd } from '@/components/seo/json-ld'

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Contratista de Concreto en Eagle Mountain, UT | ${BUSINESS.name}`,
    template: `%s | ${BUSINESS.name}`,
  },
  description:
    `Entradas, patios, escalones y obra plana en el Condado de Utah y el sur del Valle de ` +
    `Salt Lake. ${BUSINESS.yearsExperience}+ años, presupuestos gratis. Llame al ${BUSINESS.phone.display}.`,
  openGraph: { type: 'website', locale: 'es_US', siteName: BUSINESS.name, url: `${SITE_URL}/es/` },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
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
