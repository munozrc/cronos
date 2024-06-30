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
  const range = request.headers.range || "";

  try {
    const [start = 0, end = 0] = range.replace(/bytes=/, "").split("-");
    const videoInfo = await getVideoInfo(videoId);
    const { mimeType, contentLength } = getVideoFormat(videoInfo);

    const { videoDetails } = videoInfo;
    const { title } = videoDetails;

    const headers = {
      "Content-Type": mimeType,
      "Content-Disposition": `inline; filename="${title}.mp3"`,
      "Content-Length": contentLength,
      "Content-Range": `bytes ${start}-${end}/${contentLength}`,
      "Accept-Ranges": "bytes",
    };

    console.log({ headers, range });

    const stream = downloadVideoStream(videoInfo, "lowestaudio", start, end);
    return reply.headers(headers).send(stream);
  } catch (error) {
    reply.code(500).send({ error: "Failed to stream the audio" });
  }
}

export { downloadAudioController, playbackController };
