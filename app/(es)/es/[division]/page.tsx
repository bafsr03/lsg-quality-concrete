import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { divisionParams, divisionPath, resolveDivision } from '@/lib/content/resolve'
import { alternates } from '@/lib/i18n/alternates'
import { DivisionPage } from '@/components/pages/division-page'

const LOCALE = 'es' as const

export const dynamic = 'error'
export const dynamicParams = false

export function generateStaticParams() {
  return divisionParams(LOCALE)
}

export async function generateMetadata({ params }: PageProps<'/es/[division]'>): Promise<Metadata> {
  const d = resolveDivision(LOCALE, (await params).division)
  if (!d) return {}
  return {
    title: d.seo[LOCALE].title,
    description: d.seo[LOCALE].description,
    alternates: alternates(LOCALE, divisionPath(d, 'en'), divisionPath(d, 'es')),
  }
}

export default async function Page({ params }: PageProps<'/es/[division]'>) {
  const d = resolveDivision(LOCALE, (await params).division)
  if (!d) notFound()
  return <DivisionPage division={d} locale={LOCALE} />
}
