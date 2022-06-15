import { cronos } from '../electron/preload'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window { cronos: typeof cronos }
}
