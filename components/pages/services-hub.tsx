import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/lib/site'
import { publishedServices } from '@/content/services'
import { servicePath } from '@/lib/content/resolve'
import { image } from '@/lib/content/media'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { JointGrid } from '@/components/site/joint-grid'
import { QuoteCta } from '@/components/sections/quote-cta'

const copy = {
  en: {
    title: 'What we pour',
    lede: 'Flatwork, steps and slabs across Utah County and the south Salt Lake Valley. Every job is formed, poured and finished by the same crew.',
  },
  es: {
    title: 'Lo que hacemos',
    lede: 'Obra plana, escalones y losas en el Condado de Utah y el sur del Valle de Salt Lake. Cada trabajo lo cimbra, vierte y termina la misma cuadrilla.',
  },
} as const

export function ServicesHub({ locale }: { locale: Locale }) {
  const t = copy[locale]
  return (
    <>
      <Header locale={locale} />
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
            <p className="text-ink/80 text-lede mt-6 max-w-[48ch] leading-relaxed text-pretty">{t.lede}</p>
          </div>
        </section>

        <section>
          <div className="border-joint/40 mx-auto grid w-full max-w-[110rem] border-b sm:grid-cols-2 lg:grid-cols-3">
            {publishedServices.map((s) => {
              const img = image(s.heroImageId)
              return (
                <Link
                  key={s.id}
                  href={servicePath(s, locale)}
                  className="group border-joint/40 border-t border-r"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={img.file}
                      alt={s.lede[locale]}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={70}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="px-5 py-6">
                    <h2 className="text-ink text-base font-semibold" style={{ fontStretch: '112%' }}>
                      {s.name[locale]}
                    </h2>
                    <p className="text-joint mt-2 max-w-[40ch] text-sm leading-snug">{s.lede[locale]}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
        <QuoteCta locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
