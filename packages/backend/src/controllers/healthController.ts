import { FastifyReply, FastifyRequest } from "fastify";

export const healthCheck = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  reply.send({ status: "ok" });
};
