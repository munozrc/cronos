import { type FastifyReply, type FastifyRequest } from "fastify";
import { getAudioStream } from "utils/getAudioStream";

async function downloadAudioController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { videoId } = request.params as { videoId: string };

  try {
    const { stream, title } = await getAudioStream(videoId);

    reply.header("Content-Type", "audio/mpeg");
    reply.header("Content-Disposition", `attachment; filename="${title}.mp3"`);

    return reply.send(stream);
  } catch (error) {
    console.error(error);
    reply.status(500).send("Error downloading audio");
  }
}

export { downloadAudioController };
