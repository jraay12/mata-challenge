import { Product } from "./../entities/Product";
export interface IProductRepository {
  create(product: Product): Promise<void>;
  getAllProduct(page?: number, limit?: number): Promise<Product[]>;
  addStock(product_id: string, stock: number): Promise<void>;
  findById(product_id: string): Promise<Product | null>;
}
