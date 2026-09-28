import type { Locale } from '@/lib/site'
import { BUSINESS } from '@/lib/site'
import { publishedServices } from '@/content/services'
import { publishedCities } from '@/content/cities'
import { image } from '@/lib/content/media'
import { SERVICE_RATES } from '@/lib/quote/pricing'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { JointGrid } from '@/components/site/joint-grid'
import { Estimator } from '@/components/quote/estimator'

/**
 * Server boundary for the estimator: resolves content and images here so the
 * client component never imports the content layer.
 */
export function EstimatePage({ locale }: { locale: Locale }) {
  const priced = new Set(SERVICE_RATES.map((r) => r.id))
  const services = publishedServices
    .filter((s) => priced.has(s.id))
    .map((s) => ({ id: s.id, name: s.name[locale], src: image(s.heroImageId).file }))
  const cities = publishedCities.map((c) => ({ id: c.id, name: c.name }))

  const t =
    locale === 'es'
      ? {
          title: 'Calcule su trabajo',
          lede: 'Describa el trabajo y verá un rango al instante, con precios reales de Utah. Después lo confirmamos en una visita, sin costo.',
        }
      : {
          title: 'Estimate your job',
          lede: 'Describe the work and you will see a range straight away, built from real Utah rates. We confirm it on a site visit, free of charge.',
        }

  return (
    <>
      <Header locale={locale} />
      <main>
        <section className="border-joint/40 text-joint/55 relative border-b">
          <JointGrid />
          <div className="relative mx-auto w-full max-w-[110rem] px-5 py-14 sm:px-8 sm:py-20">
            <h1
              className="text-ink text-display max-w-[12ch] leading-[0.9] font-bold"
              style={{ fontStretch: '120%', letterSpacing: 'var(--tracking-display)' }}
            >
              {t.title}
            </h1>
            <p className="text-ink/80 text-lede mt-6 max-w-[48ch] leading-relaxed text-pretty">{t.lede}</p>
          </div>
        </section>

        <Estimator
          services={services}
          cities={cities}
          locale={locale}
          phoneDisplay={BUSINESS.phone.display}
          phoneHref={BUSINESS.phone.href}
        />
      </main>
      <Footer locale={locale} />
    </>
  )
}
