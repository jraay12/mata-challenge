import { z } from "zod";


export const UpdateCustomerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(100, "Name cannot exceed 100 characters")
      .optional(),
    phone: z
      .string()
      .optional().nullable(),
    address: z.string().optional().nullable(),
  })
  .strict();

export type UpdateCustomerDTO = z.infer<typeof UpdateCustomerSchema>;


export const UpdateCustomerParamsSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

export type UpdateCustomerParams = z.infer<typeof UpdateCustomerParamsSchema>;