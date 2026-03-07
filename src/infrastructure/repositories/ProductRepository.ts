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

  async addStock(product_id: string, stock: number): Promise<void> {
    await this.prisma.product.update({
      where: {
        id: product_id,
      },
      data: {
        stock: {
          increment: stock,
        },
      },
    });
  }

  async findById(product_id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        id: product_id,
      },
    });

    if (!product) return null;

    return Product.fromPersistence({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  }
}
