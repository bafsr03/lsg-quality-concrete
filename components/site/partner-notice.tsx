import type { Locale } from '@/lib/site'
import type { Division } from '@/content/schema'
import { byPartner } from '@/lib/content/trades'
import { CheckIcon } from '@/components/brand/icons'

/**
 * Utah does not allow advertising electrical or plumbing work without the
 * licence. Every page in a partner trade says plainly who does the work.
 */
export function PartnerNotice({ division, locale }: { division: Division; locale: Locale }) {
  if (!byPartner(division)) return null
  const trade = division.id === 'electrical'
    ? { en: 'electricians', es: 'electricistas' }
    : { en: 'plumbers', es: 'plomeros' }
  const text =
    locale === 'es'
      ? `Nosotros coordinamos el proyecto; el trabajo lo realizan ${trade.es} con licencia en Utah, que tramitan el permiso bajo su propia licencia.`
      : `We run the project; the work itself is performed by Utah-licensed ${trade.en}, who pull the permit under their own licence.`
  return (
    <div className="mx-auto w-full max-w-[110rem] px-5 pt-10 sm:px-8">
      <p className="bg-screed text-navy flex max-w-[70ch] items-start gap-3 rounded-2xl px-5 py-4 text-sm leading-relaxed font-medium ring-1 ring-[color-mix(in_oklab,var(--color-blue)_14%,transparent)]">
        <CheckIcon className="text-blue mt-0.5 h-5 w-5 shrink-0" />
        {text}
      </p>
    </div>
  )
}
