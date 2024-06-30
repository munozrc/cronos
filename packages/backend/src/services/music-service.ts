import { context } from "constants/music-provider";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseSongInfo(data: Record<string, any>) {
  const { videoDetails, microformat } = data;
  const { videoId, title, lengthSeconds, thumbnail, author, musicVideoType } = videoDetails;
  const { publishDate, tags } = microformat.microformatDataRenderer;
  const { thumbnails } = thumbnail;

  const parsedThumbnail = Array.isArray(thumbnails) ? thumbnails[0].url : "";
  const parsedTags = Array.isArray(tags) ? tags : [];
  const parseType = musicVideoType === "MUSIC_VIDEO_TYPE_ATV" ? "music" : "video";

  return {
    author,
    category: parseType,
    lengthSeconds,
    publishDate,
    tags: parsedTags,
    thumbnail: parsedThumbnail,
    title,
    videoId,
  };
}

function isValidResponse(data: object) {
  return (
    "playabilityStatus" in data &&
    typeof data.playabilityStatus === "object" &&
    data.playabilityStatus !== null &&
    "status" in data.playabilityStatus &&
    typeof data.playabilityStatus.status === "string" &&
    data.playabilityStatus.status === "OK"
  );
}

export async function getSongInfo(videoId: string) {
  const url = "https://music.youtube.com/youtubei/v1/player?prettyPrint=false";
  const body = JSON.stringify({ videoId, context });
  const headers = { "content-type": "application/json" };
  const init: RequestInit = { method: "POST", credentials: "omit", body, headers };

  try {
    const response = await globalThis.fetch(url, init);
    const data = await response.json();

    if (typeof data !== "object" || data === null) throw new Error("Bad response");
    if (!isValidResponse(data)) return null;

    return parseSongInfo(data);
  } catch (error) {
    console.error("Error search song infomation: ", error);
    throw error;
  }
}
