import Link from 'next/link'
import type { Locale } from '@/lib/site'
import { BUSINESS } from '@/lib/site'
import { path } from '@/lib/i18n/paths'
import { publishedCities } from '@/content/cities'
import { cityPath } from '@/lib/content/resolve'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { PageHero } from '@/components/site/page-hero'
import { WorkStrip } from '@/components/sections/work-strip'
import { QuoteCta } from '@/components/sections/quote-cta'

const copy = {
  en: {
    title: 'A crew, not a call centre',
    body: [
      `${BUSINESS.name} is run by Lenin Guzman out of Eagle Mountain. It started as a concrete company, and concrete is still the work we do most: the same people who form a job pour it and finish it, with no handing the finish to whoever is free that day.`,
      `We have been building in this valley for ${BUSINESS.yearsExperience} years, long enough to have gone back to slabs we placed a decade ago and seen what held. Customers kept asking us to do the rest of the job too — the yard around the new patio, the basement under the new stairs — so we do: landscaping and remodeling with our own crew, and electrical and plumbing through Utah-licensed partners we schedule and answer for.`,
      `One contractor, one schedule, one number to call. We work in English and Spanish on every job.`,
    ],
    areas: 'Where we work',
    cta: 'Get a free estimate',
  },
  es: {
    title: 'Una cuadrilla, no un centro de llamadas',
    body: [
      `${BUSINESS.name} la dirige Lenin Guzman desde Eagle Mountain. Empezó como empresa de concreto y el concreto sigue siendo lo que más hacemos: las mismas personas que cimbran un trabajo lo vierten y lo terminan, sin pasar el acabado a quien esté libre ese día.`,
      `Llevamos ${BUSINESS.yearsExperience} años construyendo en este valle, tiempo suficiente para volver a losas que colocamos hace una década y ver qué aguantó. Los clientes nos pedían hacer también el resto de la obra —el jardín alrededor del patio nuevo, el sótano bajo la escalera nueva— y ahora lo hacemos: jardinería y remodelación con nuestra propia cuadrilla, y electricidad y plomería con socios con licencia en Utah que coordinamos y de los que respondemos.`,
      `Un contratista, un calendario, un solo número. Trabajamos en inglés y español en cada obra.`,
    ],
    areas: 'Dónde trabajamos',
    cta: 'Solicitar presupuesto',
  },
} as const

export function AboutPage({ locale }: { locale: Locale }) {
  const t = copy[locale]
  return (
    <>
      <Header locale={locale} />
      <main>
        <PageHero size="display" title={t.title} mascotBubble={locale === 'es' ? '¡Hola, vecino!' : 'Howdy, neighbor!'} />

        <section>
          <div className="mx-auto w-full max-w-[110rem] space-y-6 px-5 py-16 sm:px-8 sm:py-20">
            {t.body.map((p) => (
              <p key={p.slice(0, 24)} className="text-ink/85 max-w-[62ch] text-[1.05rem] leading-[1.7] first:text-lede first:text-navy first:font-medium">
                {p}
              </p>
            ))}
            <div className="pt-4">
              <Link
                href={path('estimate', locale)}
                className="btn btn-gold px-8 py-[1.1rem] text-base"
              >
                {t.cta}
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[110rem] px-5 pb-16 sm:px-8">
          <h2 className="text-navy text-title type-display">{t.areas}</h2>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {publishedCities.map((c) => (
              <li key={c.id}>
                <Link
                  href={cityPath(c, locale)}
                  className="text-navy hover:bg-blue block rounded-full bg-white px-4 py-2.5 text-[0.95rem] font-semibold shadow-[0_6px_18px_-10px_rgba(10,31,82,0.45)] ring-1 ring-[color-mix(in_oklab,var(--color-blue)_14%,transparent)] transition-colors hover:text-white"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <WorkStrip locale={locale} seed="about" />
        <QuoteCta locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
