'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

/**
 * Everything this component needs, already resolved and already localized on
 * the server. It deliberately does NOT import from content/: a 'use client'
 * boundary pulls its whole import graph into the browser bundle, and importing
 * the content layer here shipped the entire 102-entry media manifest plus Zod
 * to every visitor — 97 KB for a decorative scroll effect.
 */
export type PourStepView = {
  id: string
  step: string
  title: string
  body: string
  alt: string
  src: string
}

/**
 * The pour sequence — the only place on the site that takes over the scroll.
 *
 * It earns that because it teaches the visitor how the work actually happens,
 * using four real photographs from their own jobs in the order the job runs.
 *
 * Progressive enhancement, deliberately:
 *   - With no JavaScript the media column is a plain CSS sticky panel showing
 *     the first step while the four text blocks scroll past it. Complete and
 *     readable, just not sequenced.
 *   - GSAP is imported dynamically, only once the section is within 300px of
 *     the viewport, and never at all under prefers-reduced-motion. It is not in
 *     the initial chunk and cannot delay LCP.
 */
export function PourSequence({
  steps,
  heading,
  lede,
}: {
  steps: PourStepView[]
  heading: string
  lede: string
}) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ctx: { revert: () => void } | undefined
    let cancelled = false

    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()

        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ])
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)

        ctx = gsap.context(() => {
          const media = gsap.utils.toArray<HTMLElement>('[data-pour-media]')
          const marks = gsap.utils.toArray<HTMLElement>('[data-pour-mark]')
          const track = el.querySelector<HTMLElement>('[data-pour-track]')
          if (!track || media.length === 0) return

          const setActive = (index: number) => {
            media.forEach((m, i) => gsap.to(m, { opacity: i === index ? 1 : 0, duration: 0.35, overwrite: true }))
            marks.forEach((m, i) => m.setAttribute('data-active', String(i === index)))
          }

          ScrollTrigger.create({
            trigger: track,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
              // Bias slightly forward so a step lights up as its text arrives,
              // not after it has already scrolled past.
              const i = Math.min(media.length - 1, Math.floor(self.progress * media.length + 0.15))
              setActive(i)
            },
          })
        }, el)
      },
      { rootMargin: '300px' },
    )

    io.observe(el)
    return () => {
      cancelled = true
      io.disconnect()
      ctx?.revert()
    }
  }, [])

  return (
    <section ref={root} className="border-joint/40 bg-shadow text-slab border-t">
      <div className="mx-auto w-full max-w-[110rem] px-5 pt-16 sm:px-8 sm:pt-24">
        <h2 className="text-title max-w-[14ch] leading-[0.95] font-bold" style={{ fontStretch: '118%', letterSpacing: 'var(--tracking-display)' }}>
          {heading}
        </h2>
        <p className="text-slab/65 text-lede mt-5 max-w-[46ch] leading-relaxed text-pretty">{lede}</p>
      </div>

      <div data-pour-track className="mx-auto w-full max-w-[110rem] px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="lg:grid lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          {/* Media column: sticky with CSS alone; GSAP only cross-fades it. */}
          <div className="sticky top-24 hidden h-[62svh] lg:block">
            <div className="relative h-full w-full overflow-hidden">
              {steps.map((s, i) => (
                <Image
                  key={s.id}
                  data-pour-media
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="50vw"
                  quality={80}
                  loading="lazy"
                  className="object-cover"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                />
              ))}
            </div>
          </div>

          <ol className="mt-10 lg:mt-0">
            {steps.map((s, i) => (
              <li
                key={s.id}
                className="border-slab/15 flex flex-col justify-center border-t py-10 lg:min-h-[62svh] lg:py-0"
              >
                <div className="flex items-center gap-3">
                  <span
                    data-pour-mark
                    data-active={i === 0}
                    className="bg-slab/20 data-[active=true]:bg-mark h-2 w-8 shrink-0 transition-colors duration-300"
                  />
                  <span className="text-slab/50 text-xs font-semibold">{s.step}</span>
                </div>

                <h3 className="text-heading mt-4 max-w-[16ch] leading-tight font-bold" style={{ fontStretch: '112%' }}>
                  {s.title}
                </h3>
                <p className="text-slab/70 mt-4 max-w-[46ch] leading-relaxed">{s.body}</p>

                {/* Small screens get the photograph inline with its step. */}
                <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden lg:hidden">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="100vw"
                    quality={70}
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
