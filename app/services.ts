import { join } from 'node:path'

import { searchMusics } from 'node-youtube-music'
import axios from 'axios'
import ffmpeg from 'fluent-ffmpeg'
import ytdl from 'ytdl-core'
import id3 from 'node-id3'

import { Song, Metadata } from './types'

export function searchSong (query: string): Promise<Array<Song>> {
  return searchMusics(query)
    .then(response => response.map(song => ({
      id: song.youtubeId ?? '',
      title: song.title ?? '',
      artists: song.artists?.map(a => a.name) ?? [],
      duration: song.duration?.label ?? '',
      album: song.album ?? '',
      albumCover: song.thumbnailUrl ?? ''
    })))
    .catch((err) => {
      console.error('Error fetch data search: ', err)
      return []
    })
}

export async function downloadSong (metadata: Metadata): Promise<void> {
  try {
    const { id, title, artists, album, albumCover } = metadata
    const stream = ytdl(id, { filter: 'audioonly' })
    const filename = `${artists.join('& ')} - ${title}.mp3`
    const pathDownloads = join(__dirname, '../downloads')
    const pathFile = join(pathDownloads, filename)
    const imageResponse = await axios.get(albumCover.toString(), { responseType: 'arraybuffer' })

    const image = {
      mime: 'image/png',
      type: { id: 3, name: 'front cover' },
      description: 'Album Art',
      imageBuffer: imageResponse.data
    }

    ffmpeg(stream)
      .audioBitrate(128)
      .format('mp3')
      .save(pathFile)
      .on('progress', (progress) => {
        console.log(`${progress.targetSize}kb downloaded`)
      })
      .on('end', () => {
        const artist = artists.join('; ')
        id3.write({ title, artist, image, album }, pathFile)
      })
      .on('error', (err) => {
        console.error('format buffer ffmpeg-error: ', err)
      })
  } catch (err) {
    console.error('format buffer error: ', err)
  }
}
