import { join } from "node:path"
import { app, BrowserWindow, ipcMain } from "electron"
import { onDownloadSong, onGetVideoID, onSearchSong } from "./handlers"
import { loadReactDevTools, resolveHtmlPath } from "./helpers"

const isDevelopment = !app.isPackaged

async function createMainWindow (): Promise<void> {
  const window = new BrowserWindow({
    width: 900,
    height: 600,
    resizable: false,
    autoHideMenuBar: false,
    titleBarStyle: "hidden",
    backgroundColor: "#1A1C20",
    icon: join(__dirname, "renderer/icon.png"),
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      devTools: isDevelopment
    }
  })

  resolveHtmlPath({
    port: 5173,
    htmlFileName: "./renderer/index.html",
    window
  })

  isDevelopment && window.webContents.openDevTools({
    mode: "undocked"
  })

  ipcMain.on("windows/close", app.quit)
  ipcMain.on("windows/minimize", () => { window.minimize() })
}

app.whenReady()
  .then(loadReactDevTools)
  .then(createMainWindow)
  .catch(e => { console.error(e) })

app.on("window-all-closed", app.quit)

ipcMain.handle("song/download", onDownloadSong)
ipcMain.handle("song/search", onSearchSong)
ipcMain.handle("video/id", onGetVideoID)
