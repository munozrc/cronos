import ytdl from "ytdl-core";

export async function getVideoInfo(videoId: string) {
  return await ytdl.getInfo(videoId);
}

export function getVideoFormat(
  videoInfo: ytdl.videoInfo,
  quality: "lowestaudio" | "highestaudio" = "lowestaudio"
) {
  const options = { quality };
  return ytdl.chooseFormat(videoInfo.formats, options);
}

export function downloadVideoStream(
  videoInfo: ytdl.videoInfo,
  quality: "lowestaudio" | "highestaudio" = "lowestaudio",
  start?: number,
  end?: number
) {
  const range = { start, end };
  const options = { quality, range };
  return ytdl.downloadFromInfo(videoInfo, options);
}
