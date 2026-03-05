import { FastifyInstance } from "fastify";
import { ZodError } from "zod";

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, request, reply) => {

    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: "Validation error",
        errors: error.flatten()
      });
    }

    if ((error as any).statusCode) {
      return reply.status((error as any).statusCode).send({
        message: error
      });
    }

    request.log.error(error);

    return reply.status(500).send({
      message: "Internal Server Error"
    });
  });
}