import { join } from 'node:path'
import { app, session } from 'electron'

export function loadReactDevTools (): Promise<void> {
  const userPath = app.getPath('userData')
  const extensionsPath = '..\\..\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\4.24.7_0'

  if (app.isPackaged) return Promise.resolve()

  return session.defaultSession.loadExtension(join(userPath, extensionsPath))
    .then(() => console.log('ReactDevTools: ✅'))
    .catch(() => console.log('ReactDevTools: failed to install ❌'))
}
