import { PassThrough } from "node:stream";
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";
import ytdl from "ytdl-core";

async function getAudioStream(videoId: string) {
  const videoInfo = await ytdl.getInfo(videoId);
  const passThrough = new PassThrough();

  if (ffmpegStatic === null) throw new Error("ffmpegStatic is required.");
  ffmpeg.setFfmpegPath(ffmpegStatic);

  const stream = ytdl(videoId, { quality: "highestaudio" });
  ffmpeg(stream).audioBitrate(128).format("mp3").pipe(passThrough);

  return { stream: passThrough, title: videoInfo.videoDetails.title };
}

export { getAudioStream };
