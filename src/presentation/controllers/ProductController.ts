import {
  CreateProductSchema,
  CreateProductDTO,
} from "../../application/dto/CreateProductDTO";
import { CreateProductUsecase } from "../../application/usecase/CreateProductUsecase";
import { FastifyReply, FastifyRequest } from "fastify";

export class ProductController {
  constructor(private createProduct: CreateProductUsecase) {}

  create = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    const dto: CreateProductDTO = CreateProductSchema.parse(request.body);
    const product = await this.createProduct.execute(dto);
    reply.code(201).send({ message: "Create Product Succesfully", product });
  };
}
