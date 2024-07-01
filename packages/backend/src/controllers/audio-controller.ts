import { type FastifyReply, type FastifyRequest } from "fastify";
import NodeID3 from "node-id3";
import { type IncomingHttpHeaders } from "node:http";

import { getAudioBuffer } from "../helpers/audio-buffer";
import { getAlbumCoverBuffer, getSongInfo, getSongsByQuery } from "../services/music-service";
import { downloadVideoStream, getVideoFormat, getVideoInfo } from "../services/video-service";

async function downloadAudioController(request: FastifyRequest, reply: FastifyReply) {
  const { videoId } = request.params as { videoId: string };

  if (typeof videoId !== "string") {
    const message = "Video ID is required.";
    return reply.code(400).send({ message });
  }

  try {
    const info = await getSongInfo(videoId);

    if (info === null) {
      const message = "Song information not found.";
      return reply.code(404).send({ message });
    }

    const videoInfo = await getVideoInfo(videoId);
    const audioStream = downloadVideoStream(videoInfo, "highestaudio");
    const audioFormat = getVideoFormat(videoInfo, "highestaudio");
    const audioBuffer = await getAudioBuffer(audioStream);

    const parseTitle = info.title.replace(/[/\\?%*:|"<>]/g, "");
    const parseAuthor = info.author.replace(/[/\\?%*:|"<>]/g, "");
    const filename = `${parseTitle} - ${parseAuthor}.mp3`;

    const headers: IncomingHttpHeaders = {
      "content-type": "audio/mpeg",
      "content-disposition": `attachment; filename="${filename}"`,
      "content-length": audioFormat.contentLength,
    };

    const albumCoverAPIC = await getAlbumCoverBuffer(info.thumbnail);

    const tags = {
      title: info.title,
      artist: info.author,
      album: "",
      year: `${new Date(info.publishDate).getFullYear()}`,
      APIC: albumCoverAPIC,
    };

    const audioWithMetadata = NodeID3.write(tags, audioBuffer);

    if (!audioWithMetadata) {
      const message = "Error writing metadata";
      return reply.code(500).send({ message });
    }

    return reply.headers(headers).send(audioWithMetadata);
  } catch (error) {
    reply.code(500).send({ error: "Failed to stream the audio" });
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
    const videoInfo = await getVideoInfo(videoId);
    const { contentLength } = getVideoFormat(videoInfo);

    const { videoDetails } = videoInfo;
    const { title } = videoDetails;

    const headers: IncomingHttpHeaders = {
      "content-type": "audio/mpeg",
      "content-disposition": `inline; filename="${title}.mp3"`,
      "content-length": contentLength,
      "accept-ranges": "bytes",
    };

    if (!range) {
      const stream = downloadVideoStream(videoInfo, "lowestaudio");
      return reply.headers(headers).send(stream);
    }

    const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
    const start = startStr ? Number(startStr) : 0;
    const end = endStr ? Number(endStr) : +contentLength - 1;

    headers["content-range"] = `bytes ${start}-${end}/${contentLength}`;
    headers["content-length"] = String(end - start + 1);

    const stream = downloadVideoStream(videoInfo, "lowestaudio", start, end);
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
    const results = await getSongsByQuery(parseQuery);
    reply.send({ results });
  } catch (error) {
    reply.code(500).send({ error: "Failed to stream the audio" });
  }
}

export { downloadAudioController, playbackController, searchSongs };
