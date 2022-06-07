import { cronos } from '../app/preload'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window { cronos: typeof cronos }
}
