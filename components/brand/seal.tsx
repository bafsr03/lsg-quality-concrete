import { StarIcon } from '@/components/brand/icons'

/** A rotating stamp, like the inspection seal on a finished pour. */
export function Seal({ text, className = 'h-32 w-32' }: { text: string; className?: string }) {
  return (
    <div aria-hidden="true" className={`relative ${className}`}>
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id="seal-circle" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <circle cx="100" cy="100" r="98" className="fill-mark" />
        {/* textLength fits the words exactly once around the ring, so they never overlap. */}
        <text className="fill-navy" style={{ fontSize: 20, fontWeight: 800 }}>
          <textPath href="#seal-circle" textLength="458" lengthAdjust="spacingAndGlyphs">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="bg-navy text-mark absolute inset-[30%] grid place-items-center rounded-full">
        <StarIcon className="h-1/2 w-1/2" />
      </div>
    </div>
  )
}
