import { join } from "node:path"
import { app, BrowserWindow, ipcMain } from "electron"
import { resolveHtmlPath } from "./helpers"
import { onDownloadSong, onGetVideoID, onParseArtists, onSearchSong } from "./handlers"

async function createMainWindow (): Promise<void> {
  const window = new BrowserWindow({
    width: 900,
    height: 600,
    backgroundColor: "#1A1C20",
    titleBarStyle: "hidden",
    autoHideMenuBar: false,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      devTools: true
    }
  })

  const indexHTML = resolveHtmlPath(5173, "renderer/index.html")
  await window.loadURL(indexHTML)

  window.webContents.openDevTools({
    mode: "undocked"
  })

  ipcMain.on("windows/close", app.quit)
  ipcMain.on("windows/minimize", () => { window.minimize() })
}

app.whenReady()
  .then(createMainWindow)
  .catch(e => { console.error(e) })

app.on("window-all-closed", app.quit)

ipcMain.handle("song/download", onDownloadSong)
ipcMain.handle("song/search", onSearchSong)
ipcMain.handle("song/parse-artists", onParseArtists)
ipcMain.handle("video/id", onGetVideoID)
