export type Track = {
  id: string
  title: string
  artists: Array<string>
  album: string
  albumCover: string
  duration: string
}

export type TrackFile = Track & {
  path?: string
  state: 'completed' | 'downloading' | 'error'
  date?: { start: Date, end: Date }
}

export type iTunesMetadata = {
  wrapperType: string
  kind: string
  artistId: number
  collectionId: number
  trackId: number
  artistName: string
  collectionName: string
  trackName: string
  releaseDate: string
  trackCount: number
  trackNumber: number
  country: string
  primaryGenreName: string
}

export type iTunesResponse = {
  resultCount: number
  results: Array<iTunesMetadata>
}

export type TagImage = {
  mime: string
  type: {
    id: number
    name: string
  }
  description: string
  imageBuffer: Buffer
}
