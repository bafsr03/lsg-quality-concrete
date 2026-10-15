'use client'

import { useEffect, useRef, useState } from 'react'

/** Resolved on the server so no content or Zod reaches the browser bundle. */
export type ProjectTrade = { id: string; name: string; partner: boolean; services: Array<{ id: string; name: string }> }

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'unconfigured'

const COPY = {
  en: {
    trade: 'Trade', service: 'Type of work', notSure: 'Not sure yet / several',
    city: 'City', timeline: 'Timeline',
    timelines: ['As soon as possible', 'Within a month', 'One to three months', 'Just planning'],
    describe: 'Tell us about the project',
    describeHint: 'Rough size, what is there now, what you want — anything helps us come prepared.',
    name: 'Name', phone: 'Phone', email: 'Email',
    partner: 'Performed by Utah-licensed partners; we coordinate the job.',
    submit: 'Request my free estimate', sending: 'Sending…',
    sent: 'Sent. We will call you back — usually the same day.',
    errorMsg: 'That did not send. Please call us on',
    unconfiguredMsg: 'The online form is not connected yet. Please call us on',
    required: 'Add your name, a phone number and a line about the project.',
  },
  es: {
    trade: 'Oficio', service: 'Tipo de trabajo', notSure: 'Aún no sé / varios',
    city: 'Ciudad', timeline: 'Plazo',
    timelines: ['Lo antes posible', 'Dentro de un mes', 'De uno a tres meses', 'Solo estoy planeando'],
    describe: 'Cuéntenos del proyecto',
    describeHint: 'Tamaño aproximado, qué hay ahora y qué quiere: todo nos ayuda a llegar preparados.',
    name: 'Nombre', phone: 'Teléfono', email: 'Correo',
    partner: 'Lo realizan socios con licencia en Utah; nosotros coordinamos la obra.',
    submit: 'Pedir mi presupuesto gratis', sending: 'Enviando…',
    sent: 'Enviado. Le devolvemos la llamada, normalmente el mismo día.',
    errorMsg: 'No se pudo enviar. Por favor llámenos al',
    unconfiguredMsg: 'El formulario en línea aún no está conectado. Por favor llámenos al',
    required: 'Agregue su nombre, un teléfono y una línea sobre el proyecto.',
  },
} as const

const field =
  'w-full rounded-xl border-2 border-screed bg-white px-4 py-3 text-base text-navy outline-none transition-colors focus:border-blue'
const label = 'text-navy text-sm font-bold'

/**
 * Quote request for the trades that cannot be priced from two measurements
 * (landscaping, remodeling, electrical, plumbing). Posts to the same endpoint
 * as the concrete estimator.
 */
export function ProjectRequest({
  trades,
  cities,
  locale,
  phoneDisplay,
  phoneHref,
}: {
  trades: ProjectTrade[]
  cities: Array<{ id: string; name: string }>
  locale: 'en' | 'es'
  phoneDisplay: string
  phoneHref: string
}) {
  const t = COPY[locale]
  // Mount time, for the server's too-fast-to-be-human spam gate. Set in an
  // effect because render must stay pure.
  const renderedAt = useRef(0)
  useEffect(() => { renderedAt.current = Date.now() }, [])
  const [f, setF] = useState({
    division: trades[0]?.id ?? '',
    serviceId: '',
    cityId: cities[0]?.id ?? '',
    timeline: t.timelines[0] as string,
    notes: '', name: '', phone: '', email: '',
    company: '',
  })
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const set = (k: keyof typeof f, v: string) => setF((x) => ({ ...x, [k]: v }))
  const trade = trades.find((x) => x.id === f.division)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!f.name.trim() || !f.phone.trim() || !f.notes.trim()) {
      setStatus('error'); setMessage(t.required); return
    }
    setStatus('sending'); setMessage('')
    try {
      // Trailing slash: trailingSlash: true applies to route handlers too.
      const res = await fetch('/api/quote/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          kind: 'project',
          ...f,
          locale,
          renderedAt: renderedAt.current,
          divisionName: trade?.name ?? f.division,
          serviceName: trade?.services.find((s) => s.id === f.serviceId)?.name ?? t.notSure,
          cityName: cities.find((c) => c.id === f.cityId)?.name ?? '',
        }),
      })
      if (res.status === 503) { setStatus('unconfigured'); return }
      if (!res.ok) { setStatus('error'); return }
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={submit} className="grid max-w-[52rem] gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="pr-division" className={label}>{t.trade}</label>
        <select id="pr-division" className={`${field} mt-1.5`} value={f.division}
          onChange={(e) => setF((x) => ({ ...x, division: e.target.value, serviceId: '' }))}>
          {trades.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="pr-service" className={label}>{t.service}</label>
        <select id="pr-service" className={`${field} mt-1.5`} value={f.serviceId} onChange={(e) => set('serviceId', e.target.value)}>
          <option value="">{t.notSure}</option>
          {trade?.services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>
      {trade?.partner && <p className="text-blue text-sm font-semibold sm:col-span-2">{t.partner}</p>}
      <div>
        <label htmlFor="pr-city" className={label}>{t.city}</label>
        <select id="pr-city" className={`${field} mt-1.5`} value={f.cityId} onChange={(e) => set('cityId', e.target.value)}>
          {cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="pr-timeline" className={label}>{t.timeline}</label>
        <select id="pr-timeline" className={`${field} mt-1.5`} value={f.timeline} onChange={(e) => set('timeline', e.target.value)}>
          {t.timelines.map((x) => <option key={x}>{x}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="pr-notes" className={label}>{t.describe}</label>
        <p className="text-joint mt-1 text-sm">{t.describeHint}</p>
        <textarea id="pr-notes" required rows={5} className={`${field} mt-1.5 resize-y`} value={f.notes} onChange={(e) => set('notes', e.target.value)} />
      </div>
      <div>
        <label htmlFor="pr-name" className={label}>{t.name}</label>
        <input id="pr-name" required autoComplete="name" className={`${field} mt-1.5`} value={f.name} onChange={(e) => set('name', e.target.value)} />
      </div>
      <div>
        <label htmlFor="pr-phone" className={label}>{t.phone}</label>
        <input id="pr-phone" required type="tel" autoComplete="tel" className={`${field} mt-1.5`} value={f.phone} onChange={(e) => set('phone', e.target.value)} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="pr-email" className={label}>{t.email}</label>
        <input id="pr-email" type="email" autoComplete="email" className={`${field} mt-1.5`} value={f.email} onChange={(e) => set('email', e.target.value)} />
      </div>

      {/* Honeypot: real people never see or fill this. */}
      <label className="sr-only" aria-hidden="true">
        Company
        <input tabIndex={-1} autoComplete="off" value={f.company} onChange={(e) => set('company', e.target.value)} />
      </label>

      <div className="sm:col-span-2">
        <button type="submit" disabled={status === 'sending'} className="btn btn-gold px-8 py-[1.1rem] text-base disabled:opacity-60">
          {status === 'sending' ? t.sending : t.submit}
        </button>
        <p aria-live="polite" className="mt-4 text-sm">
          {status === 'sent' && <span className="text-blue font-semibold">{t.sent}</span>}
          {(status === 'error' || status === 'unconfigured') && (
            <span className="text-navy">
              {message || (status === 'unconfigured' ? t.unconfiguredMsg : t.errorMsg)}{' '}
              {!message && <a href={phoneHref} data-loc="project-fallback" className="text-blue font-semibold">{phoneDisplay}</a>}
            </span>
          )}
        </p>
      </div>
    </form>
  )
}
