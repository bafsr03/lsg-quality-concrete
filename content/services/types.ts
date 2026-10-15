import type { z } from 'zod'
import type { Division, Service } from '../schema'

/** Raw shapes; content/divisions.ts and content/services.ts parse them. */
export type ServiceInput = z.input<typeof Service>
export type DivisionInput = z.input<typeof Division>
