import { searchMusics } from 'node-youtube-music'

export async function searchSong (query: string) {
  if (query.trim() === '') return []
  return await searchMusics(query)
    .then(response => response.map(song => ({
      id: song.youtubeId,
      title: song.title,
      artists: song.artists?.map(a => a.name).join(' - '),
      duration: song.duration?.label,
      album: song.album,
      albumCover: song.thumbnailUrl
    })))
    .catch((err) => {
      console.error('Error fetch data search: ', err)
      return []
    })
}
