'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import {
  estimate,
  formatUsd,
  SERVICE_RATES,
  type EstimateInput,
} from '@/lib/quote/pricing'

/** Resolved on the server so no content or Zod reaches the browser bundle. */
export type EstimatorService = { id: string; name: string; src: string }
export type EstimatorCity = { id: string; name: string }

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'unconfigured'

const COPY = {
  en: {
    s1: 'What are we pouring?',
    s2: 'How big is it?',
    s2hintArea: 'Rough measurements are fine — we confirm on site.',
    s2hintSteps: 'How many steps in the flight?',
    length: 'Length (ft)', width: 'Width (ft)', steps: 'Number of steps',
    area: 'square feet',
    s3: 'Anything else we should price in?',
    tearOut: 'Break out and haul away an existing slab',
    heavyDuty: 'It will carry an RV, trailer or heavy truck',
    hardAccess: 'A mixer truck cannot reach the pour',
    finish: 'Finish',
    broom: 'Broom', stamped: 'Stamped', exposed: 'Exposed aggregate',
    s4: 'Where and when?',
    city: 'City', timeline: 'Timeline',
    timelines: ['As soon as possible', 'Within a month', 'One to three months', 'Just planning'],
    s5: 'How do we reach you?',
    name: 'Name', phone: 'Phone', email: 'Email', notes: 'Anything else about the job',
    submit: 'Send this to LSG', sending: 'Sending…',
    estTitle: 'Indicative range', estNone: 'Pick a job type and a size to see a range.',
    estNoneShort: 'Add a size to see your range',
    estMin: 'This lands at our job minimum — small pours cost much the same to mobilise.',
    disclaimer:
      'This is an indicative range built from 2026 Utah installed rates, not a quote. Access, subgrade, haul-off and how level the site is all move the number. Your written estimate is free and confirmed on a site visit.',
    sent: 'Sent. We will call you back — usually the same day.',
    errorMsg: 'That did not send. Please call us on',
    unconfiguredMsg: 'The online form is not connected yet. Please call us on',
    required: 'Add your name and a phone number so we can call you back.',
  },
  es: {
    s1: '¿Qué vamos a colar?',
    s2: '¿De qué tamaño?',
    s2hintArea: 'Medidas aproximadas están bien; las confirmamos en sitio.',
    s2hintSteps: '¿Cuántos escalones tiene la escalera?',
    length: 'Largo (pies)', width: 'Ancho (pies)', steps: 'Número de escalones',
    area: 'pies cuadrados',
    s3: '¿Algo más que debamos considerar?',
    tearOut: 'Demoler y retirar una losa existente',
    heavyDuty: 'Soportará casa rodante, remolque o camión pesado',
    hardAccess: 'El camión mezclador no puede llegar al vertido',
    finish: 'Acabado',
    broom: 'Escoba', stamped: 'Estampado', exposed: 'Árido expuesto',
    s4: '¿Dónde y cuándo?',
    city: 'Ciudad', timeline: 'Plazo',
    timelines: ['Lo antes posible', 'Dentro de un mes', 'De uno a tres meses', 'Solo estoy planeando'],
    s5: '¿Cómo lo contactamos?',
    name: 'Nombre', phone: 'Teléfono', email: 'Correo', notes: 'Algo más sobre el trabajo',
    submit: 'Enviar a LSG', sending: 'Enviando…',
    estTitle: 'Rango estimado', estNone: 'Elija tipo de trabajo y tamaño para ver un rango.',
    estNoneShort: 'Agregue el tamaño para ver su rango',
    estMin: 'Esto llega a nuestro mínimo: movilizar una cuadrilla cuesta casi lo mismo en obras pequeñas.',
    disclaimer:
      'Este es un rango indicativo basado en precios de Utah 2026, no una cotización. El acceso, la subrasante, el retiro de escombro y el desnivel mueven la cifra. Su presupuesto por escrito es gratis y se confirma en una visita.',
    sent: 'Enviado. Le devolvemos la llamada, normalmente el mismo día.',
    errorMsg: 'No se pudo enviar. Por favor llámenos al',
    unconfiguredMsg: 'El formulario en línea aún no está conectado. Por favor llámenos al',
    required: 'Agregue su nombre y un teléfono para poder llamarle.',
  },
} as const

const field =
  'w-full rounded-xl border-2 border-screed bg-white px-4 py-3 text-base text-navy outline-none transition-colors focus:border-blue'

const legend = 'text-navy text-heading type-heading flex items-center gap-3'

/** The form really is a five-step sequence, so the steps carry numbers. */
function Step({ n }: { n: number }) {
  return (
    <span aria-hidden="true" className="bg-mark text-navy grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg not-italic">
      {n}
    </span>
  )
}

export function Estimator({
  services,
  cities,
  locale,
  phoneDisplay,
  phoneHref,
}: {
  services: EstimatorService[]
  cities: EstimatorCity[]
  locale: 'en' | 'es'
  phoneDisplay: string
  phoneHref: string
}) {
  const t = COPY[locale]
  // Mount time, for the server's too-fast-to-be-human spam gate. Set in an
  // effect because render must stay pure.
  const renderedAt = useRef(0)
  useEffect(() => { renderedAt.current = Date.now() }, [])
  const nameRef = useRef<HTMLInputElement>(null)

  const [job, setJob] = useState<EstimateInput>({
    serviceId: services[0]?.id ?? 'driveways',
    lengthFt: 0,
    widthFt: 0,
    stepCount: 0,
    tearOut: false,
    finish: 'broom',
    heavyDuty: false,
    hardAccess: false,
  })
  type Contact = {
    name: string; phone: string; email: string; notes: string
    cityId: string; timeline: string
    /** Honeypot. */
    company: string
  }
  const [contact, setContact] = useState<Contact>({
    name: '', phone: '', email: '', notes: '',
    cityId: cities[0]?.id ?? '', timeline: t.timelines[0], company: '',
  })
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  // The page also carries the project form for the other trades, below this
  // one. The fixed bar belongs to this form only, so it shows while the
  // estimator is on screen and gets out of the way once you scroll past it.
  const formRef = useRef<HTMLFormElement>(null)
  const [inView, setInView] = useState(true)
  useEffect(() => {
    const el = formRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '-25% 0px -40% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const unit = SERVICE_RATES.find((r) => r.id === job.serviceId)?.unit ?? 'area'
  const result = useMemo(() => estimate(job), [job])
  const set = <K extends keyof EstimateInput>(k: K, v: EstimateInput[K]) => setJob((j) => ({ ...j, [k]: v }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!contact.name.trim() || !contact.phone.trim()) {
      setStatus('error'); setMessage(t.required)
      // The submit button can be the fixed mobile bar, a long way from the
      // field that is actually missing — take the person there.
      nameRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      nameRef.current?.focus({ preventScroll: true })
      return
    }
    setStatus('sending'); setMessage('')
    try {
      // Trailing slash is required: trailingSlash: true applies to route
      // handlers too, and '/api/quote' would 308 before the POST lands.
      const res = await fetch('/api/quote/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...contact, ...job, locale,
          renderedAt: renderedAt.current,
          estimateLow: result?.low ?? null,
          estimateHigh: result?.high ?? null,
          kind: 'estimate',
          serviceName: services.find((s) => s.id === job.serviceId)?.name ?? job.serviceId,
          cityName: cities.find((c) => c.id === contact.cityId)?.name ?? '',
        }),
      })
      if (res.status === 503) { setStatus('unconfigured'); return }
      if (!res.ok) { setStatus('error'); setMessage(''); return }
      setStatus('sent')
    } catch {
      setStatus('error'); setMessage('')
    }
  }

  return (
    <form ref={formRef} onSubmit={submit} className="mx-auto grid w-full max-w-[110rem] gap-x-14 gap-y-12 px-5 pt-14 pb-32 sm:px-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:pb-14">
      <div className="space-y-12">
        {/* 1 — job type */}
        <fieldset>
          <legend className={legend}><Step n={1} />{t.s1}</legend>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {services.map((s) => {
              const active = job.serviceId === s.id
              return (
                <label key={s.id} className="group cursor-pointer">
                  <input type="radio" name="service" value={s.id} checked={active}
                    onChange={() => set('serviceId', s.id)} className="peer sr-only" />
                  <span className="peer-checked:ring-blue peer-focus-visible:outline-mark relative block overflow-hidden rounded-2xl bg-white shadow-[0_10px_24px_-16px_rgba(10,31,82,0.6)] ring-2 ring-transparent transition-[box-shadow,translate] group-hover:-translate-y-0.5 peer-checked:ring-4 peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2">
                    <span className="relative block aspect-[4/3]">
                      <Image src={s.src} alt="" aria-hidden="true" fill sizes="25vw" quality={70} loading="lazy"
                        className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </span>
                    <span className="text-navy block px-3 py-3 text-sm font-bold">{s.name}</span>
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>

        {/* 2 — size */}
        <fieldset>
          <legend className={legend}><Step n={2} />{t.s2}</legend>
          <p className="text-joint mt-2 text-sm">{unit === 'steps' ? t.s2hintSteps : t.s2hintArea}</p>
          {unit === 'steps' ? (
            <div className="mt-5 max-w-xs">
              <label className="text-joint block text-sm font-semibold" htmlFor="stepCount">{t.steps}</label>
              <input id="stepCount" type="number" min={1} max={40} inputMode="numeric" className={`${field} mt-1.5`}
                value={job.stepCount || ''} onChange={(e) => set('stepCount', Number(e.target.value))} />
            </div>
          ) : (
            <div className="mt-5 flex flex-wrap items-end gap-4">
              <div className="w-36">
                <label className="text-joint block text-sm font-semibold" htmlFor="lengthFt">{t.length}</label>
                <input id="lengthFt" type="number" min={1} max={500} inputMode="decimal" className={`${field} mt-1.5`}
                  value={job.lengthFt || ''} onChange={(e) => set('lengthFt', Number(e.target.value))} />
              </div>
              <span className="text-joint pb-3 text-sm">×</span>
              <div className="w-36">
                <label className="text-joint block text-sm font-semibold" htmlFor="widthFt">{t.width}</label>
                <input id="widthFt" type="number" min={1} max={500} inputMode="decimal" className={`${field} mt-1.5`}
                  value={job.widthFt || ''} onChange={(e) => set('widthFt', Number(e.target.value))} />
              </div>
              {result && result.unit === 'area' && (
                <p className="text-navy pb-3 text-base font-bold">
                  {result.quantity.toLocaleString()} <span className="text-joint font-normal">{t.area}</span>
                </p>
              )}
            </div>
          )}
        </fieldset>

        {/* 3 — options */}
        {unit === 'area' && (
          <fieldset>
            <legend className={legend}><Step n={3} />{t.s3}</legend>
            <div className="mt-4">
              {([['tearOut', t.tearOut], ['heavyDuty', t.heavyDuty], ['hardAccess', t.hardAccess]] as const).map(([k, label]) => (
                <label key={k} className="flex cursor-pointer items-start gap-3 py-2">
                  <input type="checkbox" checked={job[k]} onChange={(e) => set(k, e.target.checked)}
                    className="accent-blue mt-px h-6 w-6 shrink-0" />
                  <span className="text-navy text-[0.95rem]">{label}</span>
                </label>
              ))}
            </div>
            <div className="mt-6">
              <span className="text-joint block text-sm font-semibold">{t.finish}</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {(['broom', 'stamped', 'exposed'] as const).map((f) => (
                  <label key={f} className="cursor-pointer">
                    <input type="radio" name="finish" checked={job.finish === f} onChange={() => set('finish', f)} className="peer sr-only" />
                    <span className="text-navy peer-checked:bg-blue peer-focus-visible:outline-mark block rounded-full bg-white px-5 py-2.5 text-sm font-semibold ring-2 ring-screed transition-colors peer-checked:text-white peer-checked:ring-blue peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2">
                      {t[f]}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </fieldset>
        )}

        {/* 4 — where and when */}
        <fieldset>
          <legend className={legend}><Step n={4} />{t.s4}</legend>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-joint block text-sm font-semibold" htmlFor="cityId">{t.city}</label>
              <select id="cityId" className={`${field} mt-1.5`} value={contact.cityId}
                onChange={(e) => setContact((c) => ({ ...c, cityId: e.target.value }))}>
                {cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-joint block text-sm font-semibold" htmlFor="timeline">{t.timeline}</label>
              <select id="timeline" className={`${field} mt-1.5`} value={contact.timeline}
                onChange={(e) => setContact((c) => ({ ...c, timeline: e.target.value }))}>
                {t.timelines.map((x) => <option key={x} value={x}>{x}</option>)}
              </select>
            </div>
          </div>
        </fieldset>

        {/* 5 — contact */}
        <fieldset>
          <legend className={legend}><Step n={5} />{t.s5}</legend>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-joint block text-sm font-semibold" htmlFor="name">{t.name}</label>
              <input ref={nameRef} id="name" required autoComplete="name" className={`${field} mt-1.5`} value={contact.name}
                onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))} />
            </div>
            <div>
              <label className="text-joint block text-sm font-semibold" htmlFor="phone">{t.phone}</label>
              <input id="phone" required type="tel" autoComplete="tel" className={`${field} mt-1.5`} value={contact.phone}
                onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-joint block text-sm font-semibold" htmlFor="email">{t.email}</label>
              <input id="email" type="email" autoComplete="email" className={`${field} mt-1.5`} value={contact.email}
                onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-joint block text-sm font-semibold" htmlFor="notes">{t.notes}</label>
              <textarea id="notes" rows={4} className={`${field} mt-1.5 resize-y`} value={contact.notes}
                onChange={(e) => setContact((c) => ({ ...c, notes: e.target.value }))} />
            </div>
          </div>

          {/* Honeypot: real people never see or fill this. */}
          <label className="sr-only" aria-hidden="true">
            Company
            <input tabIndex={-1} autoComplete="off" value={contact.company}
              onChange={(e) => setContact((c) => ({ ...c, company: e.target.value }))} />
          </label>
        </fieldset>
      </div>

      {/* live estimate */}
      <aside className="lg:sticky lg:top-28 lg:h-fit">
        <div className="bg-navy overflow-hidden rounded-[var(--radius-panel)] text-white shadow-[0_30px_60px_-30px_rgba(10,31,82,0.8)]">
          <div className="field-blue hidden px-6 py-6 lg:block">
            <p className="text-sm font-bold text-white/75">{t.estTitle}</p>
            {result ? (
              <p
                className="text-mark type-heading mt-2 text-[2rem] whitespace-nowrap"
              >
                {formatUsd(result.low, locale)}
                <span className="text-white/50"> – </span>
                {formatUsd(result.high, locale)}
              </p>
            ) : (
              <p className="mt-2 text-sm text-white/75">{t.estNone}</p>
            )}
            {result?.atMinimum && <p className="mt-3 text-xs leading-snug text-white/85">{t.estMin}</p>}
          </div>

          <div className="px-6 py-5">
            <p className="text-xs leading-relaxed text-white/60">{t.disclaimer}</p>

            <button type="submit" disabled={status === 'sending'}
              className="btn btn-gold mt-5 w-full text-base disabled:opacity-60">
              {status === 'sending' ? t.sending : t.submit}
            </button>

            <p aria-live="polite" className="mt-4 text-sm">
              {status === 'sent' && <span className="text-mark">{t.sent}</span>}
              {(status === 'error' || status === 'unconfigured') && (
                <span className="text-white/85">
                  {message || (status === 'unconfigured' ? t.unconfiguredMsg : t.errorMsg)}{' '}
                  {!message && <a href={phoneHref} data-loc="estimator-fallback" className="text-mark font-semibold">{phoneDisplay}</a>}
                </span>
              )}
            </p>
          </div>
        </div>
      </aside>

      {/*
        On a phone the sticky sidebar collapses to the bottom of a very long
        form, so the live range — the entire point of the estimator — is never
        on screen while you fill it in. This bar keeps it there, and submits the
        same form.
      */}
      <div
        className={`bg-navy fixed inset-x-0 bottom-0 z-50 rounded-t-3xl text-white shadow-[0_-12px_30px_-12px_rgba(10,31,82,0.6)] transition-transform duration-300 lg:hidden ${inView ? '' : 'translate-y-full'}`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        inert={!inView}
      >
        <div className="flex items-center gap-3 px-5 py-3.5">
          <div className="min-w-0 flex-1">
            {status === 'sent' ? (
              <p className="text-mark text-sm leading-snug font-semibold">{t.sent}</p>
            ) : status === 'error' || status === 'unconfigured' ? (
              <p className="text-xs leading-snug text-white/85">
                {message || (status === 'unconfigured' ? t.unconfiguredMsg : t.errorMsg)}{' '}
                {!message && (
                  <a href={phoneHref} data-loc="estimator-bar" className="text-mark font-semibold">
                    {phoneDisplay}
                  </a>
                )}
              </p>
            ) : (
              <>
                <p className="text-[0.7rem] font-semibold text-white/60">{t.estTitle}</p>
                {result ? (
                  <p className="text-mark type-heading truncate text-xl">
                    {formatUsd(result.low, locale)}
                    <span className="text-white/50"> – </span>
                    {formatUsd(result.high, locale)}
                  </p>
                ) : (
                  <p className="text-xs leading-snug text-white/70">{t.estNoneShort}</p>
                )}
              </>
            )}
          </div>

          {status !== 'sent' && (
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn btn-gold shrink-0 px-5 py-3 text-sm disabled:opacity-60"
            >
              {status === 'sending' ? t.sending : t.submit}
            </button>
          )}
        </div>
      </div>
    </form>
  )
}
