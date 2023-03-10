async function getBufferImage (imageUrl: string): Promise<any> {
  const parseImageUrl = imageUrl.replace("w120-h120-l90-rj", "w500-h500-l90-rj")
  const response = await globalThis.fetch(parseImageUrl)

  if (!response.ok) {
    return null
  }

  const imageBuffer = await response.arrayBuffer()
  const mime = response.headers.get("content-type")

  return {
    mime,
    type: { id: 3, name: "front cover" },
    description: "Album Cover of",
    imageBuffer: Buffer.from(imageBuffer)
  }
}

export default getBufferImage
