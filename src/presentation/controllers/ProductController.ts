import { GetAllProductUsecase } from "../../application/usecase/GetAllProductUsecase";
import {
  CreateProductSchema,
  CreateProductDTO,
} from "../../application/dto/CreateProductDTO";
import { CreateProductUsecase } from "../../application/usecase/CreateProductUsecase";
import { FastifyReply, FastifyRequest } from "fastify";
import { GetAllProductsQuery } from "../../application/dto/GetAllProductQuery";
import { AddProductStockUsecase } from "../../application/usecase/AddProductStocklUsecase";

export class ProductController {
  constructor(
    private createProduct: CreateProductUsecase,
    private getAllProductUsecase: GetAllProductUsecase,
    private addProductStockUsecase: AddProductStockUsecase,
  ) {}

  create = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    const dto: CreateProductDTO = CreateProductSchema.parse(request.body);
    const product = await this.createProduct.execute(dto);
    reply.code(201).send({ message: "Create Product Succesfully", product });
  };

  getProduct = async (
    request: FastifyRequest<{ Querystring: GetAllProductsQuery }>,
    reply: FastifyReply,
  ): Promise<void> => {
    const page = Number(request.query?.page) || 1;
    const limit = Number(request.query?.limit) || 10;
    const products = await this.getAllProductUsecase.execute(page, limit);
    reply
      .code(201)
      .send({ message: "Retrieve Products Succesfully", products });
  };

  addStock = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    const productId = (request.params as { productId: string }).productId;
    const { stock } = request.body as { stock: number };
    const updatedProduct = await this.addProductStockUsecase.execute(
      productId,
      stock,
    );
    reply.code(200).send({
      message: `Stock added successfully to ${updatedProduct.name}`,
    });
  };
}
