import { IncomingHttpHeaders } from "node:http";
import { type FastifyReply, type FastifyRequest } from "fastify";
import {
  downloadVideoStream,
  getVideoFormat,
  getVideoInfo,
} from "services/video-service";

async function downloadAudioController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { videoId } = request.params as { videoId: string };
  return reply.send({ videoId });
}

async function playbackController(
  request: FastifyRequest,
  reply: FastifyReply
) {
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

export { downloadAudioController, playbackController };
