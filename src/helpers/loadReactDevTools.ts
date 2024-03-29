import { join } from "node:path"
import { app, session, type LoadExtensionOptions } from "electron"
import os from "node:os"

export async function loadReactDevTools (): Promise<void> {
  const homedir = os.homedir()
  const extension = "react-dev-tool"
  const extensionPath = join(homedir, extension)

  const options: LoadExtensionOptions = {
    allowFileAccess: true
  }

  if (app.isPackaged) return
  await session.defaultSession.loadExtension(extensionPath, options)
    .then(() => { console.log("ReactDevTools: ✅") })
    .catch(() => { console.log("ReactDevTools: failed to install ❌") })
}
