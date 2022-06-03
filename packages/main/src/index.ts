import { join } from 'node:path'

import { app, BrowserWindow } from 'electron'

app.whenReady().then(main)

// run when electron is ready!
function main () {
  // Create a window and load a html file to be rendered.
  const window = new BrowserWindow({
    width: 800, height: 700
    // ...other window settings go here!
  })

  // Load the react app inside a chromium window.
  window.loadFile(join(__dirname, '../../renderer/dist/index.html'))
}
