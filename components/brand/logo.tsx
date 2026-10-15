import Image from 'next/image'
import horizontal from '@/public/brand/logo-horizontal.png'

/**
 * The owner's logo in its horizontal form (built by scripts/build-brand.mjs
 * from brand/source/logo.png). Decorative here: the link around it carries
 * the accessible name.
 */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <Image
      src={horizontal}
      alt=""
      sizes="(max-width: 640px) 240px, 290px"
      quality={90}
      priority
      className={`h-10 w-auto sm:h-12 ${className}`}
    />
  )
}
