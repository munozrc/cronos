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
