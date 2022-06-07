import { contextBridge, ipcRenderer } from 'electron'

import { Metadata, Song } from './types'

export const cronos = {
  closeWindow: () => ipcRenderer.send('closeWindow'),
  minimizeWindow: () => ipcRenderer.send('minimizeWindow'),
  downloadSong: (metadata: Metadata): Promise<void> => ipcRenderer.invoke('downloadSong', metadata),
  searchSong: (query: string): Promise<Array<Song>> => ipcRenderer.invoke('searchSong', query)
}

contextBridge.exposeInMainWorld('cronos', cronos)
