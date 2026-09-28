'use client'

import { useMemo, useRef, useState } from 'react'
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
  'w-full border border-ink/20 bg-slab px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink'

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
  const renderedAt = useRef(Date.now())
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
    <form onSubmit={submit} className="mx-auto grid w-full max-w-[110rem] gap-x-14 gap-y-12 px-5 pt-14 pb-32 sm:px-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:pb-14">
      <div className="space-y-12">
        {/* 1 — job type */}
        <fieldset>
          <legend className="text-ink text-heading font-bold" style={{ fontStretch: '115%' }}>{t.s1}</legend>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {services.map((s) => {
              const active = job.serviceId === s.id
              return (
                <label key={s.id} className="group cursor-pointer">
                  <input type="radio" name="service" value={s.id} checked={active}
                    onChange={() => set('serviceId', s.id)} className="peer sr-only" />
                  <span className="border-ink/15 peer-focus-visible:outline-ink block overflow-hidden border transition-colors peer-checked:border-ink peer-checked:border-2 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2">
                    <span className="relative block aspect-[4/3]">
                      <Image src={s.src} alt="" aria-hidden="true" fill sizes="25vw" quality={70} loading="lazy"
                        className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </span>
                    <span className="text-ink block px-3 py-2.5 text-xs font-semibold">{s.name}</span>
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>

        {/* 2 — size */}
        <fieldset>
          <legend className="text-ink text-heading font-bold" style={{ fontStretch: '115%' }}>{t.s2}</legend>
          <p className="text-joint mt-2 text-sm">{unit === 'steps' ? t.s2hintSteps : t.s2hintArea}</p>
          {unit === 'steps' ? (
            <div className="mt-5 max-w-xs">
              <label className="text-joint block text-xs" htmlFor="stepCount">{t.steps}</label>
              <input id="stepCount" type="number" min={1} max={40} inputMode="numeric" className={`${field} mt-1.5`}
                value={job.stepCount || ''} onChange={(e) => set('stepCount', Number(e.target.value))} />
            </div>
          ) : (
            <div className="mt-5 flex flex-wrap items-end gap-4">
              <div className="w-36">
                <label className="text-joint block text-xs" htmlFor="lengthFt">{t.length}</label>
                <input id="lengthFt" type="number" min={1} max={500} inputMode="decimal" className={`${field} mt-1.5`}
                  value={job.lengthFt || ''} onChange={(e) => set('lengthFt', Number(e.target.value))} />
              </div>
              <span className="text-joint pb-3 text-sm">×</span>
              <div className="w-36">
                <label className="text-joint block text-xs" htmlFor="widthFt">{t.width}</label>
                <input id="widthFt" type="number" min={1} max={500} inputMode="decimal" className={`${field} mt-1.5`}
                  value={job.widthFt || ''} onChange={(e) => set('widthFt', Number(e.target.value))} />
              </div>
              {result && result.unit === 'area' && (
                <p className="text-ink pb-3 text-sm font-semibold">
                  {result.quantity.toLocaleString()} <span className="text-joint font-normal">{t.area}</span>
                </p>
              )}
            </div>
          )}
        </fieldset>

        {/* 3 — options */}
        {unit === 'area' && (
          <fieldset>
            <legend className="text-ink text-heading font-bold" style={{ fontStretch: '115%' }}>{t.s3}</legend>
            <div className="mt-4">
              {([['tearOut', t.tearOut], ['heavyDuty', t.heavyDuty], ['hardAccess', t.hardAccess]] as const).map(([k, label]) => (
                <label key={k} className="flex cursor-pointer items-start gap-3 py-2">
                  <input type="checkbox" checked={job[k]} onChange={(e) => set(k, e.target.checked)}
                    className="accent-mark mt-px h-6 w-6 shrink-0" />
                  <span className="text-ink/85 text-sm">{label}</span>
                </label>
              ))}
            </div>
            <div className="mt-6">
              <span className="text-joint block text-xs">{t.finish}</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {(['broom', 'stamped', 'exposed'] as const).map((f) => (
                  <label key={f} className="cursor-pointer">
                    <input type="radio" name="finish" checked={job.finish === f} onChange={() => set('finish', f)} className="peer sr-only" />
                    <span className="border-ink/20 text-ink/80 peer-checked:bg-ink peer-checked:text-slab peer-focus-visible:outline-ink block border px-4 py-2 text-xs font-medium transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2">
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
          <legend className="text-ink text-heading font-bold" style={{ fontStretch: '115%' }}>{t.s4}</legend>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-joint block text-xs" htmlFor="cityId">{t.city}</label>
              <select id="cityId" className={`${field} mt-1.5`} value={contact.cityId}
                onChange={(e) => setContact((c) => ({ ...c, cityId: e.target.value }))}>
                {cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-joint block text-xs" htmlFor="timeline">{t.timeline}</label>
              <select id="timeline" className={`${field} mt-1.5`} value={contact.timeline}
                onChange={(e) => setContact((c) => ({ ...c, timeline: e.target.value }))}>
                {t.timelines.map((x) => <option key={x} value={x}>{x}</option>)}
              </select>
            </div>
          </div>
        </fieldset>

        {/* 5 — contact */}
        <fieldset>
          <legend className="text-ink text-heading font-bold" style={{ fontStretch: '115%' }}>{t.s5}</legend>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-joint block text-xs" htmlFor="name">{t.name}</label>
              <input ref={nameRef} id="name" required autoComplete="name" className={`${field} mt-1.5`} value={contact.name}
                onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))} />
            </div>
            <div>
              <label className="text-joint block text-xs" htmlFor="phone">{t.phone}</label>
              <input id="phone" required type="tel" autoComplete="tel" className={`${field} mt-1.5`} value={contact.phone}
                onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-joint block text-xs" htmlFor="email">{t.email}</label>
              <input id="email" type="email" autoComplete="email" className={`${field} mt-1.5`} value={contact.email}
                onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-joint block text-xs" htmlFor="notes">{t.notes}</label>
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
        <div className="bg-shadow text-slab">
          <div className="border-slab/15 hidden border-b px-6 py-5 lg:block">
            <p className="text-slab/50 text-xs font-semibold">{t.estTitle}</p>
            {result ? (
              <p
                className="mt-2 text-[1.95rem] leading-tight font-bold whitespace-nowrap"
                style={{ fontStretch: '112%', letterSpacing: '-0.02em' }}
              >
                {formatUsd(result.low, locale)}
                <span className="text-slab/40"> – </span>
                {formatUsd(result.high, locale)}
              </p>
            ) : (
              <p className="text-slab/60 mt-2 text-sm">{t.estNone}</p>
            )}
            {result?.atMinimum && <p className="text-mark mt-3 text-xs leading-snug">{t.estMin}</p>}
          </div>

          <div className="px-6 py-5">
            <p className="text-slab/55 text-xs leading-relaxed">{t.disclaimer}</p>

            <button type="submit" disabled={status === 'sending'}
              className="bg-mark text-ink hover:bg-slab mt-5 w-full px-6 py-4 text-sm font-semibold tracking-tight transition-colors disabled:opacity-60">
              {status === 'sending' ? t.sending : t.submit}
            </button>

            <p aria-live="polite" className="mt-4 text-sm">
              {status === 'sent' && <span className="text-mark">{t.sent}</span>}
              {(status === 'error' || status === 'unconfigured') && (
                <span className="text-slab/80">
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
        className="border-slab/15 bg-shadow text-slab fixed inset-x-0 bottom-0 z-50 border-t lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="min-w-0 flex-1">
            {status === 'sent' ? (
              <p className="text-mark text-sm leading-snug font-semibold">{t.sent}</p>
            ) : status === 'error' || status === 'unconfigured' ? (
              <p className="text-slab/85 text-xs leading-snug">
                {message || (status === 'unconfigured' ? t.unconfiguredMsg : t.errorMsg)}{' '}
                {!message && (
                  <a href={phoneHref} data-loc="estimator-bar" className="text-mark font-semibold">
                    {phoneDisplay}
                  </a>
                )}
              </p>
            ) : (
              <>
                <p className="text-slab/50 text-[0.65rem] font-semibold">{t.estTitle}</p>
                {result ? (
                  <p className="truncate text-lg leading-tight font-bold" style={{ fontStretch: '112%' }}>
                    {formatUsd(result.low, locale)}
                    <span className="text-slab/40"> – </span>
                    {formatUsd(result.high, locale)}
                  </p>
                ) : (
                  <p className="text-slab/60 text-xs leading-snug">{t.estNoneShort}</p>
                )}
              </>
            )}
          </div>

          {status !== 'sent' && (
            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-mark text-ink shrink-0 px-5 py-3 text-xs font-semibold tracking-tight disabled:opacity-60"
            >
              {status === 'sending' ? t.sending : t.submit}
            </button>
          )}
        </div>
      </div>
    </form>
  )
}
