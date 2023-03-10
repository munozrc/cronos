export interface Artist {
  id: string
  name: string
}

export interface Song {
  id: string
  album: string
  artists: Artist[]
  duration: string
  thumbnailUrl: string
  title: string
}

export interface Video {
  id: string
  channelTitle: string
  thumbnailUrl: string
  title: string
}

export interface SearchResponse {
  video: Video | null
  songs: Song[]
}

export interface DataDownload {
  id: string
  album?: string
  artists?: string
  thumbnailUrl?: string
  title: string
}
