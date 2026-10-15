import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '@/lib/site'
import { publishedCities } from '@/content/cities'
import { cityPath } from '@/lib/content/resolve'
import { photo } from '@/lib/content/media'
import { PinIcon } from '@/components/brand/icons'

export function ServiceArea({ locale }: { locale: Locale }) {
  const img = photo('l-s-g-gallery-13')
  const t =
    locale === 'es'
      ? { title: 'Dónde trabajamos', lede: 'Salimos de Eagle Mountain. Las ciudades van ordenadas por lo que tardamos en llegar a su obra.', min: 'min', base: 'Nuestra base: Eagle Mountain' }
      : { title: 'Where we work', lede: 'We drive out from Eagle Mountain. Cities are listed by how long it takes us to reach your job.', min: 'min', base: 'Home base: Eagle Mountain' }

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto grid w-full max-w-[110rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <h2 className="text-navy text-title type-display">{t.title}</h2>
          <p className="text-joint text-lede mt-4 max-w-[44ch] leading-relaxed">{t.lede}</p>

          <ul className="mt-9 flex flex-wrap gap-2.5">
            {publishedCities.map((c) => (
              <li key={c.id}>
                <Link
                  href={cityPath(c, locale)}
                  className="group text-navy hover:bg-blue flex items-center gap-2.5 rounded-full bg-white py-2 pr-2 pl-4 text-[0.95rem] font-semibold shadow-[0_6px_18px_-10px_rgba(10,31,82,0.45)] ring-1 ring-[color-mix(in_oklab,var(--color-blue)_14%,transparent)] transition-[background-color,color,translate] duration-200 hover:-translate-y-0.5 hover:text-white"
                >
                  {c.name}
                  <span className="bg-screed text-blue group-hover:bg-mark group-hover:text-navy rounded-full px-2.5 py-1 text-xs font-bold transition-colors">
                    {c.driveMinutes} {t.min}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="reveal-tilt relative aspect-[4/5] overflow-hidden rounded-[var(--radius-panel)] border-[6px] border-white shadow-[0_40px_70px_-30px_rgba(10,31,82,0.6)] lg:rotate-2">
            <Image
              src={img.file}
              alt={
                locale === 'es'
                  ? 'Sendero de concreto curvo que cruza un patio nivelado hacia una casa en construcción'
                  : 'Curved concrete path crossing a graded yard toward a new build'
              }
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              quality={70}
              loading="lazy"
              className="object-cover"
            />
          </div>
          <p className="bg-mark text-navy absolute -bottom-5 left-6 flex -rotate-3 items-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold shadow-[0_14px_30px_-12px_rgba(240,168,0,0.9)]">
            <PinIcon className="text-spark h-5 w-5" />
            {t.base}
          </p>
        </div>
      </div>
    </section>
  )
}
