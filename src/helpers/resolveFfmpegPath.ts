import { app } from "electron"
import path from "node:path"
import os from "node:os"

export function resolveFfmpegPath (): string {
  const binPath = "node_modules/ffmpeg-static-electron/bin/win/"
  const arch = os.arch()
  return app.isPackaged
    ? path.join(process.resourcesPath, "ffmpeg.exe")
    : path.join(process.cwd(), binPath, arch, "ffmpeg.exe")
}
