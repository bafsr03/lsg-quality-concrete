import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cityParams, cityPath, resolveCity } from '@/lib/content/resolve'
import { alternates } from '@/lib/i18n/alternates'
import { CityHubPage } from '@/components/pages/city-hub-page'

const LOCALE = 'en' as const

export const dynamic = 'error'
export const dynamicParams = false

export function generateStaticParams() {
  return cityParams(LOCALE)
}

export async function generateMetadata({ params }: PageProps<'/service-areas/[city]'>): Promise<Metadata> {
  const c = resolveCity(LOCALE, (await params).city)
  if (!c) return {}
  return {
    title: c.seo[LOCALE].title,
    description: c.seo[LOCALE].description,
    alternates: alternates(LOCALE, cityPath(c, 'en'), cityPath(c, 'es')),
  }
}

export default async function Page({ params }: PageProps<'/service-areas/[city]'>) {
  const c = resolveCity(LOCALE, (await params).city)
  if (!c) notFound()
  return <CityHubPage city={c} locale={LOCALE} />
}
