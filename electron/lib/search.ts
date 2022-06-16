import { MusicVideo, searchMusics } from 'node-youtube-music'
import { Track } from '../types'

export async function searchTrack (query: string): Promise<Track[]> {
  try {
    const response = await searchMusics(query)
    console.log({ response })
    const results = response.map(normalizeResponse)
    return results.filter((item) => item !== undefined) as Track[]
  } catch (err) {
    console.error('Error fetch data search: ', err)
    return []
  }
}

function normalizeResponse (track: MusicVideo): Track | undefined {
  if (isTrack(track)) return undefined

  const { youtubeId, title, artists, duration, album, thumbnailUrl } = track
  const listOfArtists = normalizeArtistsInfo(artists ?? [])
  const albumCover = thumbnailUrl?.replace('w120-h120-l90-rj', 'w60-h60-l90-rj')

  return {
    id: youtubeId as string,
    title: title as string,
    album: album as string,
    artist: listOfArtists,
    duration: duration?.label ?? '',
    albumCover: albumCover as string
  }
}

function normalizeArtistsInfo (data: Array<{name: string, id?: string}> | {name: string, id?: string}): string {
  if (Array.isArray(data)) {
    const isEmpty = data.length !== 0
    const matchNames = data.map(i => i.name).join(' & ')
    return isEmpty ? matchNames : 'sin-artista'
  }
  return data.name
}

function isTrack (obj: MusicVideo): boolean {
  for (const property in Object.values(obj)) {
    if (typeof property === 'undefined') return true
  }
  return false
}
