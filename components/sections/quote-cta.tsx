import Image from 'next/image'
import Link from 'next/link'
import { BUSINESS, type Locale } from '@/lib/site'
import { path } from '@/lib/i18n/paths'
import { photo } from '@/lib/content/media'
import { Mascot } from '@/components/brand/mascot'
import { PhoneIcon } from '@/components/brand/icons'

export function QuoteCta({ locale }: { locale: Locale }) {
  const bg = photo('concrete-new-gallery-5')
  const t =
    locale === 'es'
      ? {
          title: 'Sepa lo que cuesta antes de llamar',
          body: 'Díganos el tipo de trabajo y las medidas y verá un rango de precio al instante, basado en precios reales de Utah. El presupuesto final siempre se confirma en una visita.',
          cta: 'Calcular mi presupuesto',
          bubble: '¡Es gratis!',
        }
      : {
          title: 'Know roughly what it costs before you call',
          body: 'Tell us the job and the measurements and you will see a price range straight away, built from real Utah rates. The final number is always confirmed on a site visit.',
          cta: 'Estimate my job',
          bubble: "It's free!",
        }

  return (
    <section className="px-3 py-3 sm:px-5 sm:py-5">
      <div className="field-blue relative isolate mx-auto w-full max-w-[112rem] overflow-hidden rounded-[var(--radius-panel)]">
        <Image
          src={bg.file}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          quality={70}
          loading="lazy"
          className="-z-10 object-cover opacity-20 mix-blend-luminosity"
        />
        <div aria-hidden="true" className="bg-mark/30 absolute -right-20 -bottom-20 -z-10 h-96 w-96 rounded-full blur-[100px]" />

        <div className="grid items-end gap-6 px-6 pt-16 sm:px-12 sm:pt-24 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="pb-16 sm:pb-24">
            <h2 className="text-title type-display max-w-[16ch] text-white">{t.title}</h2>
            <p className="text-lede mt-6 max-w-[48ch] leading-relaxed text-pretty text-white/80">{t.body}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href={path('estimate', locale)} className="btn btn-gold px-8 py-[1.1rem] text-base">
                {t.cta}
              </Link>
              <a href={BUSINESS.phone.href} data-loc="quote-cta" className="btn btn-ghost-light px-7 py-[1.1rem] text-base">
                <PhoneIcon className="ringing h-4 w-4" />
                {BUSINESS.phone.display}
              </a>
            </div>
          </div>

          <div className="peek hidden justify-center self-end lg:flex">
            <Mascot bubble={t.bubble} bubbleSide="left" className="relative mb-6 w-[15.5rem]" />
          </div>
        </div>
      </div>
    </section>
  )
}
