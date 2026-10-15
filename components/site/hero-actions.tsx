import Link from 'next/link'
import { BUSINESS, type Locale } from '@/lib/site'
import { path } from '@/lib/i18n/paths'
import { PhoneIcon } from '@/components/brand/icons'

/** The estimate + call pair that sits under every blue hero. */
export function HeroActions({ locale, loc, cta }: { locale: Locale; loc: string; cta?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link href={path('estimate', locale)} className="btn btn-gold px-8 py-[1.1rem] text-base">
        {cta ?? (locale === 'es' ? 'Solicitar presupuesto gratis' : 'Get a free estimate')}
      </Link>
      <a href={BUSINESS.phone.href} data-loc={loc} className="btn btn-ghost-light px-7 py-[1.1rem] text-base">
        <PhoneIcon className="ringing h-4 w-4" />
        {BUSINESS.phone.display}
      </a>
    </div>
  )
}
