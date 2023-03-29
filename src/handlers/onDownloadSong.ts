import { app, type IpcMainInvokeEvent } from "electron"
import { type DataDownload } from "../types"
import { join } from "node:path"
import { renameSync } from "node:fs"
import ytdl from "ytdl-core"
import NodeID3 from "node-id3"
import saveStreamToFile from "../services/saveStreamToFile"
import getMetadata from "../services/getMetadata"
import getBufferImage from "../services/getBufferImage"

export async function onDownloadSong (_: IpcMainInvokeEvent, data: DataDownload): Promise<void> {
  const { id, title, artists, album, thumbnailUrl } = data
  const stream = ytdl(id, { filter: "audioonly" })

  const userDownloadsFolder = app.getPath("music")
  const unsupportedChars = /[/\\?%*:|"<>]/g
  const tempFileName = ".cronos-" + Math.random().toString(36).slice(-5)

  const parseArtist = artists?.replace(unsupportedChars, "")
  const parseTitle = title.replace(unsupportedChars, "")
  const fileName = parseArtist !== undefined ? `${parseArtist} - ${parseTitle}` : title

  const tempPath = join(userDownloadsFolder, tempFileName)
  const filePath = join(userDownloadsFolder, fileName + ".mp3")

  if (album === undefined || thumbnailUrl === undefined || artists === undefined) {
    await saveStreamToFile(stream, tempPath)
    renameSync(tempPath, filePath)
    return
  }

  let metaTags = {
    title,
    album,
    artist: artists.replace(/\s&\s/g, "; "), // TODO: Remove all & for ;
    image: undefined
  }

  const [, metadata, image] = await Promise.allSettled([
    saveStreamToFile(stream, tempPath),
    getMetadata({ album, artists, title }),
    getBufferImage(thumbnailUrl)
  ])

  if (metadata.status === "fulfilled") metaTags = { ...metaTags, ...metadata.value }
  if (image.status === "fulfilled") metaTags = { ...metaTags, image: image.value }

  NodeID3.write(metaTags, tempPath)
  renameSync(tempPath, filePath)
}
