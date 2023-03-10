import type { IpcMainInvokeEvent } from "electron"
import type { Artist } from "../types"

export function onParseArtists (_: IpcMainInvokeEvent, artists: Artist[]): string {
  return artists.map(i => i.name).join(" & ")
}
