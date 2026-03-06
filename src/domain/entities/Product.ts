import crypto from "crypto";
import { BadRequestError } from "../../domain/errors/BadRequestError";
import { ProductResponseDTO } from "../../application/dto/ProductResponseDTO";
export interface ProductProps {
  id: string;
  name: string;
  price: number;
  stock?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product {
  private props: ProductProps;
  private static readonly MAX_NAME_LENGTH = 100;

  constructor(props: ProductProps) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  static create(props: Omit<ProductProps, "id" | "createdAt" | "updatedAt">) {
    if (!props.name || props.name.trim().length === 0) {
      throw new BadRequestError("Product name is required");
    }
    if (props.name.length > Product.MAX_NAME_LENGTH) {
      throw new BadRequestError(
        `Product name cannot exceed ${Product.MAX_NAME_LENGTH} characters`,
      );
    }

    if (props.price <= 0) {
      throw new BadRequestError("Price cannot be negative or zero");
    }

    if (props.stock !== undefined && props.stock < 0) {
      throw new BadRequestError("Stock cannot be negative");
    }

    return new Product({
      ...props,
      id: crypto.randomUUID(),
    });
  }

  static fromPersistenceArray(data: ProductProps[]): Product[] {
    return data.map((product) => new Product(product));
  }

  static fromPersistence(data: ProductProps): Product {
    return new Product(data);
  }

  addStock(stock: number) {
    if (stock !== undefined && stock <= 0)
      throw new BadRequestError("Stock must be greater than zero");

    this.props.stock = stock;
    this.props.updatedAt = new Date()
  }

  toJSON(): ProductResponseDTO {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      stock: this.stock,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  // Getters
  get id() {
    return this.props.id;
  }
  get name() {
    return this.props.name;
  }
  get price() {
    return this.props.price;
  }
  get stock() {
    return this.props.stock ?? 0;
  }
  get createdAt() {
    return this.props.createdAt!;
  }
  get updatedAt() {
    return this.props.updatedAt!;
  }
}
