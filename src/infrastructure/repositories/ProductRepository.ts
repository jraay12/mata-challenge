import { Product } from "domain/entities/Product";
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
}
