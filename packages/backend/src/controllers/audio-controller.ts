import { type FastifyReply, type FastifyRequest } from "fastify";
import NodeID3 from "node-id3";
import { type IncomingHttpHeaders } from "node:http";

import { getAudioBuffer } from "@/helpers/audio-buffer";
import * as musicService from "@/services/music-service";
import * as videoService from "@/services/video-service";

async function downloadAudioController(request: FastifyRequest, reply: FastifyReply) {
  const { videoId } = request.params as { videoId: string };

  if (typeof videoId !== "string") {
    const message = "Video ID is required.";
    return reply.code(400).send({ message });
  }

  try {
    const [info, videoInfo] = await Promise.all([
      musicService.getSongInfo(videoId),
      videoService.getVideoInfo(videoId),
    ]);

    if (info === null) {
      const message = "Song information not found.";
      return reply.code(404).send({ message });
    }

    const audioStream = videoService.downloadVideoStream(videoInfo, "highestaudio");
    const audioFormat = videoService.getVideoFormat(videoInfo, "highestaudio");

    const [audioBuffer, albumCoverAPIC] = await Promise.all([
      getAudioBuffer(audioStream),
      musicService.getAlbumCoverBuffer(info.thumbnail),
    ]);

    const parseTitle = info.title.replace(/[/\\?%*:|"<>]/g, "");
    const parseAuthor = info.author.replace(/[/\\?%*:|"<>]/g, "");
    const filename = `${parseTitle} - ${parseAuthor}.mp3`;
    const year = new Date(info.publishDate).getFullYear().toString();

    const headers: IncomingHttpHeaders = {
      "content-type": "audio/mpeg",
      "content-disposition": `attachment; filename="${filename}"`,
      "content-length": audioFormat.contentLength,
    };

    const tags = {
      title: info.title,
      artist: info.author,
      album: info.album,
      APIC: albumCoverAPIC,
      year,
    };

    const audioWithMetadata = NodeID3.write(tags, audioBuffer);

    if (!audioWithMetadata) {
      const message = "Error writing metadata";
      return reply.code(500).send({ message });
    }

    return reply.headers(headers).send(audioWithMetadata);
  } catch (error) {
    if (error instanceof Error) console.error("ERROR_DOWNLOAD_AUDIO: ", error.message);
    reply.code(500).send({ error: "Failed to download the audio" });
  }
}

async function playbackController(request: FastifyRequest, reply: FastifyReply) {
  const { videoId } = request.params as { videoId: string };
  const range = request.headers.range;

  if (!videoId) {
    const message = "Video ID is required.";
    return reply.code(400).send({ message });
  }

  try {
    const videoInfo = await videoService.getVideoInfo(videoId);
    const { contentLength } = videoService.getVideoFormat(videoInfo);

    const { videoDetails } = videoInfo;
    const { title } = videoDetails;

    const headers: IncomingHttpHeaders = {
      "content-type": "audio/mpeg",
      "content-disposition": `inline; filename="${title}.mp3"`,
      "content-length": contentLength,
      "accept-ranges": "bytes",
    };

    if (!range) {
      const stream = videoService.downloadVideoStream(videoInfo, "lowestaudio");
      return reply.headers(headers).send(stream);
    }

    const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
    const start = startStr ? Number(startStr) : 0;
    const end = endStr ? Number(endStr) : +contentLength - 1;

    headers["content-range"] = `bytes ${start}-${end}/${contentLength}`;
    headers["content-length"] = String(end - start + 1);

    const stream = videoService.downloadVideoStream(videoInfo, "lowestaudio", start, end);
    return reply.code(206).headers(headers).send(stream);
  } catch (error) {
    reply.code(500).send({ error: "Failed to stream the audio" });
  }
}

async function searchSongs(request: FastifyRequest, reply: FastifyReply) {
  const { query } = request.params as { query: string };

  if (!query || query.trim() === "") {
    const message = "Query parameter is required.";
    return reply.code(400).send({ message });
  }

  try {
    const parseQuery = globalThis.decodeURIComponent(query);
    const results = await musicService.searchSongs(parseQuery);
    reply.send({ results });
  } catch (error) {
    reply.code(500).send({ error: "Failed to search songs" });
  }
}

export { downloadAudioController, playbackController, searchSongs };
