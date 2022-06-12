import { join } from 'node:path'
import { renameSync } from 'node:fs'
import { app, shell } from 'electron'
import axios from 'axios'
import ffmpeg from 'fluent-ffmpeg'
import ytdl from 'ytdl-core'
import id3, { Tags } from 'node-id3'

import { iTunesMetadata, iTunesResponse, TagImage, Track } from '../types'

const userDownloadsFolder: string = app.getPath('music')

export async function downloadTrack (track: Track): Promise<void> {
  try {
    const { id, title, artists } = track
    const { temporary, persistent } = getFilePaths(userDownloadsFolder, artists, title)

    const downloadProcess = await downloadAndSave(id, temporary)
    const metadata = await getAdditionalMetadata(track)
    const id3Process = id3.write(metadata, temporary)

    if (typeof downloadProcess !== 'boolean') throw downloadProcess
    if (typeof id3Process !== 'boolean') throw id3Process

    renameSync(temporary, persistent)
  } catch (err) {
    console.error('DOWNLOAD_TRACK_ERROR: ', err)
  }
}

export async function openDownloadsFolder (): Promise<string> {
  return await shell.openPath(userDownloadsFolder)
}

async function downloadAndSave (id: string, path: string): Promise<true | Error> {
  const stream = ytdl(id, { filter: 'audioonly' })
  return await new Promise((resolve, reject) => {
    const ffmpegProcess = ffmpeg(stream)
    ffmpegProcess.audioBitrate(128)
    ffmpegProcess.format('mp3')
    ffmpegProcess.save(path)
    ffmpegProcess.on('end', () => resolve(true))
    ffmpegProcess.on('error', (err) => reject(err))
  })
}

function getFilePaths (path: string, artists: string[], title: string): {temporary: string, persistent: string} {
  const temporary = join(path, 'track_' + Math.random().toString(36).slice(-5))
  const persistent = join(path, `${artists.join(' & ')} - ${title}.mp3`)
  return { temporary, persistent }
}

async function getAdditionalMetadata (track: Track): Promise<Tags> {
  const { title, artists, album, albumCover } = track
  const artist = artists.join(' & ')

  const metadata = await getMetadataFromiTunes(artist, album)
  const image = await getBufferAlbumCover(albumCover)

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

async function getMetadataFromiTunes (artist: string, album: string): Promise<iTunesMetadata | null> {
  const iTunesURL = new URL('https://itunes.apple.com/search?country=US&media=music')
  iTunesURL.searchParams.set('term', `$${artist} ${album}`)
  return await axios.get(iTunesURL.href)
    .then(response => {
      if (response.status !== 200 || response.data.resultCount === 0) return null
      const data = response.data as iTunesResponse
      return data.results[0]
    })
    .catch(() => null)
}

async function getBufferAlbumCover (url: string): Promise<TagImage | undefined> {
  return await axios.get(url, { responseType: 'arraybuffer' })
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
