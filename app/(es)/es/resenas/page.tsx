import type { Metadata } from 'next'
import { ReviewsPage } from '@/components/pages/reviews-page'
import { alternates } from '@/lib/i18n/alternates'

export const dynamic = 'error'

export const metadata: Metadata = {
  title: 'Reseñas de Clientes | Condado de Utah',
  description:
    'Reseñas de clientes en el Condado de Utah y el Valle de Salt Lake, trasladadas palabra por palabra de nuestro sitio anterior.',
  alternates: alternates('es', '/reviews/', '/es/resenas/'),
}

export default function Page() {
  return <ReviewsPage locale="es" />
}
