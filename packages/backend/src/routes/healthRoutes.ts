import { FastifyInstance } from "fastify";
import { healthCheck } from "../controllers/healthController";

async function healthRoutes(fastify: FastifyInstance) {
  fastify.get("/health", healthCheck);
}

export default healthRoutes;
