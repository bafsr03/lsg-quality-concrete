import manifest from '@/content/generated/media-manifest.json'

export type MediaItem = (typeof manifest)[number]

const byId = new Map(manifest.map((m) => [m.id, m]))

/** Throws at build time rather than rendering a broken image in production. */
export function image(id: string): MediaItem {
  const m = byId.get(id)
  if (!m) throw new Error(`Unknown image id "${id}" — not in the media manifest`)
  return m
}

/**
 * Look an image up by its human-readable name (the original WordPress
 * filename) rather than the numeric-prefixed manifest id, so content files stay
 * readable. Throws on a miss or an ambiguous match.
 */
export function photo(name: string): MediaItem {
  const matches = manifest.filter((m) => m.id.endsWith(`-${name}`))
  if (matches.length === 0) throw new Error(`No image named "${name}"`)
  if (matches.length > 1) throw new Error(`Image name "${name}" is ambiguous`)
  return matches[0]
}
