import { METADATA_API_URL } from "./settings"

interface Params {
  title: string
  artists: string
  album: string
}

const fromApiResponseToMetadata = (response: any): any => {
  const { trackName, artistName, collectionName, primaryGenreName, releaseDate } = response
  const date = new Date(releaseDate)
  const year = date.getFullYear()

  return {
    title: trackName,
    artist: artistName,
    album: collectionName,
    genre: primaryGenreName,
    year
  }
}

async function getMetadata (params: Params): Promise<any> {
  const { title, artists, album } = params
  const query = encodeURI(`${title} ${artists} ${album}`)
  const url = `${METADATA_API_URL}?term=${query}&entity=song&country=US`

  const response = await globalThis.fetch(url)

  if (!response.ok) {
    return null
  }

  const { resultCount, results } = await response.json()

  if (resultCount === 0) {
    return null
  }

  const [track] = results
  return fromApiResponseToMetadata(track)
}

export default getMetadata
