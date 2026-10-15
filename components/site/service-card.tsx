import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '@/lib/site'
import type { Service } from '@/content/schema'
import { image } from '@/lib/content/media'
import { servicePath } from '@/lib/content/resolve'
import { ArrowIcon } from '@/components/brand/icons'

/**
 * A service as a card. With a job photograph it leads with the photo; without
 * one (trades whose photos have not arrived yet) it is a solid blue tile rather
 * than a stock image passed off as our work.
 */
export function ServiceCard({ service, locale, headingLevel = 'h3' }: { service: Service; locale: Locale; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel
  const img = service.heroImageId ? image(service.heroImageId) : null
  return (
    <Link
      href={servicePath(service, locale)}
      className="group reveal-up flex flex-col overflow-hidden rounded-[var(--radius-photo)] bg-white shadow-[0_18px_40px_-26px_rgba(10,31,82,0.6)] ring-1 ring-[color-mix(in_oklab,var(--color-blue)_10%,transparent)] transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_50px_-24px_rgba(22,82,217,0.6)]"
    >
      {img ? (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={img.file}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={70}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
          />
        </div>
      ) : (
        <div aria-hidden="true" className="field-blue relative aspect-[16/7] overflow-hidden sm:aspect-[4/3]">
          <span className="type-display absolute -bottom-3 left-5 text-[clamp(3rem,9vw,5.5rem)] leading-none text-white/15">
            {service.name[locale].split(' ')[0]}
          </span>
        </div>
      )}
      <div className="flex flex-1 items-start justify-between gap-4 px-6 py-6">
        <div>
          <H className="text-navy type-heading text-xl sm:text-2xl">{service.name[locale]}</H>
          <p className="text-joint mt-2 max-w-[40ch] text-sm leading-snug">{service.lede[locale]}</p>
        </div>
        <span className="bg-mark text-navy grid h-11 w-11 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-45">
          <ArrowIcon className="h-5 w-5" />
        </span>
      </div>
    </Link>
  )
}
