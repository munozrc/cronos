export interface Metadata {
  id: string
  title: string
  artists: Array<string>
  album: string
  albumCover: Buffer | string
}

export interface Song extends Metadata {
  duration?: string
}
