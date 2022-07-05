import { join } from 'node:path'
import { app } from 'electron'
import { arch } from 'os'

const isPackaged = app.isPackaged
const currentArch = arch()
const binFolder = 'node_modules/ffmpeg-static-electron/bin/win'

export default isPackaged
  ? join(process.resourcesPath, 'ffmpeg.exe')
  : join(process.cwd(), binFolder, currentArch, 'ffmpeg.exe')
