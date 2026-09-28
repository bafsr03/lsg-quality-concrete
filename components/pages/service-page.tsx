import Image from 'next/image'
import Link from 'next/link'
import type { Service } from '@/content/schema'
import { BUSINESS, SITE_URL, type Locale } from '@/lib/site'
import { image } from '@/lib/content/media'
import { publishedCities } from '@/content/cities'
import { cityPath, servicePath } from '@/lib/content/resolve'
import { path } from '@/lib/i18n/paths'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { JointGrid } from '@/components/site/joint-grid'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbNode, graph, ID, ref } from '@/lib/seo/graph'

const copy = {
  en: {
    spec: 'How we build it',
    areas: 'Where we pour',
    areasLede: 'This service is available across our whole area. Pick a city for what changes locally.',
    cta: 'Get a free estimate',
    call: 'Call',
    services: 'Services',
  },
  es: {
    spec: 'Cómo lo construimos',
    areas: 'Dónde trabajamos',
    areasLede: 'Este servicio está disponible en toda nuestra zona. Elija una ciudad para ver qué cambia localmente.',
    cta: 'Solicitar presupuesto',
    call: 'Llamar',
    services: 'Servicios',
  },
} as const

export function ServicePage({ service, locale }: { service: Service; locale: Locale }) {
  const t = copy[locale]
  const img = image(service.heroImageId)
  const here = servicePath(service, locale)

  const jsonLd = graph([
    {
      '@type': 'Service',
      name: service.name[locale],
      description: service.seo[locale].description,
      serviceType: service.name.en,
      provider: ref(ID.org),
      areaServed: publishedCities.map((c) => ({ '@type': 'City', name: c.name })),
      url: new URL(here, SITE_URL).toString(),
    },
    breadcrumbNode([
      { name: locale === 'es' ? 'Inicio' : 'Home', path: path('home', locale) },
      { name: t.services, path: path('services', locale) },
      { name: service.name[locale], path: here },
    ]),
  ])

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
                  className="text-ink text-title max-w-[16ch] leading-[0.95] font-bold"
                  style={{ fontStretch: '120%', letterSpacing: 'var(--tracking-display)' }}
                >
                  {service.name[locale]}
                </h1>
                <p className="text-ink/80 text-lede mt-6 max-w-[42ch] leading-relaxed text-pretty">
                  {service.lede[locale]}
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3">
                  <Link
                    href={path('estimate', locale)}
                    className="bg-mark text-ink hover:bg-ink hover:text-slab inline-flex items-center px-7 py-4 text-sm font-semibold tracking-tight transition-colors"
                  >
                    {t.cta}
                  </Link>
                  <a
                    href={BUSINESS.phone.href}
                    data-loc="service-hero"
                    className="border-ink/30 text-ink hover:border-ink inline-flex items-center border px-7 py-4 text-sm font-semibold tracking-tight transition-colors"
                  >
                    {BUSINESS.phone.display}
                  </a>
                </div>
              </div>
            </div>
            <div className="border-joint/40 relative min-h-[46svh] border-t lg:min-h-0 lg:border-t-0 lg:border-l">
              <Image
                src={img.file}
                alt={service.lede[locale]}
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                quality={80}
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="border-joint/40 border-b">
          <div className="mx-auto grid w-full max-w-[110rem] gap-x-16 gap-y-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,62ch)_20rem] lg:justify-start">
            <div className="max-w-[62ch] space-y-6">
              {service.body[locale].map((p) => (
                <p key={p.slice(0, 32)} className="text-ink/85 leading-[1.65]">
                  {p}
                </p>
              ))}
            </div>

            {/* The build spec, as a jointed data block — the detail the
                competing sites in this market leave out entirely. */}
            <aside className="bg-screed/60 h-fit">
              <h2 className="border-joint/40 text-ink border-b px-6 py-4 text-sm font-semibold">
                {t.spec}
              </h2>
              <dl className="divide-joint/30 divide-y">
                {service.spec.map((row) => (
                  <div key={row.label.en} className="px-6 py-4">
                    <dt className="text-joint text-xs">{row.label[locale]}</dt>
                    <dd className="text-ink mt-1 text-sm leading-snug">{row.value[locale]}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        <section>
          <div className="mx-auto w-full max-w-[110rem] px-5 py-16 sm:px-8">
            <h2 className="text-ink text-heading font-bold" style={{ fontStretch: '115%' }}>
              {t.areas}
            </h2>
            <p className="text-ink/70 mt-3 max-w-[54ch]">{t.areasLede}</p>
            <ul className="border-joint/40 mt-8 grid border-t sm:grid-cols-2 lg:grid-cols-3">
              {publishedCities.map((c) => (
                <li key={c.id} className="border-joint/40 border-b">
                  <Link
                    href={cityPath(c, locale)}
                    className="hover:bg-screed/70 block px-1 py-4 transition-colors"
                  >
                    <span className="text-ink text-sm font-medium">{c.name}</span>
                    <span className="text-joint mt-0.5 block text-xs">{c.county}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
      <JsonLd data={jsonLd} />
    </>
  )
}
