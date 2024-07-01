import { type FastifyInstance } from "fastify";

import * as ctrl from "../controllers/audio-controller";

async function audioRoutes(fastify: FastifyInstance) {
  fastify.get("/download/:videoId", ctrl.downloadAudioController);
  fastify.get("/search/:query", ctrl.searchSongs);
  fastify.get("/:videoId", ctrl.playbackController);
}

export default audioRoutes;
