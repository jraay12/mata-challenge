import { FastifyInstance } from "fastify";
export async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/create", (req, reply) =>
    fastify.userController.createUser(req, reply),
  );

  fastify.post("/login", (req, reply) =>
    fastify.userController.login(req, reply),
  );
}
