import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '@/lib/site'
import { publishedServices } from '@/content/services'
import { servicePath } from '@/lib/content/resolve'
import { image } from '@/lib/content/media'
import { path } from '@/lib/i18n/paths'

export function ServiceGrid({ locale, heading }: { locale: Locale; heading?: string }) {
  const t =
    locale === 'es'
      ? { title: heading ?? 'Lo que hacemos', all: 'Todos los servicios' }
      : { title: heading ?? 'What we pour', all: 'All services' }

  return (
    <section className="border-joint/40 border-b">
      <div className="mx-auto mb-8 flex w-full max-w-[110rem] items-baseline justify-between gap-6 px-5 pt-14 sm:px-8 sm:pt-20">
        <h2 className="text-ink text-heading font-bold" style={{ fontStretch: '115%' }}>
          {t.title}
        </h2>
        <Link href={path('services', locale)} className="text-joint hover:text-ink inline-block py-1.5 text-sm font-medium transition-colors">
          {t.all}
        </Link>
      </div>

      <div className="border-joint/40 mx-auto grid w-full max-w-[110rem] border-t sm:grid-cols-2 lg:grid-cols-4">
        {publishedServices.map((s) => {
          const img = image(s.heroImageId)
          return (
            <Link
              key={s.id}
              href={servicePath(s, locale)}
              className="group border-joint/40 border-b not-last:border-r"
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src={img.file}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={70}
                  loading="lazy"
                  className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="px-5 py-5">
                <h3 className="text-ink text-sm font-semibold" style={{ fontStretch: '112%' }}>
                  {s.name[locale]}
                </h3>
                <p className="text-joint mt-1.5 max-w-[34ch] text-xs leading-snug">{s.lede[locale]}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
