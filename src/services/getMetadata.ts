import { METADATA_API_URL } from "./settings"

interface Params {
  title: string
  artists: string
  album: string
}

const fromApiResponseToMetadata = (response: any): any => {
  const { primaryGenreName, releaseDate, trackNumber } = response
  const date = new Date(releaseDate)
  const year = date.getFullYear().toString()

  return {
    genre: primaryGenreName,
    releaseTime: releaseDate,
    trackNumber,
    year
  }
}

async function getMetadata (params: Params): Promise<any> {
  const { title, artists, album } = params
  const query = encodeURI(`${title} ${artists} ${album}`)
  const url = `${METADATA_API_URL}?term=${query}&entity=song&country=US`

  const response = await globalThis.fetch(url)

  if (!response.ok) {
    return undefined
  }

  const { resultCount, results } = await response.json()

  if (resultCount === 0) {
    return undefined
  }

  const [track] = results
  return fromApiResponseToMetadata(track)
}

export default getMetadata
