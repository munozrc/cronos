import { join } from 'node:path'
import { renameSync } from 'node:fs'
import { app, BrowserWindow, shell } from 'electron'
import axios from 'axios'
import ffmpeg from 'fluent-ffmpeg'
import ytdl from 'ytdl-core'
import id3, { Tags } from 'node-id3'
import { DownloadFile, iTunesMetadata, iTunesResponse, TagImage, Track } from '../types'
import pathToFfmpeg from '../helpers/loadFfmpegPath'

const userDownloadsFolder: string = app.getPath('music')

ffmpeg.setFfmpegPath(pathToFfmpeg)

export async function downloadTrack (data: DownloadFile, window: BrowserWindow | null): Promise<void> {
  const { id, title, artist } = data
  const { temporary, persistent } = getFilePaths(userDownloadsFolder, artist, title)
  const { webContents } = window as BrowserWindow
  const item = { ...data, state: 'completed', path: persistent, size: 0 } as DownloadFile

  try {
    const [size, metadata] = await Promise.all([
      downloadAndSave(id, temporary),
      getAdditionalMetadata(data)
    ])

    id3.write(metadata, temporary)
    renameSync(temporary, persistent)
    webContents.send('downloadCompleted', { ...item, size })
  } catch (err) {
    webContents.send('downloadCompleted', { ...item, state: 'error' })
    console.error('DOWNLOAD_TRACK_ERROR: ', err)
  }
}

export async function openDownloadsFolder (): Promise<string> {
  return await shell.openPath(userDownloadsFolder)
}

function downloadAndSave (id: string, path: string): Promise<number | Error> {
  const stream = ytdl(id, { filter: 'audioonly' })
  let size = 0
  return new Promise((resolve, reject) => {
    ffmpeg(stream)
      .audioBitrate(128)
      .format('mp3')
      .save(path)
      .on('progress', (progress) => {
        size = progress.targetSize
      })
      .on('end', () => resolve(size))
      .on('error', (err) => reject(err))
  })
}

function getFilePaths (path: string, artist: string, title: string): {temporary: string, persistent: string} {
  const temporary = join(path, Math.random().toString(36).slice(-5) + '_temp')
  const persistent = join(path, `${artist} - ${title}.mp3`)
  return { temporary, persistent }
}

async function getAdditionalMetadata (track: Track): Promise<Tags> {
  const { title, artist, album, albumCover } = track
  const [metadata, image] = await Promise.all([
    getMetadataFromiTunes(artist, album),
    getBufferAlbumCover(albumCover)
  ])

  if (!metadata) return { title, artist, album, image }

  const { releaseDate, primaryGenreName, trackNumber } = metadata

  return {
    title,
    artist,
    album,
    image,
    date: releaseDate,
    genre: primaryGenreName,
    trackNumber: trackNumber.toString(),
    year: new Date(releaseDate).getFullYear().toString()
  }
}

function getMetadataFromiTunes (artist: string, album: string): Promise<iTunesMetadata | null> {
  const iTunesURL = new URL('https://itunes.apple.com/search?country=US&media=music')
  iTunesURL.searchParams.set('term', `$${artist} ${album}`)
  return axios.get(iTunesURL.href)
    .then(response => {
      if (response.status !== 200 || response.data.resultCount === 0) return null
      const data = response.data as iTunesResponse
      return data.results[0]
    })
    .catch(() => null)
}

function getBufferAlbumCover (url: string): Promise<TagImage | undefined> {
  const imageURL = url.replace('w60-h60-l90-rj', 'w800-h800-l90-rj')
  return axios.get(imageURL, { responseType: 'arraybuffer' })
    .then(response => {
      if (response.status !== 200) return undefined
      return {
        mime: 'image/png',
        type: { id: 3, name: 'front cover' },
        description: 'Album Art',
        imageBuffer: response.data
      }
    })
    .catch(() => undefined)
}
