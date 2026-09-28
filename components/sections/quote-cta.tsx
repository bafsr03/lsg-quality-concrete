import Image from 'next/image'
import Link from 'next/link'
import { BUSINESS, type Locale } from '@/lib/site'
import { path } from '@/lib/i18n/paths'
import { photo } from '@/lib/content/media'

export function QuoteCta({ locale }: { locale: Locale }) {
  const bg = photo('concrete-new-gallery-5')
  const t =
    locale === 'es'
      ? {
          title: 'Sepa lo que cuesta antes de llamar',
          body: 'Díganos el tipo de trabajo y las medidas y verá un rango de precio al instante, basado en precios reales de Utah. El presupuesto final siempre se confirma en una visita.',
          cta: 'Calcular mi presupuesto',
          call: 'O llame al',
        }
      : {
          title: 'Know roughly what it costs before you call',
          body: 'Tell us the job and the measurements and you will see a price range straight away, built from real Utah rates. The final number is always confirmed on a site visit.',
          cta: 'Estimate my job',
          call: 'Or call',
        }

  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={bg.file}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        quality={70}
        loading="lazy"
        className="object-cover"
      />
      <div
        className="from-ink/95 via-ink/80 to-ink/65 absolute inset-0 bg-gradient-to-r"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[110rem] px-5 py-20 sm:px-8 sm:py-28">
        <h2
          className="text-slab text-title max-w-[16ch] leading-[0.95] font-bold"
          style={{ fontStretch: '118%', letterSpacing: 'var(--tracking-display)' }}
        >
          {t.title}
        </h2>
        <p className="text-slab/75 text-lede mt-6 max-w-[48ch] leading-relaxed text-pretty">{t.body}</p>
        <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link
            href={path('estimate', locale)}
            className="bg-mark text-ink hover:bg-slab inline-flex items-center px-7 py-4 text-sm font-semibold tracking-tight transition-colors"
          >
            {t.cta}
          </Link>
          <p className="text-slab/70 text-sm">
            {t.call}{' '}
            <a href={BUSINESS.phone.href} data-loc="quote-cta" className="text-slab hover:text-mark inline-block py-1.5 font-semibold transition-colors">
              {BUSINESS.phone.display}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
