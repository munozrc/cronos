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
export function parseAlbumSong(data: Record<string, any>) {
  try {
    const column = data.contents.singleColumnMusicWatchNextResultsRenderer;
    const tab = column.tabbedRenderer.watchNextTabbedResultsRenderer.tabs[0];

    const content = tab.tabRenderer.content.musicQueueRenderer.content;
    const playlist = content.playlistPanelRenderer.contents[0].playlistPanelVideoRenderer;
    const album = playlist.longBylineText.runs[2].text;

    return typeof album === "string" ? album : null;
  } catch (error) {
    console.error("Error parsing music item:", error);

    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseSongInfo(data: Record<string, any>, extraData: Record<string, any>) {
  try {
    const { videoDetails, microformat } = data;
    const { videoId, title, lengthSeconds, thumbnail, author } = videoDetails;
    const { publishDate } = microformat.microformatDataRenderer;
    const { thumbnails } = thumbnail;

    const parsedThumbnail = Array.isArray(thumbnails) ? thumbnails[0].url : "";
    const album = parseAlbumSong(extraData);

    return {
      album,
      author,
      lengthSeconds,
      publishDate,
      thumbnail: parsedThumbnail,
      title,
      videoId,
    };
  } catch (error) {
    console.error("Error parsing music item:", error);

    return null;
  }
}
