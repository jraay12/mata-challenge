import { IProductRepository } from "../../domain/repositories/IProductRepository";
import { ProductResponseDTO } from "../../application/dto/ProductResponseDTO";
import { CreateProductDTO } from "../../application/dto/CreateProductDTO";
import { Product } from "../../domain/entities/Product";

export class CreateProductUsecase {
  constructor(private productRepo: IProductRepository) {}

  async execute(data: CreateProductDTO): Promise<ProductResponseDTO> {
    const product = Product.create({
      name: data.name,
      price: data.price,
      stock: data.stock,
    });

    await this.productRepo.create(product);

    return product.toJSON();
  }
}
