import { Product } from "../../domain/entities/Product";
import { IProductRepository } from "../../domain/repositories/IProductRepository";
import { PrismaClient } from "@prisma/client";
export class ProductRepository implements IProductRepository {
  constructor(private prisma: PrismaClient) {}
  async create(product: Product): Promise<void> {
    await this.prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    });
  }

  async getAllProduct(
    page: number = 1,
    limit: number = 10,
  ): Promise<Product[]> {
    const skip = (page - 1) * limit;
    const product = await this.prisma.product.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        stock: {
          gt: 0,
        },
      },
    });

    return Product.fromPersistenceArray(product);
  }
}
