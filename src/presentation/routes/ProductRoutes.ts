import { FastifyInstance } from "fastify";
export async function productRoutes(fastify: FastifyInstance) {
  fastify.post("/create-product", (req, reply) =>
    fastify.productController.create(req, reply),
  );
}
