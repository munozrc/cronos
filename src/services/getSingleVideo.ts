import { VIDEO_API_KEY, VIDEO_API_URL } from "./settings"
import type { Video } from "../types"

interface Params {
  id: string
}

const fromApiResponseToVideo = (response: any): Video => {
  const { id, snippet } = response
  const { title, channelTitle, thumbnails } = snippet
  const { medium } = thumbnails

  return {
    id,
    title,
    channelTitle,
    thumbnailUrl: medium.url ?? medium.default
  }
}

async function getSingleVideo ({ id }: Params): Promise<Video> {
  const url = `${VIDEO_API_URL}?part=id%2C+snippet&id=${id}&key=${VIDEO_API_KEY}`
  const response = await globalThis.fetch(url)

  if (!response.ok) {
    throw new Error("ERROR_GET_VIDEO_INFO")
  }

  const { items } = await response.json()
  const [video]: Video[] = items.map(fromApiResponseToVideo)
  return video
}

export default getSingleVideo
