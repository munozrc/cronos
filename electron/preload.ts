import { contextBridge, ipcRenderer } from 'electron'
import { DownloadFile, Track, UpdateProgress } from './types'

export const cronos = {
  closeWindow: () => ipcRenderer.send('closeWindow'),
  minimizeWindow: () => ipcRenderer.send('minimizeWindow'),
  searchTrack: (query: string): Promise<Track[]> => ipcRenderer.invoke('searchTrack', query),
  getTrackSuggestions: (id: string): Promise<Track[]> => ipcRenderer.invoke('getTrackSuggestions', id),
  getSongURL: (id: string) => ipcRenderer.invoke('get-song-url', id),
  downloadTrack: (track: Track): Promise<void> => ipcRenderer.invoke('downloadTrack', track),
  openDownloadsFolder: (): Promise<string> => ipcRenderer.invoke('openDownloadsFolder'),
  onDownloadCompleted: (callback: (item: DownloadFile) => void) => ipcRenderer.on('downloadCompleted', (_, args) => callback(args)),
  onUpdateProgress: (callback: ({ percent, size }: UpdateProgress) => void, uuid: string) => ipcRenderer.on(`update-progress-${uuid}`, (_, args) => callback(args))
}

contextBridge.exposeInMainWorld('cronos', cronos)
