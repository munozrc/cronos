import { contextBridge, ipcRenderer } from "electron"
import type { Artist, DataDownload, SearchResponse } from "./types"

export const windowFrame = {
  close: () => { ipcRenderer.send("windows/close") },
  minimize: () => { ipcRenderer.send("windows/minimize") }
}

export const song = {
  parseArtists: (artists: Artist[]): string => (
    artists.map(i => i.name).join(" & ")
  ),
  search: async (id: string): Promise<SearchResponse> => (
    await ipcRenderer.invoke("song/search", id)
  ),
  download: async (data: DataDownload): Promise<void> => (
    await ipcRenderer.invoke("song/download", data)
  )
}

export const video = {
  getID: async (link: string): Promise<string> => (
    await ipcRenderer.invoke("video/id", link)
  )
}

contextBridge.exposeInMainWorld("windowFrame", windowFrame)
contextBridge.exposeInMainWorld("song", song)
contextBridge.exposeInMainWorld("video", video)
