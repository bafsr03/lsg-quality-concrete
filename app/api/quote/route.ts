import { z } from 'zod'
import { BUSINESS } from '@/lib/site'
import { estimate, formatUsd } from '@/lib/quote/pricing'

/** The only non-static surface on the site. */
export const dynamic = 'force-dynamic'

const Payload = z.object({
  name: z.string().min(1).max(120),
  phone: z.string().min(7).max(40),
  email: z.string().max(160).optional().or(z.literal('')),
  notes: z.string().max(4000).optional().or(z.literal('')),
  cityId: z.string().max(60),
  cityName: z.string().max(80),
  timeline: z.string().max(80),
  locale: z.enum(['en', 'es']),

  serviceId: z.string().max(40),
  serviceName: z.string().max(80),
  lengthFt: z.number().min(0).max(2000),
  widthFt: z.number().min(0).max(2000),
  stepCount: z.number().min(0).max(100),
  tearOut: z.boolean(),
  finish: z.enum(['broom', 'stamped', 'exposed']),
  heavyDuty: z.boolean(),
  hardAccess: z.boolean(),

  renderedAt: z.number(),
  /** Honeypot — real submissions leave this empty. */
  company: z.string().max(200).optional().or(z.literal('')),
})

const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!)

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'bad_json' }, { status: 400 })
  }

  const parsed = Payload.safeParse(body)
  if (!parsed.success) return Response.json({ error: 'invalid' }, { status: 400 })
  const d = parsed.data

  // Two silent spam gates. Both answer 200 so a bot learns nothing from the
  // response, while a real person never trips either.
  if (d.company) return Response.json({ ok: true })
  if (Date.now() - d.renderedAt < 2500) return Response.json({ ok: true })

  // Recomputed server-side: the range in the email must be ours, not whatever
  // the client posted.
  const est = estimate(d)
  const range = est
    ? `${formatUsd(est.low, 'en')} – ${formatUsd(est.high, 'en')}`
    : 'not calculated'
  const size =
    est?.unit === 'steps' ? `${est.quantity} steps` : est ? `${est.quantity} sq ft` : '—'

  const extras = [
    d.tearOut && 'tear-out of existing slab',
    d.heavyDuty && 'heavy-duty (RV/truck)',
    d.hardAccess && 'difficult truck access',
    d.finish !== 'broom' && `${d.finish} finish`,
  ].filter(Boolean)

  const lines = [
    ['Name', d.name],
    ['Phone', d.phone],
    ['Email', d.email || '—'],
    ['City', d.cityName],
    ['Timeline', d.timeline],
    ['Job', d.serviceName],
    ['Size', size],
    ['Extras', extras.length ? extras.join(', ') : 'none'],
    ['Indicative range', range],
    ['Language', d.locale === 'es' ? 'Spanish' : 'English'],
    ['Notes', d.notes || '—'],
  ]

  const html =
    `<h2>New quote request — ${esc(d.serviceName)} in ${esc(d.cityName)}</h2>` +
    `<table cellpadding="6" style="border-collapse:collapse;font-family:system-ui,sans-serif">` +
    lines
      .map(
        ([k, v]) =>
          `<tr><td style="color:#8e8c87;vertical-align:top">${esc(String(k))}</td>` +
          `<td><strong>${esc(String(v))}</strong></td></tr>`,
      )
      .join('') +
    `</table><p style="color:#8e8c87;font-size:12px">The range is indicative only — ` +
    `it is the same figure the customer saw, recomputed on the server.</p>`

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.QUOTE_INBOX ?? BUSINESS.email
  const from = process.env.QUOTE_FROM ?? 'LSG Website <quotes@mail.lsgqualityconcrete.com>'

  // Without a key nothing can be delivered. Say so plainly rather than
  // returning success and dropping the lead — the UI falls back to the phone
  // number, which is the outcome that actually keeps the customer.
  if (!apiKey) {
    console.warn('[quote] RESEND_API_KEY is not set — lead not delivered:', JSON.stringify(lines))
    return Response.json({ error: 'not_configured' }, { status: 503 })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Quote request — ${d.serviceName} — ${d.cityName}`,
      html,
      ...(d.email ? { reply_to: d.email } : {}),
    }),
  })

  if (!res.ok) {
    console.error('[quote] resend failed', res.status, await res.text())
    return Response.json({ error: 'send_failed' }, { status: 502 })
  }

  return Response.json({ ok: true })
}
