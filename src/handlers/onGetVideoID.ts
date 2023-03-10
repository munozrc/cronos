import type { IpcMainInvokeEvent } from "electron"

export function onGetVideoID (_: IpcMainInvokeEvent, link: string): string {
  const { searchParams, pathname, host } = new URL(link.trim())
  let id = searchParams.get("v")

  const pathDomains = /^https?:\/\/(youtu\.be\/|(www\.)?youtube\.com\/(embed|v|shorts)\/)/
  const isValidDomains = pathDomains.test(link.trim())

  if (isValidDomains && id === null) {
    const paths = pathname.split("/")
    const isSharedLink = host === "youtu.be"
    id = isSharedLink ? paths[1] : paths[2]
  }

  if (id == null) {
    throw new Error("NO_VIDEO_ID_FOUND")
  }

  const idRegex = /^[a-zA-Z0-9-_]{11}$/
  const isValidId = idRegex.test(id)

  if (!isValidId) {
    throw new Error("VIDEO_ID_NO_MATCH")
  }

  return id
}
