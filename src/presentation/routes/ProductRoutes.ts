import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { GetAllProductsQuery } from "../../application/dto/GetAllProductQuery";
export async function productRoutes(fastify: FastifyInstance) {
  fastify.post("/create-product", (req, reply) =>
    fastify.productController.create(req, reply),
  );

  fastify.get(
    "/products",
    (
      req: FastifyRequest<{ Querystring: GetAllProductsQuery }>,
      reply: FastifyReply,
    ) => fastify.productController.getProduct(req, reply),
  );

  fastify.patch("/:productId/add-stock", (req, reply) =>
    fastify.productController.addStock(req, reply),
  );
}
