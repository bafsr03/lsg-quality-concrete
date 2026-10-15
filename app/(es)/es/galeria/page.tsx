import type { Metadata } from 'next'
import { GalleryPage } from '@/components/pages/gallery-page'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'Nuestro Trabajo en Fotos | Concreto y Remodelación',
  description:
    'Fotografías de nuestras obras en el Condado de Utah y el Valle de Salt Lake: obra plana, escalones y losas de concreto, y remodelación de interiores.',
  alternates: alternates('es', '/gallery/', '/es/galeria/'),
}

export default function Page() {
  return <GalleryPage locale="es" />
}
