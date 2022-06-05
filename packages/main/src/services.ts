import { searchMusics } from 'node-youtube-music'

export async function searchSong (query: string) {
  // TODO: Add validation for query
  const musics = await searchMusics('As it was')
  // TODO: return data
  console.log({ musics })
}
