import Image from 'next/image'
import Link from 'next/link'
import { BUSINESS, type Locale } from '@/lib/site'
import { JointGrid } from '@/components/site/joint-grid'
import { path } from '@/lib/i18n/paths'
import heroImage from '@/public/images/22988387-concrete-new-gallery-2.jpeg'

const copy = {
  en: {
    headline: 'Concrete that outlasts the house.',
    lede: (y: number) =>
      `Driveways, patios, steps and flatwork poured across Utah County and the south Salt Lake Valley. ${y} years in, and every pour still gets jointed, screeded and finished by the same crew that formed it.`,
    cta: 'Get a free estimate',
    meta: 'Eagle Mountain, UT · Free estimates · Mon–Sat 8am–6pm',
    alt: 'Freshly poured concrete steps and a landing beside a stuccoed home in the Utah foothills, formed in timber and still curing.',
  },
  es: {
    headline: 'Concreto que dura más que la casa.',
    lede: (y: number) =>
      `Entradas, patios, escalones y obra plana en el Condado de Utah y el sur del Valle de Salt Lake. ${y} años después, cada vertido lo sigue cimbrando, nivelando y terminando la misma cuadrilla.`,
    cta: 'Solicitar presupuesto',
    meta: 'Eagle Mountain, UT · Presupuestos gratis · Lun–Sáb 8:00–18:00',
    alt: 'Escalones y descanso de concreto recién vertidos junto a una casa con acabado de estuco en las laderas de Utah, cimbrados en madera y aún fraguando.',
  },
} as const

/**
 * Split hero. Type sits on the slab; the photograph holds the right panel at
 * its native portrait ratio rather than being cropped to a letterbox — these
 * are phone photos, and cover-cropping them removes the concrete from concrete
 * photos.
 *
 * The image is the LCP element: a plain next/image, eager, high fetch priority,
 * no client component anywhere in this subtree. If JS never loads, the hero is
 * complete and readable.
 */
export function Hero({ locale }: { locale: Locale }) {
  const t = copy[locale]

  return (
    <section className="border-joint/40 relative border-b">
      <div className="mx-auto grid w-full max-w-[110rem] items-stretch lg:min-h-[calc(100svh-4.4rem)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="text-joint/55 relative flex flex-col justify-center px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
          <JointGrid />

          <div className="relative">
            <h1
              className="hero-settle text-ink text-display max-w-[15ch] leading-[0.88] font-bold"
              style={{ fontStretch: '122%', letterSpacing: 'var(--tracking-display)' }}
            >
              {t.headline}
            </h1>

            <p
              className="hero-settle text-ink/80 text-lede mt-6 max-w-[40ch] leading-relaxed text-pretty"
              style={{ animationDelay: '340ms' }}
            >
              {t.lede(BUSINESS.yearsExperience)}
            </p>

            <div
              className="hero-settle mt-9 flex flex-wrap items-center gap-x-4 gap-y-3"
              style={{ animationDelay: '440ms' }}
            >
              <Link
                href={path('estimate', locale)}
                className="bg-mark text-ink hover:bg-ink hover:text-slab inline-flex items-center px-7 py-4 text-sm font-semibold tracking-tight transition-colors"
              >
                {t.cta}
              </Link>
              <a
                href={BUSINESS.phone.href}
                data-loc="hero"
                className="border-ink/30 text-ink hover:border-ink inline-flex items-center border px-7 py-4 text-sm font-semibold tracking-tight transition-colors"
              >
                {BUSINESS.phone.display}
              </a>
            </div>

            <p
              className="hero-settle text-joint mt-7 text-xs tracking-tight"
              style={{ animationDelay: '520ms' }}
            >
              {t.meta}
            </p>
          </div>
        </div>

        <div className="border-joint/40 relative min-h-[58svh] border-t lg:min-h-0 lg:border-t-0 lg:border-l">
          <Image
            src={heroImage}
            alt={t.alt}
            sizes="(max-width: 1024px) 100vw, 48vw"
            quality={80}
            loading="eager"
            fetchPriority="high"
            placeholder="blur"
            className="absolute inset-0 h-full w-full object-cover object-[50%_28%]"
          />
        </div>
      </div>
    </section>
  )
}
