import Image from 'next/image'
import type { Locale } from '@/lib/site'
import { BUSINESS } from '@/lib/site'
import { publishedServices } from '@/content/services'
import { publishedCities } from '@/content/cities'
import { image, photo } from '@/lib/content/media'
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
  const heroPhoto = photo('concrete-new-gallery-5')

  const t =
    locale === 'es'
      ? {
          title: 'Calcule su trabajo',
          lede: 'Describa el trabajo y verá un rango al instante, con precios reales de Utah. Después lo confirmamos en una visita, sin costo.',
          points: [
            'Un rango al instante, mientras escribe',
            'Precios de Utah 2026, no promedios nacionales',
            'Presupuesto por escrito y gratis, confirmado en sitio',
          ],
        }
      : {
          title: 'Estimate your job',
          lede: 'Describe the work and you will see a range straight away, built from real Utah rates. We confirm it on a site visit, free of charge.',
          points: [
            'A range appears as you type — no waiting on a callback',
            'Built from 2026 Utah rates, not national averages',
            'Your written estimate is free and confirmed on site',
          ],
        }

  return (
    <>
      <Header locale={locale} />
      <main>
        <section className="border-joint/40 relative border-b">
          <div className="mx-auto grid w-full max-w-[110rem] items-stretch lg:grid-cols-[1.05fr_0.95fr]">
            <div className="text-joint/55 relative flex flex-col justify-center px-5 py-14 sm:px-8 sm:py-20">
              <JointGrid />
              <div className="relative">
                <h1
                  className="text-ink text-title max-w-[13ch] leading-[0.95] font-bold"
                  style={{ fontStretch: '120%', letterSpacing: 'var(--tracking-display)' }}
                >
                  {t.title}
                </h1>
                <p className="text-ink/80 text-lede mt-6 max-w-[44ch] leading-relaxed text-pretty">{t.lede}</p>
                <ul className="text-joint mt-8 space-y-2 text-sm">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden="true" className="bg-mark mt-2 h-px w-4 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-joint/40 relative min-h-[42svh] border-t lg:min-h-0 lg:border-t-0 lg:border-l">
              <Image
                src={heroPhoto.file}
                alt={
                  locale === 'es'
                    ? 'Entrada de concreto amplia y terminada, con juntas de control cortadas en retícula'
                    : 'Wide finished concrete driveway with control joints cut on a regular grid'
                }
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                quality={80}
                loading="eager"
                fetchPriority="high"
                className="object-cover"
              />
            </div>
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
