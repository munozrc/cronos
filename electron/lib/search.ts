import { MusicVideo, searchMusics } from 'node-youtube-music'
import { Track } from '../types'

export async function searchTrack (query: string): Promise<Track[]> {
  try {
    const response = await searchMusics(query)
    return response.map(normalizeResponse)
  } catch (err) {
    console.error('Error fetch data search: ', err)
    return []
  }
}

function normalizeResponse (track: MusicVideo): Track {
  const { youtubeId, title, artists, duration, album, thumbnailUrl } = track
  const listOfArtists: Array<string> = artists?.map(normalizeArtistsInfo) ?? []

  return {
    id: youtubeId ?? '',
    title: title ?? '',
    artists: listOfArtists,
    duration: duration?.label ?? '',
    album: album ?? '',
    albumCover: thumbnailUrl ?? ''
  }
}

function normalizeArtistsInfo (artist: {name: string, id?: string}) {
  return artist.name
}
