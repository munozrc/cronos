import { searchMusics } from "node-youtube-music"
import type { Song } from "../types"

interface Params {
  title: string
  channelTitle: string
  limit: number
}

const fromApiResponseToSong = (res: any): Song | undefined => {
  const songValues = Object.values(res)
  const isValidSong = songValues.every(prop => typeof prop !== "undefined")

  if (!isValidSong) {
    return undefined
  }

  return {
    id: res.youtubeId,
    title: res.title,
    album: res.album,
    artists: res.artists,
    duration: res.duration.label,
    thumbnailUrl: res.thumbnailUrl
  }
}

async function getSongs ({ title, channelTitle, limit }: Params): Promise<Song[]> {
  const parseChannelTitle = channelTitle.replace(" - topic", "")
  const query = `${title} - ${parseChannelTitle}`
  const response = await searchMusics(query)

  const parseSongs = response.map(fromApiResponseToSong)
  const songs = parseSongs.filter(song => song !== undefined) as Song[]
  songs.length = limit

  return songs
}

export default getSongs
