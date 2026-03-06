import { ProductResponseDTO } from "application/dto/ProductResponseDTO";
import { IProductRepository } from "../../domain/repositories/IProductRepository";
import { NotFoundError } from "../../domain/errors/NotFoundError";

export class AddProductStockUsecase {
  constructor(private productRepo: IProductRepository) {}

  async execute(
    product_id: string,
    stock: number,
  ): Promise<ProductResponseDTO> {
    const product = await this.productRepo.findById(product_id);

    if (!product) throw new NotFoundError("Product not found!");

    product.addStock(stock);

    await this.productRepo.addStock(product_id, stock);

    return product.toJSON();
  }
}
