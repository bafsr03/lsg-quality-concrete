import Link from 'next/link'
import type { Locale } from '@/lib/site'
import { BUSINESS } from '@/lib/site'
import { path } from '@/lib/i18n/paths'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { JointGrid } from '@/components/site/joint-grid'

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
      <Header />
      <main>
        <section className="border-joint/40 text-joint/55 relative border-b">
          <JointGrid />
          <div className="relative mx-auto w-full max-w-[110rem] px-5 py-16 sm:px-8 sm:py-24">
            <h1
              className="text-ink text-display max-w-[12ch] leading-[0.9] font-bold"
              style={{ fontStretch: '120%', letterSpacing: 'var(--tracking-display)' }}
            >
              {t.title}
            </h1>
            <p className="text-ink/80 text-lede mt-6 max-w-[42ch] leading-relaxed">{t.lede}</p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[110rem] px-5 py-14 sm:px-8">
          <dl className="border-joint/40 grid border-t sm:grid-cols-2">
            {rows.map((r) => (
              <div key={r.label} className="border-joint/40 border-b py-6 sm:pr-8">
                <dt className="text-joint text-xs">{r.label}</dt>
                <dd className="text-ink mt-1 text-lg font-semibold" style={{ fontStretch: '110%' }}>
                  {r.href ? (
                    <a href={r.href} {...(r.loc ? { 'data-loc': r.loc } : {})} className="hover:text-mark transition-colors">
                      {r.value}
                    </a>
                  ) : (
                    r.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <p className="text-joint mt-8 max-w-[56ch] text-sm leading-relaxed">{t.note}</p>

          <div className="mt-10">
            <Link
              href={path('estimate', locale)}
              className="bg-mark text-ink hover:bg-ink hover:text-slab inline-flex items-center px-7 py-4 text-sm font-semibold tracking-tight transition-colors"
            >
              {t.cta}
            </Link>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
