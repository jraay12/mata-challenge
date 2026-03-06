import { Product } from "./../entities/Product";
export interface IProductRepository {
  create(product: Product): Promise<void>;
  getAllProduct(page?: number, limit?: number): Promise<Product[]>;
}
