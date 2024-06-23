import { FastifyReply, FastifyRequest } from "fastify";

export const healthCheck = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  reply.send({ status: "ok" });
};
