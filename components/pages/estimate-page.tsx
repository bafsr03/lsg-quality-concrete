import type { Locale } from '@/lib/site'
import { BUSINESS } from '@/lib/site'
import { publishedServices, servicesIn } from '@/content/services'
import { publishedDivisions } from '@/content/divisions'
import { byPartner } from '@/lib/content/trades'
import { ProjectRequest } from '@/components/quote/project-request'
import { publishedCities } from '@/content/cities'
import { image, photo } from '@/lib/content/media'
import { SERVICE_RATES } from '@/lib/quote/pricing'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { PageHero } from '@/components/site/page-hero'
import { CheckIcon } from '@/components/brand/icons'
import { Estimator } from '@/components/quote/estimator'

/**
 * Server boundary for the estimator: resolves content and images here so the
 * client component never imports the content layer.
 */
export function EstimatePage({ locale }: { locale: Locale }) {
  const priced = new Set(SERVICE_RATES.map((r) => r.id))
  const services = publishedServices
    .filter((s) => s.division === 'concrete' && priced.has(s.id) && s.heroImageId)
    .map((s) => ({ id: s.id, name: s.name[locale], src: image(s.heroImageId!).file }))
  const trades = publishedDivisions
    .filter((d) => d.id !== 'concrete')
    .map((d) => ({
      id: d.id,
      name: d.name[locale],
      partner: byPartner(d),
      services: servicesIn(d.id).map((s) => ({ id: s.id, name: s.name[locale] })),
    }))
  const cities = publishedCities.map((c) => ({ id: c.id, name: c.name }))
  const heroPhoto = photo('concrete-new-gallery-5')

  const t =
    locale === 'es'
      ? {
          title: 'Presupuesto gratis',
          lede: 'Para concreto verá un rango al instante, con precios reales de Utah. Para jardinería, remodelación, electricidad o plomería, cuéntenos el proyecto y le llamamos.',
          concrete: 'Concreto: rango al instante',
          concreteLede: 'Entradas, patios, andadores, escalones, pisos y losas, calculados con precios de instalación de Utah.',
          project: 'Jardinería, remodelación, electricidad y plomería',
          projectLede: 'Estos trabajos dependen demasiado del sitio para dar un precio con dos medidas. Cuéntenos qué necesita y le llamamos, normalmente el mismo día.',
          points: [
            'Un rango al instante, mientras escribe',
            'Precios de Utah 2026, no promedios nacionales',
            'Presupuesto por escrito y gratis, confirmado en sitio',
          ],
        }
      : {
          title: 'Free estimate',
          lede: 'Concrete jobs get a price range straight away, built from real Utah rates. For landscaping, remodeling, electrical or plumbing, tell us about the project and we call you back.',
          concrete: 'Concrete: instant price range',
          concreteLede: 'Driveways, patios, walkways, steps, floors and slabs, priced from Utah installed rates.',
          project: 'Landscaping, remodeling, electrical & plumbing',
          projectLede: 'These jobs depend too much on the site to price from two measurements. Tell us what you need and we call you back, usually the same day.',
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
        <PageHero
          title={t.title}
          lede={t.lede}
          image={{
            src: heroPhoto.file,
            alt:
              locale === 'es'
                ? 'Entrada de concreto amplia y terminada, con juntas de control cortadas en retícula'
                : 'Wide finished concrete driveway with control joints cut on a regular grid',
          }}
        >
          <ul className="space-y-3 text-[0.95rem] font-semibold text-white/90">
            {t.points.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span aria-hidden="true" className="bg-mark text-navy grid h-6 w-6 shrink-0 place-items-center rounded-full">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </PageHero>

        {/* Jump links: the two forms serve different trades. */}
        <nav className="mx-auto grid w-full max-w-[110rem] gap-3 px-5 pt-10 sm:grid-cols-2 sm:px-8">
          {[
            { href: '#concrete', title: t.concrete, lede: t.concreteLede },
            { href: '#project', title: t.project, lede: t.projectLede },
          ].map((x) => (
            <a key={x.href} href={x.href} className="group hover:bg-blue rounded-2xl bg-white px-5 py-4 shadow-[0_6px_18px_-10px_rgba(10,31,82,0.4)] ring-1 ring-[color-mix(in_oklab,var(--color-blue)_12%,transparent)] transition-colors">
              <span className="text-navy type-heading block text-lg group-hover:text-white">{x.title}</span>
              <span className="text-joint mt-1 block text-sm leading-snug group-hover:text-white/80">{x.lede}</span>
            </a>
          ))}
        </nav>

        <section id="concrete" className="scroll-mt-28">
          <h2 className="text-navy text-title type-display mx-auto w-full max-w-[110rem] px-5 pt-14 sm:px-8">{t.concrete}</h2>
          <Estimator
            services={services}
            cities={cities}
            locale={locale}
            phoneDisplay={BUSINESS.phone.display}
            phoneHref={BUSINESS.phone.href}
          />
        </section>

        <section id="project" className="bg-screed scroll-mt-28">
          <div className="mx-auto w-full max-w-[110rem] px-5 py-16 sm:px-8 sm:py-20">
            <h2 className="text-navy text-title type-display max-w-[20ch]">{t.project}</h2>
            <p className="text-joint text-lede mt-4 mb-10 max-w-[52ch] leading-relaxed">{t.projectLede}</p>
            <ProjectRequest
              trades={trades}
              cities={cities}
              locale={locale}
              phoneDisplay={BUSINESS.phone.display}
              phoneHref={BUSINESS.phone.href}
            />
          </div>
        </section>
      </main>
      <Footer locale={locale} helper={false} />
    </>
  )
}
