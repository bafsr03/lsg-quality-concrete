import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { comboPath, leafParams, resolveLeaf, servicePath } from '@/lib/content/resolve'
import { alternates } from '@/lib/i18n/alternates'
import { ServicePage } from '@/components/pages/service-page'
import { CityPage } from '@/components/pages/city-page'

const LOCALE = 'es' as const

export const dynamic = 'error'
export const dynamicParams = false

export function generateStaticParams() {
  return leafParams(LOCALE)
}

export async function generateMetadata({ params }: PageProps<'/es/[division]/[slug]'>): Promise<Metadata> {
  const { division, slug } = await params
  const leaf = resolveLeaf(LOCALE, division, slug)
  if (!leaf) return {}

  const seo = (leaf.kind === 'service' ? leaf.service.seo : leaf.combo.seo)[LOCALE]
  const [en, es] =
    leaf.kind === 'service'
      ? [servicePath(leaf.service, 'en'), servicePath(leaf.service, 'es')]
      : [comboPath(leaf.combo, 'en'), comboPath(leaf.combo, 'es')]
  return { title: seo.title, description: seo.description, alternates: alternates(LOCALE, en, es) }
}

export default async function Page({ params }: PageProps<'/es/[division]/[slug]'>) {
  const { division, slug } = await params
  const leaf = resolveLeaf(LOCALE, division, slug)
  if (!leaf) notFound()

  return leaf.kind === 'service' ? (
    <ServicePage service={leaf.service} division={leaf.division} locale={LOCALE} />
  ) : (
    <CityPage combo={leaf.combo} city={leaf.city} division={leaf.division} locale={LOCALE} />
  )
}
