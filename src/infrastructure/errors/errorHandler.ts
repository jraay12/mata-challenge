import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { NotFoundError } from "../../domain/errors/NotFoundError";
import { ConflictError } from "../../domain/errors/ConflictError";
import { BadRequestError } from "../../domain/errors/BadRequestError";
import { UnAuthorizedError } from "../../domain/errors/UnAuthorizedError";
import { ZodError, z } from "zod";

export function errorHandler(
  error: FastifyError | Error,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof NotFoundError) {
    return reply.status(404).send({ message: error.message });
  }

  if (error instanceof ZodError) {
    const flattened = z.flattenError(error);
    return reply.status(400).send({
      message: "Validation error",
      error: flattened,
    });
  }

  if (error instanceof ConflictError) {
    return reply.status(409).send({ message: error.message });
  }

  if (error instanceof BadRequestError) {
    return reply.status(404).send({ message: error.message });
  }

  if (error instanceof UnAuthorizedError) {
    return reply.status(401).send({ message: error.message });
  }

  return reply.status(500).send({ message: "Internal server error" });
}
