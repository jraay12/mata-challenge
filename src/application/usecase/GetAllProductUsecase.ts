import { ProductResponseDTO } from "application/dto/ProductResponseDTO";
import { IProductRepository } from "../../domain/repositories/IProductRepository";

export class GetAllProductUsecase {
  constructor(private productRepo: IProductRepository) {}

  async execute(
    page: number = 1,
    limit: number = 10,
  ): Promise<ProductResponseDTO[]> {
    const products = await this.productRepo.getAllProduct(page, limit);

    return products.map((product) => product.toJSON());
  }
}
