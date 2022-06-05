import { contextBridge, ipcRenderer } from 'electron'

export const cronos = {
  closeWindow: async () => ipcRenderer.send('closeWindow')
}

contextBridge.exposeInMainWorld('cronos', cronos)
