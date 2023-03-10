import "vite/client"
import type { song, video, windowFrame } from "@cronos/preload"

declare global {
  interface Window {
    song: typeof song
    video: typeof video
    windowFrame: typeof windowFrame
  }
}
