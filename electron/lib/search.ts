import { MusicVideo, searchMusics } from 'node-youtube-music'
import { Track } from '../types'

export async function searchTrack (query: string): Promise<Track[]> {
  try {
    const response = await searchMusics(query)
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
    artists: listOfArtists,
    duration: duration?.label ?? '',
    albumCover: albumCover as string
  }
}

function normalizeArtistsInfo (array: Array<{name: string, id?: string}> | string): Array<string> {
  if (typeof array === 'string') return [array]
  return array.map(i => i.name)
}

function isTrack (obj: MusicVideo): boolean {
  for (const property in Object.values(obj)) {
    if (typeof property === 'undefined') return true
  }
  return false
}
