import ytdl from "ytdl-core";

export async function getVideoInfo(videoId: string) {
  try {
    return await ytdl.getInfo(videoId);
  } catch (err) {
    throw new Error("Access to the video is forbidden (403).");
  }
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
