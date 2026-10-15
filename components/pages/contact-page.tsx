import type { Locale } from '@/lib/site'
import { BUSINESS } from '@/lib/site'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { PageHero } from '@/components/site/page-hero'
import { HeroActions } from '@/components/site/hero-actions'

const copy = {
  en: {
    title: 'Get in touch',
    lede: 'Call for the fastest answer. Estimates are free and in writing.',
    phone: 'Phone',
    email: 'Email',
    based: 'Based in',
    hours: 'Hours',
    hoursValue: 'Monday to Saturday, 8am – 6pm',
    cta: 'Get a free estimate',
    note: 'We are a service-area business: we travel to the job rather than working from a yard, so there is no showroom to visit.',
  },
  es: {
    title: 'Contáctenos',
    lede: 'Llamar es la forma más rápida de obtener respuesta. Los presupuestos son gratis y por escrito.',
    phone: 'Teléfono',
    email: 'Correo',
    based: 'Con base en',
    hours: 'Horario',
    hoursValue: 'Lunes a sábado, 8:00 – 18:00',
    cta: 'Solicitar presupuesto',
    note: 'Somos un negocio de área de servicio: viajamos a la obra en lugar de trabajar desde un patio, así que no hay sala de exhibición que visitar.',
  },
} as const

export function ContactPage({ locale }: { locale: Locale }) {
  const t = copy[locale]
  const rows = [
    { label: t.phone, value: BUSINESS.phone.display, href: BUSINESS.phone.href, loc: 'contact' },
    { label: t.email, value: BUSINESS.email, href: `mailto:${BUSINESS.email}`, loc: null },
    { label: t.based, value: `${BUSINESS.locality}, ${BUSINESS.region} ${BUSINESS.postalCode}`, href: null, loc: null },
    { label: t.hours, value: t.hoursValue, href: null, loc: null },
  ]

  return (
    <>
      <Header locale={locale} />
      <main>
        <PageHero size="display" title={t.title} lede={t.lede} mascotBubble={locale === 'es' ? '¡Llámenos!' : 'Give us a call!'}>
          <HeroActions locale={locale} loc="contact-hero" cta={t.cta} />
        </PageHero>

        <section className="mx-auto w-full max-w-[110rem] px-5 py-16 sm:px-8 sm:py-20">
          <dl className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2">
            {rows.map((r, i) => (
              <div key={r.label} className={`rounded-[var(--radius-panel)] p-7 shadow-[0_18px_40px_-28px_rgba(10,31,82,0.5)] sm:p-8 ${i === 0 ? 'bg-mark' : 'bg-white ring-1 ring-[color-mix(in_oklab,var(--color-blue)_10%,transparent)]'}`}>
                <dt className={`text-sm font-bold ${i === 0 ? 'text-navy/70' : 'text-blue'}`}>{r.label}</dt>
                <dd className="text-navy type-heading mt-2 text-lg [overflow-wrap:anywhere] sm:text-2xl">
                  {r.href ? (
                    <a href={r.href} {...(r.loc ? { 'data-loc': r.loc } : {})} className="hover:text-blue inline-block py-1.5 transition-colors">
                      {r.value}
                    </a>
                  ) : (
                    r.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <p className="text-joint mt-8 max-w-[56ch] leading-relaxed">{t.note}</p>

        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
