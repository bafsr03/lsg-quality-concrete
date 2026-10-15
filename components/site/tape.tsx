import { publishedDivisions } from '@/content/divisions'
import { servicesIn } from '@/content/services'
import type { Locale } from '@/lib/site'
import { StarIcon } from '@/components/brand/icons'

/**
 * Caution tape strung across the page, printed with everything we build. Tape is
 * the one place the site uses capitals, because that is what tape says.
 */
export function Tape({ locale, tilt = -1.5, className = '' }: { locale: Locale; tilt?: number; className?: string }) {
  // Two services from each trade: the tape reads as "everything we do"
  // without printing all of them twice into every page's HTML.
  const words = publishedDivisions.flatMap((d) => servicesIn(d.id).slice(0, 2).map((s) => s.name[locale]))
  const lane = [...words, ...words]

  return (
    <div
      className={`tape text-navy relative z-10 -mx-4 py-4 shadow-[0_14px_30px_-14px_rgba(5,15,50,0.45)] ${className}`}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div className="marquee" style={{ ['--marquee-speed' as string]: `${words.length * 4.5}s` }}>
        <ul className="marquee-track items-center">
          {lane.map((w, i) => (
            <li
              key={`${w}-${i}`}
              {...(i >= words.length ? { 'aria-hidden': true } : {})}
              className="flex shrink-0 items-center gap-6 pr-6 text-sm font-extrabold tracking-wide whitespace-nowrap uppercase italic sm:text-base"
              style={{ fontStretch: '120%' }}
            >
              {w}
              <StarIcon className="text-spark h-4 w-4" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
