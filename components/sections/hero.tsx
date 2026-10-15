import Image from 'next/image'
import Link from 'next/link'
import { BUSINESS, type Locale } from '@/lib/site'
import { JointGrid } from '@/components/site/joint-grid'
import { Tape } from '@/components/site/tape'
import { Mascot } from '@/components/brand/mascot'
import { Seal } from '@/components/brand/seal'
import { Glint, PhoneIcon, PinIcon } from '@/components/brand/icons'
import { path } from '@/lib/i18n/paths'
import { photo } from '@/lib/content/media'
import heroImage from '@/public/images/22988387-concrete-new-gallery-2.jpeg'

const copy = {
  en: {
    where: 'General contractor · Eagle Mountain, Utah',
    headline: 'One crew for the whole job.',
    lede: (y: number) =>
      `Concrete, landscaping and remodeling across Utah County and the south Salt Lake Valley, with electrical and plumbing by licensed partners we schedule for you. ${y} years in, one number to call.`,
    cta: 'Get a free estimate',
    trust: (y: number) => [`${y}+ years building in Utah`, 'Free written estimates', 'English and Spanish on every job'],
    bubble: "Let's build!",
    seal: 'FREE ESTIMATES ★ FREE ESTIMATES ★ ',
    alt: 'Freshly poured concrete steps and a landing beside a stuccoed home in the Utah foothills, formed in timber and still curing.',
    altB: 'Finished kitchen remodel with dark wood cabinets, a stainless gas range and a vaulted ceiling',
  },
  es: {
    where: 'Contratista general · Eagle Mountain, Utah',
    headline: 'Una cuadrilla para toda la obra.',
    lede: (y: number) =>
      `Concreto, jardinería y remodelación en el Condado de Utah y el sur del Valle de Salt Lake, con electricidad y plomería a cargo de socios con licencia que coordinamos por usted. ${y} años, un solo número.`,
    cta: 'Solicitar presupuesto gratis',
    trust: (y: number) => [`${y}+ años construyendo en Utah`, 'Presupuestos gratis por escrito', 'Español e inglés en cada obra'],
    bubble: '¡A construir!',
    seal: 'PRESUPUESTO GRATIS ★ PRESUPUESTO GRATIS ★ ',
    alt: 'Escalones y descanso de concreto recién vertidos junto a una casa con acabado de estuco en las laderas de Utah, cimbrados en madera y aún fraguando.',
    altB: 'Cocina remodelada con gabinetes de madera oscura, estufa de gas de acero inoxidable y techo abovedado',
  },
} as const

/**
 * The job site. Cap-blue field, the crew's own photographs pinned up like a
 * site board, and the mascot hopping on to work in front of them.
 *
 * LCP is still the main photograph: plain next/image, eager, high priority,
 * no client component in the subtree. Every animation is CSS and every one
 * ends at rest, so with JS off or reduced motion the hero is simply complete.
 */
export function Hero({ locale }: { locale: Locale }) {
  const t = copy[locale]
  // Concrete up front, a finished remodel behind it: the two trades with real
  // job photographs, side by side.
  const second = photo('remodeling-15')

  return (
    <>
      <section className="field-blue relative isolate overflow-hidden">
        <div className="absolute inset-0 text-white/[0.09]">
          <JointGrid />
        </div>
        {/* A soft sun behind the collage. */}
        <div aria-hidden="true" className="bg-mark/25 absolute top-[30%] right-[8%] -z-10 h-[34rem] w-[34rem] rounded-full blur-[110px]" />

        <div className="relative mx-auto grid w-full max-w-[110rem] items-center gap-6 px-5 pt-12 pb-20 sm:px-8 sm:pt-16 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:pt-10 lg:pb-24">
          <div>
            <p className="rise inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold ring-1 ring-white/20 backdrop-blur">
              <PinIcon className="text-mark h-4 w-4" />
              {t.where}
            </p>

            <h1
              className="rise text-display type-display mt-6 max-w-[13ch] text-white drop-shadow-[0_4px_24px_rgba(5,15,50,0.35)]"
              style={{ animationDelay: '120ms' }}
            >
              {t.headline}
            </h1>

            <p className="rise text-lede mt-6 max-w-[44ch] leading-relaxed text-pretty text-white/85" style={{ animationDelay: '260ms' }}>
              {t.lede(BUSINESS.yearsExperience)}
            </p>

            <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: '380ms' }}>
              <Link href={path('estimate', locale)} className="btn btn-gold px-8 py-[1.1rem] text-base">
                {t.cta}
              </Link>
              <a href={BUSINESS.phone.href} data-loc="hero" className="btn btn-ghost-light px-7 py-[1.1rem] text-base">
                <PhoneIcon className="ringing h-4 w-4" />
                {BUSINESS.phone.display}
              </a>
            </div>

            <ul className="rise mt-9 grid gap-x-6 gap-y-2.5 text-sm font-semibold text-white/90 sm:flex sm:flex-wrap" style={{ animationDelay: '480ms' }}>
              {t.trust(BUSINESS.yearsExperience).map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <Glint className="text-mark h-3.5 w-3.5 shrink-0" />
                  {x}
                </li>
              ))}
            </ul>
          </div>

          {/* The site board. */}
          <div className="relative mx-auto h-[25rem] w-full max-w-[36rem] sm:h-[38rem] lg:h-[42rem] lg:max-w-none">
            <div
              className="pop-in absolute top-[2%] right-[2%] w-[64%] sm:right-[6%]"
              style={{ ['--tilt' as string]: '3deg', ['--tilt-from' as string]: '10deg', animationDelay: '80ms' }}
            >
              <div className="drift relative aspect-[4/5] overflow-hidden rounded-[var(--radius-photo)] border-[6px] border-white shadow-[0_30px_60px_-20px_rgba(5,15,50,0.6)]">
                <Image
                  src={heroImage}
                  alt={t.alt}
                  sizes="(max-width: 1024px) 64vw, 30vw"
                  quality={80}
                  loading="eager"
                  fetchPriority="high"
                  placeholder="blur"
                  className="absolute inset-0 h-full w-full object-cover object-[50%_28%]"
                />
              </div>
            </div>

            <div
              className="pop-in absolute top-[16%] left-0 w-[42%] sm:left-[2%]"
              style={{ ['--tilt' as string]: '-6deg', ['--tilt-from' as string]: '-16deg', animationDelay: '220ms' }}
            >
              <div className="drift-alt relative aspect-[3/4] overflow-hidden rounded-[var(--radius-photo)] border-[6px] border-white shadow-[0_24px_50px_-18px_rgba(5,15,50,0.6)]">
                <Image
                  src={second.file}
                  alt={t.altB}
                  fill
                  sizes="(max-width: 1024px) 42vw, 20vw"
                  quality={70}
                  className="object-cover"
                />
              </div>
            </div>

            <Mascot
              bubble={t.bubble}
              priority
              className="absolute bottom-[1%] left-[10%] w-[42%] max-w-[18rem] sm:left-[16%]"
            />

            <div className="pop-in absolute right-0 bottom-[8%] sm:right-[2%]" style={{ animationDelay: '900ms' }}>
              <Seal text={t.seal} className="h-24 w-24 sm:h-32 sm:w-32" />
            </div>

          </div>
        </div>
      </section>

      <div className="relative -mt-8 overflow-x-clip pb-4">
        <Tape locale={locale} />
      </div>
    </>
  )
}
