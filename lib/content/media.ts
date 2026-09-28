import manifest from '@/content/generated/media-manifest.json'

export type MediaItem = (typeof manifest)[number]

const byId = new Map(manifest.map((m) => [m.id, m]))

/** Throws at build time rather than rendering a broken image in production. */
export function image(id: string): MediaItem {
  const m = byId.get(id)
  if (!m) throw new Error(`Unknown image id "${id}" — not in the media manifest`)
  return m
}
