import { join } from "node:path"
import { app, type BrowserWindow } from "electron"

export interface Params {
  window: BrowserWindow
  htmlFileName: string
  port: number
}

export function resolveHtmlPath (params: Params): void {
  const { window, htmlFileName, port } = params
  if (app.isPackaged) void window.loadFile(join(__dirname, "../", htmlFileName))
  else void window.loadURL(`http://localhost:${port}/`)
}
