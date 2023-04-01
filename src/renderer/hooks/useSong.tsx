import { useCallback, useEffect, useState } from "react"
import type { SearchResponse, Song, Video } from "@cronos/types"
import { useSingleSong } from "./useSingleSong"
import { useLocation } from "./useLocation"

interface ReturnType {
  isLoading: boolean
  video?: Video | null
  songs?: Song[]
}

export function useSong (): ReturnType {
  const [params, changeView] = useLocation<{ id: string }>()
  const [response, setResponse] = useState<SearchResponse>()
  const { downloadSong, isDirectDownload } = useSingleSong()

  const searchSongs = useCallback(async () => {
    const { search: searchService } = window.song
    const { id } = params

    console.log("Fetching data....")

    try {
      const res = await searchService(id)

      if (!isDirectDownload(res)) {
        setResponse(res)
        return
      }

      const songMatch = res.songs[0]
      void downloadSong(songMatch)
      changeView("/")
    } catch (error) {
      console.error(error)
    }
  }, [params, changeView, downloadSong, isDirectDownload])

  useEffect(() => {
    if (typeof response !== "undefined") return
    void searchSongs()
  }, [searchSongs, response])

  return {
    isLoading: typeof response === "undefined",
    video: response?.video,
    songs: response?.songs
  }
}
