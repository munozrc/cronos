import type { Artist, DataDownload, SearchResponse } from "@cronos/types"
import { useToast } from "./useToast"
import { useCallback } from "react"

interface DataType extends Omit<DataDownload, "artists"> {
  artists?: Artist[]
}

interface ReturnType {
  downloadSong: (data: DataType) => Promise<void>
  isDirectDownload: (response: SearchResponse) => boolean
}

export function useSingleSong (): ReturnType {
  const { createToast, updateToast } = useToast()

  const downloadSong = useCallback(async (data: DataType) => {
    const { title, thumbnailUrl, album, artists, id } = data
    const { download: downloadService, parseArtists } = window.song

    let normalizeArtists
    let nameFile = `${title}`

    if (typeof artists !== "undefined") {
      normalizeArtists = parseArtists(artists)
      nameFile = `${title} - ${normalizeArtists}`
    }

    const song: DataDownload = {
      id,
      title,
      album,
      artists: normalizeArtists,
      thumbnailUrl
    }

    try {
      const toast = createToast(nameFile)
      await downloadService(song)
      updateToast(toast)
    } catch (error) {
      console.log(error)
    }
  }, [createToast, updateToast])

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
