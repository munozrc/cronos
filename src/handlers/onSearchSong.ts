import type { IpcMainInvokeEvent } from "electron"
import type { SearchResponse } from "../types"
import getSingleVideo from "../services/getSingleVideo"
import getSongs from "../services/getSongs"

export async function onSearchSong (_: IpcMainInvokeEvent, id: string): Promise<SearchResponse> {
  const video = await getSingleVideo({ id })

  const { title, channelTitle } = video
  const songs = await getSongs({ title, channelTitle, limit: 3 })

  const songMathSearch = songs.find(song => song.id === id)

  if (songMathSearch !== undefined) {
    return {
      video: null,
      songs: [songMathSearch]
    }
  }

  return { video, songs }
}
