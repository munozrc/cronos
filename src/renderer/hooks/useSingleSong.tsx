import type { Artist, DataDownload, SearchResponse } from "@cronos/types"
import { useCallback } from "react"

interface DataType extends Omit<DataDownload, "artists"> {
  artists?: Artist[]
}

interface ReturnType {
  downloadSong: (data: DataType) => Promise<void>
  isDirectDownload: (response: SearchResponse) => boolean
}

export function useSingleSong (): ReturnType {
  const downloadSong = useCallback(async (data: DataType) => {
    const { title, thumbnailUrl, album, artists, id } = data
    const { download: downloadService, parseArtists } = window.song

    let normalizeArtists

    if (typeof artists !== "undefined") {
      normalizeArtists = parseArtists(artists)
    }

    const song: DataDownload = {
      id,
      title,
      album,
      artists: normalizeArtists,
      thumbnailUrl
    }

    try {
      await downloadService(song)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const isDirectDownload = useCallback((response: SearchResponse): boolean => {
    const { video, songs } = response
    const videoNotFound = video === null
    const onlyOneSong = songs.length === 1
    return videoNotFound || onlyOneSong
  }, [])

  return {
    downloadSong,
    isDirectDownload
  }
}
