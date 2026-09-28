import Link from 'next/link'
import type { Locale } from '@/lib/site'
import { BUSINESS } from '@/lib/site'
import { path } from '@/lib/i18n/paths'
import { publishedCities } from '@/content/cities'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { JointGrid } from '@/components/site/joint-grid'
import { WorkStrip } from '@/components/sections/work-strip'
import { QuoteCta } from '@/components/sections/quote-cta'

const copy = {
  en: {
    title: 'A crew, not a call centre',
    body: [
      `LSG Quality Concrete is run by Lenin Guzman out of Eagle Mountain. The same people who form a job pour it and finish it — there is no subcontracting the finish to whoever is available on the day, which is the single biggest reason flatwork comes out inconsistent.`,
      `We have been pouring in this valley for ${BUSINESS.yearsExperience} years, long enough to have gone back to slabs we placed a decade ago and seen what held. That is most of what informs how we build now: deeper bases than the minimum, steel lifted off the subgrade, joints cut early rather than tooled late, and drainage decided before anything is formed rather than discovered afterwards.`,
      `We work in English and Spanish on every job.`,
    ],
    areas: 'Where we work',
    cta: 'Get a free estimate',
  },
  es: {
    title: 'Una cuadrilla, no un centro de llamadas',
    body: [
      `LSG Quality Concrete la dirige Lenin Guzman desde Eagle Mountain. Las mismas personas que cimbran un trabajo lo vierten y lo terminan: no se subcontrata el acabado a quien esté disponible ese día, que es la razón principal por la que la obra plana sale despareja.`,
      `Llevamos ${BUSINESS.yearsExperience} años vertiendo en este valle, tiempo suficiente para volver a losas que colocamos hace una década y ver qué aguantó. Eso es lo que define cómo construimos hoy: bases más profundas que el mínimo, acero levantado de la subrasante, juntas cortadas temprano en lugar de ranuradas tarde, y el drenaje resuelto antes de cimbrar y no descubierto después.`,
      `Trabajamos en inglés y español en cada obra.`,
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
        <section className="border-joint/40 text-joint/55 relative border-b">
          <JointGrid />
          <div className="relative mx-auto w-full max-w-[110rem] px-5 py-16 sm:px-8 sm:py-24">
            <h1
              className="text-ink text-display max-w-[13ch] leading-[0.9] font-bold"
              style={{ fontStretch: '120%', letterSpacing: 'var(--tracking-display)' }}
            >
              {t.title}
            </h1>
          </div>
        </section>

        <section className="border-joint/40 border-b">
          <div className="mx-auto w-full max-w-[110rem] space-y-6 px-5 py-16 sm:px-8">
            {t.body.map((p) => (
              <p key={p.slice(0, 24)} className="text-ink/85 max-w-[62ch] leading-[1.65]">
                {p}
              </p>
            ))}
            <div className="pt-4">
              <Link
                href={path('estimate', locale)}
                className="bg-mark text-ink hover:bg-ink hover:text-slab inline-flex items-center px-7 py-4 text-sm font-semibold tracking-tight transition-colors"
              >
                {t.cta}
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[110rem] px-5 py-16 sm:px-8">
          <h2 className="text-ink text-heading font-bold" style={{ fontStretch: '115%' }}>
            {t.areas}
          </h2>
          <p className="text-ink/70 mt-4 max-w-[62ch] leading-relaxed">
            {publishedCities.map((c) => c.name).join(' · ')}
          </p>
        </section>
        <WorkStrip locale={locale} seed="about" />
        <QuoteCta locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
