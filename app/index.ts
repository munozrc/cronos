import { join } from 'node:path'

import { app, BrowserWindow, ipcMain } from 'electron'

import { downloadTrack, openDownloadsFolder } from './lib/download'
import { searchTrack } from './lib/search'

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let window: BrowserWindow | null = null

async function createMainWindow () {
  // Create a window and load a html file to be rendered.
  window = new BrowserWindow({
    title: 'Cronos - Music Downloader',
    width: 900,
    height: 600,
    show: false,
    frame: false, // application frame and app icon will be hidden.
    autoHideMenuBar: true, // hides menu bar on top and will dissable finder bar on mac.
    webPreferences: {
      preload: join(__dirname, './preload.js')
    }
  })

  // Load the react app inside a chromium window.
  app.isPackaged
    ? window.loadFile(join(__dirname, '../../renderer/dist/index.html'))
    : window.loadURL('http://localhost:3000/')

  // Show window when everything is ready.
  window.on('ready-to-show', window.show)

  // Basic handlers to ipcMain
  ipcMain.on('closeWindow', app.quit)
  ipcMain.on('minimizeWindow', () => window?.minimize())
}

// run when electron is ready!
app.whenReady().then(createMainWindow)

app.on('window-all-closed', () => {
  window = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (!window) return
  // Focus on the main window if the user tried to open another
  if (window.isMinimized()) window.restore()
  window.focus()
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  allWindows.length
    ? allWindows[0].focus()
    : createMainWindow()
})

ipcMain.handle('searchTrack', (_, query) => searchTrack(query))
ipcMain.handle('downloadTrack', (_, track) => downloadTrack(track))
ipcMain.handle('openDownloadsFolder', openDownloadsFolder)
