export type Track = {
  id: string
  title: string
  artists: Array<string>
  album: string
  albumCover: string
  duration: string
}

export type DownloadFile = Track & {
  uuid: string
  state: 'completed' | 'downloading' | 'error'
  path: string
  date: Date
}

export type iTunesMetadata = {
  artistName: string
  collectionName: string
  trackName: string
  collectionCensoredName: string
  trackCensoredName: string
  artistViewUrl: string
  collectionViewUrl: string
  trackViewUrl: string
  artworkUrl30: string
  artworkUrl60: string
  artworkUrl100: string
  releaseDate: string
  collectionExplicitness: string
  trackExplicitness: string
  discCount: number
  discNumber: number
  trackCount: number
  trackNumber: number
  trackTimeMillis: number
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
