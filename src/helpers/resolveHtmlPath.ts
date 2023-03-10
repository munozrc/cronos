import { join } from "node:path"
import { app } from "electron"

export function resolveHtmlPath (port: number, htmlFileName: string): string {
  return !app.isPackaged
    ? `http://localhost:${port}/`
    : `file://${join(__dirname, htmlFileName)}`
}
