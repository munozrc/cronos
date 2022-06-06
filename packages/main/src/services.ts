import { searchMusics } from 'node-youtube-music'

import { Song } from '../../../typings'

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
