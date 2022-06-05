import { contextBridge, ipcRenderer } from 'electron'

import { searchSong } from './services'

export const cronos = {
  closeWindow: () => ipcRenderer.send('closeWindow'),
  searchSong
}

contextBridge.exposeInMainWorld('cronos', cronos)
