import ytdl from "ytdl-core";

export async function getVideoInfo(videoId: string) {
  try {
    const options: ytdl.downloadOptions = { filter: "audioonly" };
    return await ytdl.getInfo(videoId, options);
  } catch (err) {
    throw new Error("Access to the video is forbidden (403).");
  }
}

export function getVideoFormat(
  videoInfo: ytdl.videoInfo,
  quality: "lowestaudio" | "highestaudio" = "lowestaudio"
) {
  const options: ytdl.downloadOptions = { quality, filter: "audioonly" };
  return ytdl.chooseFormat(videoInfo.formats, options);
}

export function downloadVideoStream(
  videoInfo: ytdl.videoInfo,
  quality: "lowestaudio" | "highestaudio" = "lowestaudio",
  start?: number,
  end?: number
) {
  const range = { start, end };
  const options: ytdl.downloadOptions = { quality, range, filter: "audioonly" };
  return ytdl.downloadFromInfo(videoInfo, options).on("error", (err) => {
    throw err;
  });
}
