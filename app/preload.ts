import { contextBridge, ipcRenderer } from 'electron'
import { Track } from './types'

export const cronos = {
  closeWindow: () => ipcRenderer.send('closeWindow'),
  minimizeWindow: () => ipcRenderer.send('minimizeWindow'),
  searchTrack: (query: string): Promise<Track[]> => ipcRenderer.invoke('searchTrack', query),
  downloadTrack: (track: Track): Promise<void> => ipcRenderer.invoke('downloadTrack', track),
  openDownloadsFolder: (): Promise<string> => ipcRenderer.invoke('openDownloadsFolder')
}

contextBridge.exposeInMainWorld('cronos', cronos)
