import Link from 'next/link'
import { BUSINESS } from '@/lib/site'

export function Header() {
  return (
    <header className="border-joint/40 relative z-20 border-b">
      <div className="mx-auto flex w-full max-w-[110rem] items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="text-ink text-lg leading-none font-bold tracking-tight"
          style={{ fontStretch: '118%' }}
        >
          LSG<span className="text-joint"> Quality Concrete</span>
        </Link>

        <a
          href={BUSINESS.phone.href}
          data-loc="header"
          className="text-ink hover:text-mark text-sm font-semibold tracking-tight transition-colors sm:text-base"
        >
          {BUSINESS.phone.display}
        </a>
      </div>
    </header>
  )
}
