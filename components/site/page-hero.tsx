import Image, { type StaticImageData } from 'next/image'
import type { ReactNode } from 'react'
import { JointGrid } from '@/components/site/joint-grid'
import { Mascot } from '@/components/brand/mascot'

/**
 * The cap-blue hero every inner page opens with. Either split (with the
 * page's own photograph, which is then the LCP element) or plain, where the
 * mascot can stand in on wide screens.
 */
export function PageHero({
  title,
  lede,
  kicker,
  children,
  image,
  mascotBubble,
  size = 'title',
}: {
  title: string
  lede?: string
  /** One short line above the title, only when it carries real information. */
  kicker?: ReactNode
  children?: ReactNode
  image?: { src: string | StaticImageData; alt: string }
  mascotBubble?: string
  size?: 'display' | 'title'
}) {
  return (
    <section className="field-blue relative isolate overflow-hidden">
      <div className="absolute inset-0 text-white/[0.08]">
        <JointGrid />
      </div>
      <div aria-hidden="true" className="bg-mark/20 absolute -right-24 -bottom-24 -z-10 h-[28rem] w-[28rem] rounded-full blur-[110px]" />

      <div
        className={`relative mx-auto grid w-full max-w-[110rem] items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 ${image ? 'lg:grid-cols-[1.05fr_0.95fr] lg:py-16' : mascotBubble ? 'lg:grid-cols-[1fr_auto]' : ''}`}
      >
        <div>
          {kicker && <div className="rise mb-5 text-sm font-semibold text-white/85">{kicker}</div>}
          <h1
            className={`rise type-display max-w-[15ch] text-white drop-shadow-[0_4px_24px_rgba(5,15,50,0.3)] ${size === 'display' ? 'text-display' : 'text-title'}`}
            style={{ animationDelay: '80ms' }}
          >
            {title}
          </h1>
          {lede && (
            <p className="rise text-lede mt-6 max-w-[46ch] leading-relaxed text-pretty text-white/85" style={{ animationDelay: '200ms' }}>
              {lede}
            </p>
          )}
          {children && (
            <div className="rise mt-9" style={{ animationDelay: '320ms' }}>
              {children}
            </div>
          )}
        </div>

        {image && (
          <div
            className="pop-in relative mx-auto w-full max-w-[34rem] lg:mr-0"
            style={{ ['--tilt' as string]: '2deg', ['--tilt-from' as string]: '8deg', animationDelay: '120ms' }}
          >
            <div className="drift relative aspect-[4/5] overflow-hidden rounded-[var(--radius-panel)] border-[6px] border-white shadow-[0_40px_70px_-30px_rgba(5,15,50,0.7)] sm:aspect-[5/5] lg:aspect-[4/5]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                quality={80}
                loading="eager"
                fetchPriority="high"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {!image && mascotBubble && (
          <div className="hidden pr-10 lg:block">
            <Mascot bubble={mascotBubble} bubbleSide="left" priority className="relative w-56" />
          </div>
        )}
      </div>
      <div aria-hidden="true" className="tape h-3" />
    </section>
  )
}
