import ffmpeg from "fluent-ffmpeg"
import { type Readable } from "node:stream"
import { resolveFfmpegPath } from "../helpers"

ffmpeg.setFfmpegPath(resolveFfmpegPath())

async function saveStreamToFile (source: Readable, path: string): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    ffmpeg(source)
      .audioBitrate(128)
      .format("mp3")
      .saveToFile(path)
      .on("end", resolve)
      .on("error", reject)
  })
}

export default saveStreamToFile
