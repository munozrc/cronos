// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractMusicData(content: any) {
  try {
    const renderer = content.musicResponsiveListItemRenderer;
    const column = renderer?.flexColumns;
    const firstColumnRender = column[0]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs[0];
    const secondColumnRender = column[1]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs;

    const title = firstColumnRender?.text;
    const videoId = firstColumnRender?.navigationEndpoint?.watchEndpoint?.videoId;
    const author = secondColumnRender[0]?.text;
    const album = secondColumnRender[2]?.text;
    const thumbnail = renderer?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails.pop()?.url;
    const lengthSeconds = secondColumnRender.slice(-1)[0]?.text;

    if (!videoId || !title || !author || !thumbnail || !lengthSeconds || !album) return null;
    return { author, lengthSeconds, thumbnail, title, videoId, album };
  } catch (error) {
    console.error("Error parsing music item:", error);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractMusicFromResponse(body: any) {
  try {
    const tab = body.contents.tabbedSearchResultsRenderer.tabs[0];
    const parentContent = tab.tabRenderer.content.sectionListRenderer.contents;
    const contents = parentContent.pop()?.musicShelfRenderer.contents;

    if (!contents || !Array.isArray(contents)) return [];
    return contents.map(extractMusicData);
  } catch (error) {
    console.error("Error parsing search response:", error);
    return [];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseSongInfo(data: Record<string, any>) {
  try {
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
  } catch (error) {
    console.error("Error parsing music item:", error);
    return null;
  }
}
