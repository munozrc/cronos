import { type FastifyInstance } from "fastify";

import { downloadAudioController, playbackController } from "../controllers/audio-controller";

async function audioRoutes(fastify: FastifyInstance) {
  fastify.get("/download/:videoId", downloadAudioController);
  fastify.get("/:videoId", playbackController);
}

export default audioRoutes;
