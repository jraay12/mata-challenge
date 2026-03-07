import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name cannot exceed 100 characters")
    .transform((val) => val.trim()),
  price: z.number().nonnegative("Price cannot be negative"),
  stock: z.number().nonnegative("Stock cannot be negative").optional(),
});

export type CreateProductDTO = z.infer<typeof CreateProductSchema>;
