import type { Locale } from '@/lib/site'
import { pourSequenceResolved } from '@/content/showcase'
import { PourSequence } from '@/components/motion/pour-sequence'

/**
 * Server boundary for the pour sequence. Resolves and localizes the content
 * here so the client component's import graph stays empty of content data.
 */
export function PourSection({ locale }: { locale: Locale }) {
  const steps = pourSequenceResolved.map((s) => ({
    id: s.id,
    step: s.step[locale],
    title: s.title[locale],
    body: s.body[locale],
    alt: s.alt[locale],
    src: s.image.file,
  }))

  return (
    <PourSequence
      steps={steps}
      heading={locale === 'es' ? 'Cómo se hace una losa' : 'How a slab gets made'}
      lede={
        locale === 'es'
          ? 'Cuatro etapas, en el orden en que realmente ocurren. Las fotos son de nuestras propias obras.'
          : 'Four stages, in the order they actually happen. Every photograph is from one of our own jobs.'
      }
    />
  )
}
