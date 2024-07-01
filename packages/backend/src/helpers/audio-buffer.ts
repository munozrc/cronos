import pathToFfmpeg from "ffmpeg-static";
import Ffmpeg from "fluent-ffmpeg";
import { PassThrough, type Readable } from "node:stream";

if (pathToFfmpeg === null) throw new Error("Ffmpeg path is required.");
Ffmpeg.setFfmpegPath(pathToFfmpeg);

export async function getAudioBuffer(audioStream: Readable): Promise<Buffer> {
  const outputBuffer: Buffer[] = [];
  const passthrough = new PassThrough();

  try {
    return await new Promise((resolve, reject) => {
      const ffmpegCommand = Ffmpeg(audioStream)
        .audioCodec("libmp3lame")
        .format("mp3")
        .pipe(passthrough)
        .on("data", (chunk) => outputBuffer.push(chunk))
        .on("end", () => resolve(Buffer.concat(outputBuffer)))
        .on("error", (err) => reject(err));

      passthrough.on("error", (err) => {
        console.error("Passthrough stream error:", err);
        ffmpegCommand.destroy();
        reject(err);
      });

      audioStream.on("error", (err) => {
        console.error("Audio stream error:", err);
        ffmpegCommand.destroy();
        reject(err);
      });
    });
  } catch (error) {
    console.log("Error convert to mp3: ", error);
    throw new Error("Error convert to mp3.");
  }
}
