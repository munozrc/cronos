import { downloadAudioController } from "controllers/AudioController";
import { type FastifyInstance } from "fastify";

async function audioRoutes(fastify: FastifyInstance) {
  fastify.get("/download/:videoId", downloadAudioController);
}

export default audioRoutes;
