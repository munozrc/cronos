import { getInfo } from 'ytdl-core'

export async function getSongURL (id: string): Promise<string | undefined> {
  const { formats } = await getInfo(id)
  const format = formats.find(({ itag }) => itag === 140)
  if (typeof format === 'undefined') return undefined
  return format.url
}
