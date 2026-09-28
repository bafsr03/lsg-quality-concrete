import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allSlugs, resolveSlug } from '@/lib/content/resolve'
import { alternates } from '@/lib/i18n/alternates'
import { ServicePage } from '@/components/pages/service-page'
import { CityPage } from '@/components/pages/city-page'

const LOCALE = 'es' as const

export const dynamic = 'error'
export const dynamicParams = false

export function generateStaticParams() {
  return allSlugs(LOCALE).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps<'/es/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const found = resolveSlug(LOCALE, slug)
  if (!found) return {}

  const entity = found.kind === 'service' ? found.service : found.city
  const seo = entity.seo[LOCALE]
  return {
    title: seo.title,
    description: seo.description,
    alternates: alternates(LOCALE, `/${entity.slug.en}/`, `/es/${entity.slug.es}/`),
  }
}

export default async function SlugPage({ params }: PageProps<'/es/[slug]'>) {
  const { slug } = await params
  const found = resolveSlug(LOCALE, slug)
  if (!found) notFound()

  return found.kind === 'service' ? (
    <ServicePage service={found.service} locale={LOCALE} />
  ) : (
    <CityPage city={found.city} locale={LOCALE} />
  )
}
