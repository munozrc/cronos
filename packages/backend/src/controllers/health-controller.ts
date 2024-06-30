import type { FastifyReply, FastifyRequest } from "fastify";

function healthCheck(_: FastifyRequest, reply: FastifyReply) {
  return reply.send({ status: "ok" });
}

export { healthCheck };
