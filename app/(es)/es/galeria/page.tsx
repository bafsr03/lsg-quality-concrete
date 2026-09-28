import type { Metadata } from 'next'
import { GalleryPage } from '@/components/pages/gallery-page'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'Nuestro Trabajo en Fotos',
  description: 'Fotografías de nuestras obras en el Condado de Utah y el Valle de Salt Lake: cimbras, subrasante, vertidos y obra plana de concreto terminada.',
  alternates: alternates('es', '/gallery/', '/es/galeria/'),
}

export default function Page() {
  return <GalleryPage locale="es" />
}
