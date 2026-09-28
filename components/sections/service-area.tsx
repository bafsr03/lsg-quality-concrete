import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '@/lib/site'
import { publishedCities } from '@/content/cities'
import { cityPath } from '@/lib/content/resolve'
import { photo } from '@/lib/content/media'

export function ServiceArea({ locale }: { locale: Locale }) {
  const img = photo('l-s-g-gallery-13')
  const t =
    locale === 'es'
      ? { title: 'Dónde trabajamos', lede: 'Ordenado por tiempo de viaje desde Eagle Mountain, no alfabéticamente: la lista debe reflejar qué tan real es la cobertura.', min: 'min' }
      : { title: 'Where we work', lede: 'Ordered by drive time from Eagle Mountain rather than alphabetically — the list should reflect how real the coverage actually is.', min: 'min' }

  return (
    <section className="border-joint/40 border-b">
      <div className="mx-auto grid w-full max-w-[110rem] items-stretch lg:grid-cols-[1fr_1fr]">
        <div className="px-5 py-14 sm:px-8 sm:py-20">
          <h2 className="text-ink text-heading font-bold" style={{ fontStretch: '115%' }}>
            {t.title}
          </h2>
          <p className="text-ink/70 mt-4 max-w-[46ch] leading-relaxed">{t.lede}</p>

          <ul className="border-joint/40 mt-8 grid border-t sm:grid-cols-2">
            {publishedCities.map((c) => (
              <li key={c.id} className="border-joint/40 border-b">
                <Link
                  href={cityPath(c, locale)}
                  className="hover:bg-screed/70 flex items-baseline justify-between gap-3 py-3.5 pr-2 transition-colors"
                >
                  <span className="text-ink text-sm font-medium">{c.name}</span>
                  <span className="text-joint shrink-0 text-xs">
                    {c.driveMinutes} {t.min}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-joint/40 relative min-h-[46svh] border-t lg:min-h-0 lg:border-t-0 lg:border-l">
          <Image
            src={img.file}
            alt={
              locale === 'es'
                ? 'Sendero de concreto curvo que cruza un patio nivelado hacia una casa en construcción'
                : 'Curved concrete path crossing a graded yard toward a new build'
            }
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={70}
            loading="lazy"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
