import type { FastifyInstance } from "fastify";

import { healthCheck } from "@/controllers/health-controller";

async function healthRoutes(fastify: FastifyInstance) {
  fastify.get("/", healthCheck);
}

export default healthRoutes;
