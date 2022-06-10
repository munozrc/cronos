import { join } from 'node:path'
import { renameSync } from 'node:fs'
import { app, shell } from 'electron'
import axios from 'axios'
import ffmpeg from 'fluent-ffmpeg'
import ytdl from 'ytdl-core'
import id3 from 'node-id3'

import { Track } from '../types'

const userDownloadsFolder = app.getPath('music')

export async function downloadTrack (track: Track): Promise<void> {
  try {
    const { id, title, artists } = track
    const filePaths = getFilePaths(userDownloadsFolder, artists, title)

    await downloadAndSave(id, filePaths.temporary)
    await setMetada(track, filePaths.temporary)

    renameSync(filePaths.temporary, filePaths.persistent)
  } catch (err) {
    console.error('DOWNLOAD_TRACK:ERROR: ', err)
  }
}

export async function openDownloadsFolder (): Promise<string> {
  return await shell.openPath(userDownloadsFolder)
}

async function downloadAndSave (id: string, path: string): Promise<void> {
  const stream = ytdl(id, { filter: 'audioonly' })
  return await new Promise((resolve, reject) => {
    ffmpeg(stream)
      .audioBitrate(128)
      .format('mp3')
      .save(path)
      .on('end', resolve)
      .on('error', (err) => reject(new Error(err)))
  })
}

async function setMetada (track: Track, path: string): Promise<void> {
  const { title, artists, album, albumCover } = track
  const imageResponse = await axios.get(albumCover, { responseType: 'arraybuffer' })
  const artist = artists.join('; ')

  const image = {
    mime: 'image/png',
    type: { id: 3, name: 'front cover' },
    description: 'Album Art',
    imageBuffer: imageResponse.data
  }

  id3.write({ title, artist, image, album }, path)
}

function getFilePaths (path: string, artists: string[], title: string): {temporary: string, persistent: string} {
  const temporary = join(path, 'temp-' + Math.random().toString(36).slice(-5))
  const persistent = join(path, `${artists.join('& ')} - ${title}.mp3`)
  return { temporary, persistent }
}
