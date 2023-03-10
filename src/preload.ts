import { contextBridge, ipcRenderer } from "electron"
import type { Artist, DataDownload, SearchResponse } from "./types"

export const windowFrame = {
  close: () => { ipcRenderer.send("windows/close") },
  minimize: () => { ipcRenderer.send("windows/minimize") }
}

export const song = {
  parseArtists: async (artists: Artist[]): Promise<string> => (
    await ipcRenderer.invoke("song/parse-artists", artists)
  ),
  searchSong: async (id: string): Promise<SearchResponse> => (
    await ipcRenderer.invoke("song/search", id)
  ),
  downloadSong: async (data: DataDownload): Promise<void> => (
    await ipcRenderer.invoke("song/download", data)
  )
}

export const video = {
  getVideoID: async (link: string): Promise<string> => (
    await ipcRenderer.invoke("video/id", link)
  )
}

contextBridge.exposeInMainWorld("windowFrame", windowFrame)
contextBridge.exposeInMainWorld("song", song)
contextBridge.exposeInMainWorld("video", video)
