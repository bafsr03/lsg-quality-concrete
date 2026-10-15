import type { Locale } from '@/lib/site'
import type { Division } from '@/content/schema'

/**
 * Plain on-page questions. Deliberately no FAQPage markup: Google limits that
 * rich result to government and health sites, and the answers rank as text.
 */
export function Faqs({ items, locale }: { items: Division['faqs']; locale: Locale }) {
  if (items.length === 0) return null
  return (
    <section className="mx-auto w-full max-w-[110rem] px-5 py-16 sm:px-8">
      <h2 className="text-navy text-title type-display">{locale === 'es' ? 'Preguntas frecuentes' : 'Common questions'}</h2>
      <div className="mt-8 max-w-[70ch] divide-y-2 divide-[var(--color-screed)] rounded-[var(--radius-panel)] bg-white ring-1 ring-[color-mix(in_oklab,var(--color-blue)_12%,transparent)]">
        {items.map((f) => (
          <details key={f.question.en} className="group px-6 py-5">
            <summary className="text-navy flex cursor-pointer list-none items-center justify-between gap-4 font-bold [&::-webkit-details-marker]:hidden">
              {f.question[locale]}
              <span aria-hidden="true" className="bg-mark text-navy grid h-7 w-7 shrink-0 place-items-center rounded-full text-lg leading-none transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="text-ink/85 mt-3 leading-relaxed">{f.answer[locale]}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
