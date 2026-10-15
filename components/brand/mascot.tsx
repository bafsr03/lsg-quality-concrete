import Image from 'next/image'
import mascot from '@/public/brand/mascot.png'
import { Glint } from '@/components/brand/icons'

/**
 * The crew mascot (public/brand/mascot.png, cut out by build-brand.mjs).
 *
 * Pure CSS: he hops in, then keeps working (see globals.css → "The mascot").
 * Three nested layers each own one animation so hovering him — the jump —
 * never restarts his entrance. He is decorative; the bubble text is repeated
 * by a real CTA next to him, so it is hidden from assistive technology too.
 *
 * He is a full-length figure, about 1.5× as tall as he is wide.
 *
 * `className` must include a position (`relative` or `absolute`): the bubble,
 * shadow and sparkles are positioned against this element.
 */
export function Mascot({
  bubble,
  className = 'relative w-56',
  bubbleSide = 'right',
  priority = false,
}: {
  bubble?: string
  className?: string
  bubbleSide?: 'left' | 'right'
  priority?: boolean
}) {
  return (
    <div aria-hidden="true" className={`mascot-stage select-none ${className}`}>
      {/* Ground shadow breathes with his bob. */}
      <div className="mascot-shadow absolute inset-x-[18%] -bottom-[3%] h-[7%] rounded-[50%] bg-black/70 blur-md" />

      <div className="mascot-arrive relative">
        <div className="mascot-jump">
          <Image
            src={mascot}
            alt=""
            sizes="(max-width: 640px) 45vw, 320px"
            loading={priority ? 'eager' : 'lazy'}
            className="mascot-work h-auto w-full drop-shadow-[0_18px_22px_rgba(5,15,50,0.35)]"
          />
        </div>
      </div>

      <Glint className="sparkle text-mark absolute top-[6%] -left-[4%] h-6 w-6" />
      <Glint className="sparkle absolute top-[38%] -right-[6%] h-4 w-4 text-white [animation-delay:0.8s]" />
      <Glint className="sparkle text-sky absolute bottom-[18%] -left-[8%] h-5 w-5 [animation-delay:1.5s]" />

      {bubble && (
        <div
          className={`bubble absolute -top-[14%] ${bubbleSide === 'right' ? 'left-[58%]' : 'right-[62%] [transform-origin:100%_100%]'} bg-white text-navy rounded-2xl px-4 py-2.5 text-sm font-extrabold whitespace-nowrap italic shadow-[0_12px_30px_-10px_rgba(5,15,50,0.5)] sm:text-base`}
          style={{ fontStretch: '115%' }}
        >
          {bubble}
          <span
            className={`absolute -bottom-2 ${bubbleSide === 'right' ? 'left-5' : 'right-5'} h-4 w-4 rotate-45 rounded-sm bg-white`}
          />
        </div>
      )}
    </div>
  )
}
